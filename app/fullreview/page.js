'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import reviewData from '../reviewdata.json'; // Import reviewdata.json from the app directory

const FullReview = () => {
  const router = useRouter();
  console.log('Router:', router);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (router && router.query && router.query.deviceId) {
      const deviceId = parseInt(router.query.deviceId);
      console.log('Device ID:', deviceId);
      const foundDevice = reviewData.devices.find(device => device.id === deviceId);
      console.log('Found Device:', foundDevice);
      if (foundDevice) {
        setDevice(foundDevice);
      } else {
        // Handle case where device is not found
        console.error(`Device with ID ${deviceId} not found.`);
      }
    }
  }, [router && router.query && router.query.deviceId]); 
  if (!device) {
    // Render loading or placeholder content while device is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1>Full Review</h1>
      <h2 className="text-2xl font-bold text-green-800">{device.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(device.categories).map(([category, subcategories]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-green-800">{category}</h3>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                {typeof subcategories === 'object' ? (
                  Object.entries(subcategories).map(([subcategory, value]) => (
                    <tr key={subcategory} className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium">{subcategory}</td>
                      <td className="py-2 px-4">{value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2 px-4">{subcategories}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-green-800">Material</h3>
        <input
          type="text"
          value={device.categories.Material}
          className="mt-1 p-2 w-full border rounded-md"
          readOnly
        />
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-green-800">Additional Images</h3>
        <div className="flex justify-center items-center flex-wrap">
          {device.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${device.name} Image ${index + 1}`}
              className="w-auto h-auto sm:w-auto sm:h-auto md:w-auto md:h-auto object-cover rounded-md m-2 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullReview;