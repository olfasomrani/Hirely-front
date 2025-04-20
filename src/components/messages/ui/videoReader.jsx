"use client";
import MessageService from "@/services/messages/message.service";
import React, { useEffect, useState, useRef } from "react";

const VideoReader = ({ file }) => {
    const videoRef = useRef(null);
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        MessageService.getVideoThumbNail(file.path)
            .then((res) => {
                setPoster(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/${res.data.path}`
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, [file]);

    return (
        <video
            controls
            preload="none"
            ref={videoRef}
            poster={poster}
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/${file.path}`}
            className="max-h-[200px] object-cover overflow-hidden rounded-[5px]"></video>
    );
};

export default VideoReader;
