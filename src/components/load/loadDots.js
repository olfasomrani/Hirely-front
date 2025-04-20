"use client";
const LoadDots = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center space-x-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-ping delay-200"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-ping delay-400"></div>
      </div>
    </div>
  );
};

export default LoadDots;
