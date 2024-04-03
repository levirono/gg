'use client'
import React, { useState } from 'react';
import supabase from '@/lib/supabase';

const AddReview = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState('[]'); // Storing categories as JSON string
  const [imageUrl, setImageUrl] = useState(''); // State for handling image URL

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoriesChange = (event) => {
    setCategories(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert categories from string to actual JSON
    const parsedCategories = JSON.parse(categories);

    const { data, error } = await supabase
      .from('devices')
      .insert([
        { name, categories: parsedCategories, images: imageUrl ? [imageUrl] : [] },
      ]);

    if (error) {
      console.error('There was an error inserting the review:', error);
    } else {
      console.log('Review inserted:', data);
      // Reset form or give user feedback
      setName('');
      setCategories('[]');
      setImageUrl('');
      alert('Review successfully added!');
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Add a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-black">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>
        <div>
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700 text-black">Categories (JSON)</label>
          <textarea
            name="categories"
            id="categories"
            value={categories}
            onChange={handleCategoriesChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
          <p className="mt-2 text-sm text-gray-500 text-black">Enter categories in JSON format, e.g., ["Smartphone", "Android"]</p>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 text-black">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
