"use client";

import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";

const MessageContent = ({ message, onDelete, isChatBot }) => {
    return (
        <div
            className={`w-full flex flex-row items-center ${
                message.isReceiver ? "justify-start" : "justify-end"
            }`}
            dir="ltr">
            {message.isReceiver ? (
                <ReceiverMessage
                    message={message}
                    onDelete={onDelete}
                    isChatBot={isChatBot}
                />
            ) : (
                <SenderMessage
                    message={message}
                    onDelete={onDelete}
                    isChatBot={isChatBot}
                />
            )}
        </div>
    );
};

export default MessageContent;
