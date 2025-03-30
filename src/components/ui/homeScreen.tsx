"use client";
import { useEffect, useState, ReactElement } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const images: string[][] = [
  ["/images/home_screen/1.png", "/images/home_screen/2.png", "/images/home_screen/3.png"],
  ["/images/home_screen/9.jpg", "/images/home_screen/10.jpg", "/images/home_screen/11.jpg", "/images/home_screen/12.jpg"],
  ["/images/home_screen/1.png", "/images/home_screen/2.png", "/images/home_screen/3.png"],
];

export default function HomePage(): ReactElement {
  const [showPopups, setShowPopups] = useState(false);
  const [showSecondPopups, setShowSecondPopups] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopups(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col md:flex-row h-screen p-4 relative transition-colors duration-300 ${showPopups ? 'bg-gray-300' : 'bg-gray-100'}`}>
      {/* Left Section - Image Rows */}
      <div className="flex-1 flex flex-col gap-4 p-2">
        {/* First Row - Fixed Images (3 images) */}
        <div className="flex gap-4 w-full">
          {images[0].map((src: string, index: number) => (
            <div className="flex-1" key={index}>
              <Image
                src={src}
                alt={`Image ${index}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 33vw, 33vw"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Second Row - Fixed Images (4 images) */}
        <div className="flex gap-4 w-full">
          {images[1].map((src: string, index: number) => (
            <div className="flex-1" key={index}>
              <Image
                src={src}
                alt={`Image ${index}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 25vw, 25vw"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Third Row - Fixed Images (3 images) */}
        <div className="flex gap-4 w-full">
          {images[0].map((src: string, index: number) => (
            <div className="flex-1" key={index}>
              <Image
                src={src}
                alt={`Image ${index}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 33vw, 33vw"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        {showPopups && !showSecondPopups && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50 transition-opacity duration-300">
          <div className="flex bg-white p-6 rounded-lg shadow-lg gap-6">
            {/* Left Side - Image */}
            <div className="w-1/4">
              <Image src="/images/home_screen/image.png" alt="Popup Image" width={280} height={200} className="rounded-lg" />
            </div>
            
            {/* Right Side - Content */}
            <div className="w-3/4 flex flex-col items-center">
              <Image src="/images/home_screen/download.png" alt="Popup Logo" width={200} height={150} className="mb-4" />
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 p-4 rounded-lg"><button className="bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-3 w-auto">
          <Image src="/images/home_screen/apple.png" alt="QR App Store" width={50} height={50} className="rounded-lg" />
          <div className="flex flex-col text-left">
            <span className="text-s">Downlaod on</span>
            <span className="text-xl font-bold">App Store</span>
          </div>
        </button>

        {/* Additional Image Before Google Play Button */}
        <div className="py-4">
          <Image src="/images/home_screen/logo.png" alt="Before Play Store" width={120} height={100} className="rounded-lg" />
        </div>
        <Image src="/images/home_screen/qrcode.png" alt="After Play Store" width={150} height={100} className="rounded-lg" /></div>
                <div className="bg-gray-100 p-4 rounded-lg"><button className="bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-3 w-auto">
          <Image src="/images/home_screen/googleplay.png" alt="QR Play Store" width={50} height={50} className="rounded-lg" />
          <div className="flex flex-col text-left">
            <span className="text-s">Get it on</span>
            <span className="text-xl font-bold">Google Play</span>
          </div>
        </button>

        {/* Additional Image After Google Play Button */}
        <div className="py-4">
          <Image src="/images/home_screen/logo.png" alt="Before Play Store" width={120} height={100} className="rounded-lg" />
        </div>
        <Image src="/images/home_screen/qrcode.png" alt="After Play Store" width={150} height={100} className="rounded-lg" /></div>
              </div>
              
              <button onClick={() => setShowSecondPopups(true)} className="px-6 py-2 bg-blue-500 text-white rounded-lg">Start Now</button>
            </div>
          </div>
        </div>
      )}
      {showSecondPopups && (
  <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50 transition-opacity duration-300">
    <div className="flex gap-6">
      <div className="bg-white mr-6 rounded-lg shadow-lg flex flex-col items-center">
        <Image src="/images/home_screen/kids.png" alt="Popup 1" width={300} height={150} className="rounded-lg" />
        <button className="mb-6 px-6 py-4 text-lg bg-green-500 text-white rounded-lg">Start Now</button>
      </div>
      <div className="bg-white ml-6 rounded-lg shadow-lg flex flex-col items-center">
        <Image src="/images/home_screen/adults.png" alt="Popup 2" width={300} height={150} className="rounded-lg" />
        <button className="mb-6 px-6 py-4 text-lg bg-green-500 text-white rounded-lg">
  Start Now
</button>

      </div>
    </div>
  </div>
)}

      </div>

      {/* Right Sidebar - App Download Links */}
      <div className="w-full md:w-1/4 flex flex-col items-center gap-4 px-2 py-4 border-l border-gray-300">
        {/* App Store Button */}
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-3 w-auto">
          <Image src="/images/home_screen/apple.png" alt="QR App Store" width={50} height={50} className="rounded-lg" />
          <div className="flex flex-col text-left">
            <span className="text-s">Download on</span>
            <span className="text-xl font-bold">App Store</span>
          </div>
        </button>

        {/* Additional Image Before Google Play Button */}
        <div className="py-4">
          <Image src="/images/home_screen/logo.png" alt="Before Play Store" width={120} height={100} className="rounded-lg" />
        </div>
        <Image src="/images/home_screen/qrcode.png" alt="After Play Store" width={150} height={100} className="rounded-lg" />
        {/* Google Play Button */}
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-3 w-auto">
          <Image src="/images/home_screen/googleplay.png" alt="QR Play Store" width={50} height={50} className="rounded-lg" />
          <div className="flex flex-col text-left">
            <span className="text-s">Get it on</span>
            <span className="text-xl font-bold">Google Play</span>
          </div>
        </button>

        {/* Additional Image After Google Play Button */}
        <div className="py-4">
          <Image src="/images/home_screen/logo.png" alt="Before Play Store" width={120} height={100} className="rounded-lg" />
        </div>
        <Image src="/images/home_screen/qrcode.png" alt="After Play Store" width={150} height={100} className="rounded-lg" />
        <div className="py-4">
          <Image src="/images/home_screen/conn.png" alt="After Play Store" width={150} height={100} className="rounded-lg" />
        </div>
      </div>
      
    </div>
  );
}
