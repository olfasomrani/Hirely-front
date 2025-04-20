import ImageViewer from "@/components/ui/preview/ImageViewer";
import React from "react";
import VideoReader from "./videoReader";
import DocumentPreview from "./DocumentPreview";
import AudioReader from "./AudioReader";

export const fileGroups = {
    images: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "svg",
        "webp",
        "tiff",
        "ico",
        "heic",
        "heif",
        "raw",
        "cr2",
        "nef",
        "orf",
        "sr2",
    ],
    videos: [
        "mp4",
        "mov",
        "avi",
        "mkv",
        "webm",
        "flv",
        "wmv",
        "m4v",
        "3gp",
        "mpg",
        "mpeg",
        "vob",
        "ogv",
    ],
    documents: [
        "pdf",
        "doc",
        "docx",
        "ppt",
        "pptx",
        "xls",
        "xlsx",
        "txt",
        "odt",
        "ods",
        "odp",
        "rtf",
        "md",
        "csv",
    ],
    audios: [
        "mp3",
        "wav",
        "aac",
        "ogg",
        "flac",
        "wma",
        "m4a",
        "opus",
        "amr",
        "aiff",
        "alac",
    ],
    compressed: [
        "zip",
        "rar",
        "7z",
        "tar",
        "gz",
        "bz2",
        "xz",
        "iso",
        "dmg",
        "cab",
        "tgz",
        "z",
        "jar",
    ],
};

const AttachmentViewer = ({ file, isReceiver }) => {
    if (fileGroups.images.includes(file.ext))
        return (
            <ImageViewer
                src={file}
                className="object-cover h-full rounded-[5px] overflow-hidden"
                preview
            />
        );
    if (fileGroups.videos.includes(file.ext))
        return <VideoReader file={file} />;
    if (fileGroups.documents.includes(file.ext))
        return (
            <DocumentPreview type="doc" file={file} isReceiver={isReceiver} />
        );
    if (fileGroups.audios.includes(file.ext))
        return <AudioReader file={file} />;
    if (fileGroups.compressed.includes(file.ext))
        return (
            <DocumentPreview type="zip" file={file} isReceiver={isReceiver} />
        );

    return <DocumentPreview file={file} isReceiver={isReceiver} />;
};

export default AttachmentViewer;
