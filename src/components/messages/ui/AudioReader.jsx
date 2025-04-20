import React from "react";

const AudioReader = ({ file }) => {
    return (
        <audio controls preload="metadata" className="bg-gray-200 max-w-full">
            <source
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/${file.path}`}
                type="audio/mp3"
            />
            Your browser does not support the audio tag.
        </audio>
    );
};

export default AudioReader;
