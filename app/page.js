'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import reviewData from './reviewdata.json';

const Reviews = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const reviews = reviewData.devices;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewFullReview = (deviceId) => {
    console.log(router);
    console.log(deviceId);
router.push(`fullreview?deviceId=${deviceId}`);
  };

  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search reviews..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.map((review) => (
          <div key={review.id} className="mb-6 cursor-pointer" onClick={() => handleViewFullReview(review.id)}>
          
            <h2 className="text-2xl font-bold text-green">{review.name}</h2>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Full Review Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg outline-none w-full h-full overflow-y-auto"
      >
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default Reviews;