'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import supabase from '@/lib/supabase';

const Reviews = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('devices').select('*');
        if (error) {
          console.error('error fetching reviews:', error);
        } else {
          setReviews(data);
        }
      } catch (error) {
        console.error('unexpected error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewFullReview = (deviceId, deviceName) => {
    router.push(`fullreview/${deviceId}-${encodeURIComponent(deviceName)}`);
  };

  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Sort and group reviews by first word of device name
  const sections = {};
  filteredReviews.sort((a, b) => a.name.split(' ')[0].localeCompare(b.name.split(' ')[0]));
  filteredReviews.forEach((review) => {
    const firstWord = review.name.split(' ')[0];
    if (!sections[firstWord]) {
      sections[firstWord] = [];
    }
    sections[firstWord].push(review);
  });

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mx-auto p-8 rounded-lg">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md text-green-900"
        />

        {isLoading ? (
          <p className="text-center text-green-700">Loading reviews...</p>
        ) : (
          Object.entries(sections).map(([header, reviewsInSection]) => (
            <div key={header} className="mb-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">{header}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviewsInSection.map((review) => (
                  <div key={review.id} className="mb-6 cursor-pointer" onClick={() => handleViewFullReview(review.id, review.name)}>
                    <h3 className="text-lg font-semibold text-green-500">{review.name}</h3>
                    {review.images.length > 0 && (
                      <img
                        key={review.images[0]}
                        src={review.images[0]}
                        alt={`${review.name} Main Image`}
                        className="mt-4 rounded-md shadow-md w-full max-w-lg mx-auto"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Full Review Modal"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-8 rounded-lg outline-none w-full h-full overflow-y-auto"
        >
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Modal content */}
        </Modal>
      </div>
    </div>
  );
};

export default Reviews;