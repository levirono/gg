'use client'
import React, { useState, useEffect } from 'react';
import { useRouter,useParams } from 'next/navigation'; 
import reviewData from '../reviewdata.json'; // Import reviewdata.json from the app directory
import { useSearchParams } from 'next/navigation';
import supabase from '@/lib/supabase';

const FullReview = () => {
  const router = useRouter();
  const [device, setDevice] = useState(null);
  const param= new useSearchParams();

  const [isloading, setisloading]=useState(true)

  const deviceId=param.get('deviceId');

  // useEffect(() => {
  //     try {
  //       setisloading('true')
  //       const foundDevice = reviewData.devices.find(device => device.id === parseInt(deviceId));
  //     console.log('Found Device:', foundDevice);
  //     if (foundDevice) {
  //       setDevice(foundDevice);
  //     } else {
  //       throw new Error(`Device with ID ${deviceId} not found.`);
  //     }
  //     } catch (error) {
  //       console.log("Error retriving devices:" ,error);
  //     }finally{
  //       setisloading(false)
  //     }
  // }, []);
  useEffect(() => {
    const fetchReviews = async () => {
      setisloading(true); // Set loading state to true
      try {
        const { data, error } = await supabase.from('devices').select('*').eq("id", deviceId);
        if (error) {
          console.error('error fetching reviews:', error);
          // Handle errors
        } else {
          console.log(data);
          setDevice(data[0]);
        }
      } catch (error) {
        console.error('unexpected error fetching reviews:', error);
        // Handle unexpected errors
      } finally {
        setisloading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchReviews();
  }, []);




  if (isloading) {
    return(<h1>Loading please wait</h1>)
  }
  // console.log("the device is:",device.name);

  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 style={{ fontSize: '2.5rem', color: '#008000' }}>{device.name} Full Review</h1>
      {device.images && device.images.length > 0 && (
        <div className="flex justify-center mb-6">
          <img
            src={device.images[0]}
            alt={`${device.name} First Image`}
            className="w-auto h-auto sm:w-auto sm:h-auto md:w-auto md:h-auto object-cover rounded-md cursor-pointer"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ... (rest of your content) */}
        {device.categories && (
          typeof device.categories === 'object' ? (
            <>
              {Object.entries(device.categories).map(([category, subcategories]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-green-800">{category}</h3>
                  <table className="w-full border-collapse border border-gray-300">
                    <tbody>
                      {typeof subcategories === 'object' ? (
                        Object.entries(subcategories).map(([subcategory, value]) => (
                          <tr key={subcategory} className="border-b border-gray-300">
                            <td className="py-2 px-4 font-medium" style={{ color: '#008000' }}>{subcategory}</td>
                            <td className="py-2 px-4" style={{ color: '#000' }}>{value}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="py-2 px-4" style={{ color: '#000' }}>{subcategories}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          ) : (
            <div>Categories data is not in the expected format.</div>
          )
        )}
       
        {/* Additional Images */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-green-800">Additional Images</h3>
          <div className="flex justify-center items-center flex-wrap">
            {device.images && device.images.length > 1 && (
              device.images.slice(1).map((image, index) => (
                <img
                  key={index + 1}
                  src={image}
                  alt={`${device.name} Image ${index + 2}`}
                  className="w-auto h-auto sm:w-auto sm:h-auto md:w-auto md:h-auto object-cover rounded-md m-2 cursor-pointer"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullReview;