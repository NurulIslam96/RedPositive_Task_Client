import React from 'react';

const Spinner = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex animate-pulse text-4xl font-bold justify-center items-center">
        <p>L</p>
        <div className="relative w-7 h-7 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 rounded-full border-2 border-white"></div>
        </div>
        <p>ADING...</p>
      </div>
    </div>
  );
};

export default Spinner;
