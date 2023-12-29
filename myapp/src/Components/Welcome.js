import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WelcomeComponent = () => {
  const topHalfRef = useRef();
  const bottomHalfRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    // Animate top half
    gsap.from(topHalfRef.current, {
      duration: 5,
      yPercent: -100,
      ease: 'power3.out'
    });

    // Animate bottom half
    gsap.from(bottomHalfRef.current, {
      duration: 5,
      yPercent: 100,
      ease: 'power3.out'
    });

    // Animate title
    gsap.from(titleRef.current, {
      duration: 3,
      delay: 0.5,
      opacity: 0,
      scale: 0.5,
      ease: 'power3.out'
    });

    // Animate subtitle
    gsap.from(subtitleRef.current, {
      duration: 3,
      delay: 1,
      opacity: 0,
      scale: 0.5,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div ref={topHalfRef} className="absolute  top-0 w-full h-1/2 bg-white opacity-75">
        {/* Empty top half */}
      </div>
      <div ref={bottomHalfRef} className="absolute bottom-0 w-full h-1/2 bg-white opacity-75">
        {/* Empty bottom half */}
      </div>
      <div className="text-center p-10 bg-white rounded-lg shadow-xl">
        <h1 ref={titleRef} className="text-4xl  md:text-6xl font-extrabold text-gray-800 mb-4">
          Welcome to Zia and Shah
        </h1>
        <h2 ref={subtitleRef} className="text-xl md:text-3xl font-semibold text-gray-700 mb-8">
          Legal Consultant
        </h2>
      </div>
    </div>
  );
};

export default WelcomeComponent;
