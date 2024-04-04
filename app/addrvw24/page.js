'use client'
import React, { useState } from 'react';
import supabase from '@/lib/supabase';

const AddReview = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // State for the description
  const [categoryInputs, setCategoryInputs] = useState([
    { category: 'Announced', subcategories: [] },
    { category: 'Launched', subcategories: [] },
    { category: 'Physical Size', subcategories: ['Dimensions', 'Weight', 'Material', 'SIM'] },
    { category: 'Display', subcategories: ['Resolution', 'Size', 'Technology'] },
    { category: 'Platform', subcategories: ['OS', 'Chipset', 'CPU', 'GPU'] },
    { category: 'Network', subcategories: [] },
    { category: 'Memory', subcategories: [] },
    { category: 'Camera', subcategories: ['Front', 'Rear'] },
    { category: 'Communication', subcategories: [] },
    { category: 'Battery', subcategories: [] },
    { category: 'Sensors', subcategories: [] },
    { category: 'Color', subcategories: [] },
    { category: 'Price', subcategories: [] },
  ]);
  const [categoryData, setCategoryData] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (category, event) => {
    setCategoryData({ ...categoryData, [category]: event.target.value });
  };

  const handleSubcategoryChange = (category, subcategory, event) => {
    setCategoryData({
      ...categoryData,
      [category]: {
        ...categoryData[category],
        [subcategory]: event.target.value,
      },
    });
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('devices')
      .insert([
        { 
          name, 
          description, // Include the description in the insert operation
          categories: categoryData, 
          images: imageUrl ? [imageUrl] : [] 
        },
      ]);

    if (error) {
      console.error('There was an error inserting the review:', error);
    } else {
      console.log('Review inserted:', data);
      setName('');
      setDescription(''); // Reset description state
      setCategoryData({});
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-black">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black"
            rows="4"
          />
        </div>
        {categoryInputs.map((categoryInput, index) => (
          <div key={index}>
            <label htmlFor={`category${index}`} className="block text-sm font-medium text-gray-700 text-black">{categoryInput.category}</label>
            {categoryInput.subcategories.map((subcategory, subIndex) => (
              <div key={subIndex}>
                <label htmlFor={`subcategory${index}${subIndex}`} className="block text-sm font-medium text-gray-700 text-black">{subcategory}</label>
                <input
                  type="text"
                  name={subcategory}
                  id={`subcategory${index}${subIndex}`}
                  value={categoryData[categoryInput.category]?.[subcategory] || ''}
                  onChange={(event) => handleSubcategoryChange(categoryInput.category, subcategory, event)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                />
              </div>
            ))}
            {categoryInput.subcategories.length === 0 && (
              <input
                type="text"
                name={categoryInput.category}
                id={`category${index}`}
                value={categoryData[categoryInput.category] || ''}
                onChange={(event) => handleCategoryChange(categoryInput.category, event)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black"
              />
            )}
          </div>
        ))}
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
