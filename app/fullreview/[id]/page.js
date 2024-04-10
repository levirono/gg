"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import Comments from "../../components/Comment";

const FullReview = ({ params }) => {
  const router = useRouter();
  const [device, setDevice] = useState(null);

  const [isloading, setisloading] = useState(true);

  const deviceId = params.id.split("-")[0];

  useEffect(() => {
    const fetchReviews = async () => {
      setisloading(true); // Set loading state to true
      try {
        const { data, error } = await supabase
          .from("devices")
          .select("*")
          .eq("id", deviceId);
        console.log(data);
        if (error) {
          console.error("error fetching reviews:", error);
          // Handle errors
        } else {
          console.log(data);
          setDevice(data[0]);
        }
      } catch (error) {
        console.error("unexpected error fetching reviews:", error);
        // Handle unexpected errors
      } finally {
        setisloading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchReviews();
  }, []);

  if (isloading) {
    return (
      <h1 className="fixed inset-0 flex items-center justify-center bg-gray-200 text-green-500">
        Loading please wait...
      </h1>
    );
  }

  const sim = device?.categories["Physical Size"].SIM;
  const dimension = device?.categories["Physical Size"].Dimension;
  const Material = device?.categories["Physical Size"].Material;

  console.log(sim);
  console.log(Material);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mx-20  align-middle">
        <h1 style={{ fontSize: "2.5rem", color: "#008000" }}>
          {device?.name} Full Review
        </h1>
        {device?.images && device.images.length > 0 && (
          <div className="flex justify-center mb-6">
            <img
              src={device.images[0]}
              alt={`${device.name} First Image`}
              className="w-auto h-auto sm:w-auto sm:h-auto md:w-auto md:h-auto object-cover rounded-md cursor-pointer"
            />
          </div>
        )}
        <div className="min-h-max">
          {device?.categories && (
            <div className="bg-gray-200 flex justify-between flex-wrap">
              <div className=" w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Announced
                </h3>

                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Announced}</td>
                </table>
              </div>
              <div className="  w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Launched
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Launched}</td>
                </table>
              </div>

              <div className="w-96 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Physical size
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <tbody>
                    
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Dimension
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Physical Size"].Dimensions}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Material
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Physical Size"].Material}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Weight
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Physical Size"].Weight}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        SIM
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Physical Size"].SIM}
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>

              <div className="w-96 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Display
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <tbody>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Resolution
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Display"].Resolution}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Size
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Display"].Size}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Technology
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Display"].Technology}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-96 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Platform
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <tbody>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        OS
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Platform"].OS}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Chipset
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Platform"].Chipset}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        CPU
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Platform"].CPU}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        GPU
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Platform"].GPU}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Network
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Network}</td>
                </table>
              </div>
              <div className="w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Memory
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Memory}</td>
                </table>
              </div>

              <div className="w-full sm:w-96 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Camera
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <tbody>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2 text-red-500 border-r border-cyan-500">
                        Rear
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Camera"].Rear}
                      </td>
                    </tr>
                    <tr className="border-b border-cyan-500">
                      <td className="px-4 py-2  text-red-500 border-r border-cyan-500">
                        Front
                      </td>
                      <td className="px-4 py-2 text-black">
                        {device?.categories["Camera"].Front}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Communication
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">
                    {device.categories.Communication}
                  </td>
                </table>
              </div>
              <div className="w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Battery and Charging
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Battery}</td>
                </table>
              </div>
              <div className="w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Sensors
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Sensors}</td>
                </table>
              </div>
              <div className="w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Color
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Color}</td>
                </table>
              </div>
              <div className="w-96">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Price
                </h3>
                <table className="w-full border-collapse border border-cyan-500">
                  <td className="text-black">{device.categories.Price}</td>
                </table>
              </div>
            </div>
          )}
          <div className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-green-800">
              Description
            </h3>
            {/* Render each paragraph of the description as a separate <p> element */}
            {device?.description &&
              device.description.split("\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Additional Images */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-green-800">
              Additional Images
            </h3>
            <div className="flex justify-center items-center flex-wrap">
              {device?.images &&
                device.images.length > 1 &&
                device.images
                  .slice(1)
                  .map((image, index) => (
                    <img
                      key={index + 1}
                      src={image}
                      alt={`${device.name} Image ${index + 2}`}
                      className="w-auto h-auto sm:w-auto sm:h-auto md:w-auto md:h-auto object-cover rounded-md m-2 cursor-pointer"
                    />
                  ))}
            </div>
          </div>
          <Comments deviceId={device?.id} />
        </div>
      </div>
    </div>
  );
};

export default FullReview;
