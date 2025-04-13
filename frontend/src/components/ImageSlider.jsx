import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: "/images/img1.jpeg",
    caption: "one-day hands-on workshop on Innovation in Computer Vision Techniques" 
  },
  {
    image: "/images/img2.jpeg",
    caption: "DICE TEAM participates at IIT Mandi 💡"
  },
  {
    image: "/images/img3.jpeg",
    caption: "Industrial Visit to Tech Park 🏭"
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[66vh] overflow-hidden">
      <img
        src={slides[current].image}
        alt="Slide"
        className="w-full h-full object-cover transition duration-500"
      />
      <div className="absolute bottom-6 left-6 bg-white/80 text-black p-4 rounded-md shadow-lg max-w-md">
        <p className="text-lg font-semibold">{slides[current].caption}</p>
      </div>
    </div>
  );
};

export default ImageSlider;
