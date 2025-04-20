import React from "react";
import AttachmentViewer from "./AttachmentViewer";
import { formatMessage } from "@/utils/helpers";

const ChatAttachmentBlock = ({ message, isReceiver }) => {
    return (
        <div
            className={`grid grid-cols-1 w-full ${
                message.content ? "pb-2" : "py-2"
            }`}>
            {message.content && (
                <div
                    className="break-words px-2 py-1 w-full"
                    dangerouslySetInnerHTML={{
                        __html: formatMessage(message.content),
                    }}
                />
            )}
            <AttachmentViewer
                file={message.attachment}
                isReceiver={isReceiver}
            />
        </div>
    );
};

export default ChatAttachmentBlock;
