"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import supabase from "@/lib/supabase";
import AddReview from "@/addrvw24/page";

const Reviews = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data: session, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        setIsLoggedIn(session !== null);
      } catch (error) {
        console.error('Error fetching session:', error.message);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, [supabase]);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);

      try {
        const { data, error } = await supabase.from("devices").select("*");
        if (error) {
          console.error("Error fetching reviews:", error.message);
        } else {
          setReviews(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching reviews:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchReviews();
    }
  }, [isLoggedIn]);

  const handleLogin = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error.message);
      } else {
        console.log("Sign in successful:", user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Unexpected sign in error:", error.message);
    }
  };

  const handleViewFullReview = (reviewId, reviewName) => {
    router.push(`/fullreview/${reviewId}-${encodeURIComponent(reviewName)}`);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const { error } = await supabase
        .from("devices")
        .delete()
        .eq("id", reviewId);
      if (error) {
        console.error("Error deleting review:", error.message);
      } else {
        console.log("Review deleted successfully");
        // Refresh reviews after deletion
        fetchReviews();
      }
    } catch (error) {
      console.error("Unexpected error deleting review:", error.message);
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="bg-gray-200 min-h-screen">
      {isLoggedIn ? (
        <div className="mx-auto p-8 rounded-lg">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md"
          />
          <h2 className="text-2xl font-bold mb-6 text-green-500 text-center">
            Admin Panel
          </h2>
          
          <button
            onClick={() => router.push("/admin")}
            className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Manage Reviews
          </button>

          {/* Add Review Button (with left margin) */}
          <button onClick={() => setShowAddReview(!showAddReview)} className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
>
            {showAddReview ? "Hide Review Form" : "Add Review"}
          </button>
          {showAddReview && <AddReview />}


          {isLoading ? (
            <p className="text-center text-green-700">Loading reviews...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="mb-6 cursor-pointer"
                  onClick={() => handleViewFullReview(review.id, review.name)}
                >
                  <h2 className="text-2xl font-bold text-green-700">
                    {review.name}
                  </h2>
                  {review.images.length > 0 && (
                    <img
                      key={review.images[0]}
                      src={review.images[0]}
                      alt={`${review.name} Main Image`}
                      className="mt-4 rounded-md shadow-md w-full max-w-lg mx-auto"
                    />
                  )}
                  {isLoggedIn && (
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto  p-8 rounded-lg">
          <h2 className="text-green-950">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const { email, password } = e.target.elements;
              handleLogin(email.value, password.value);
            }}
          >
            <label htmlFor="email" className="text-green-950">
              Email
            </label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password" className="text-green-950">
              Password
            </label>
            <input type="password" id="password" name="password" required />
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
            >
              Login
            </button>
          </form>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Full Review Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-8 rounded-lg outline-none w-full h-full overflow-y-auto"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default Reviews;
