import React from 'react';

function BackgroundShapes() {
  return (
    <div className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
      <div className="flex z-10 flex-col grow -mt-16 mr-0 max-md:mt-40 w-full">
        <div className="flex shrink-0 bg-neutral-900 h-[389px] w-[192px] mt-[-66px] rounded-[96px] max-md:w-full" />
        <div className="flex shrink-0 mt-16 bg-[#BC946B] w-[192px] h-[389px] rounded-[96px] max-md:mt-10" />
      </div>
    </div>
  );
}

export default BackgroundShapes;