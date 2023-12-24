import React from 'react';

const Errorpage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 w-full">
      <div className="text-9xl">😢</div>
      <h1 className="text-red-600 font-bold text-6xl mt-5">401 Unauthorized Access</h1>
      <p className="mt-3 text-gray-600 text-xl max-w-xs text-center">
        It seems you don't have permission to access this page.
      </p>
    </div>
  );
};

export default Errorpage;
