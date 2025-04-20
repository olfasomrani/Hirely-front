import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 animate-pulse z-50">
      <div className="flex flex-col items-center">
        <Image
          src={"/images/logo/logoBusiness.svg"}
          alt="Loading"
          width={500}
          height={150}
        />
        <p className="mt-4 text-lg text-gray-600">Chargement...</p>
      </div>
    </div>
  );
};

export default Loader;
