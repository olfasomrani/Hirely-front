"use client"
import React, { useLayoutEffect, useState } from "react";
import { Image as Img, Space } from "antd";

const ImageViewer = ({
    src,
    ErrorImage = "/images/broken.webp",
    OnLoadImage = "/images/loading.gif",
    preview = false,
    ...props
}) => {
    const [imgSrc, setSrc] = useState(OnLoadImage);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    useLayoutEffect(() => {
        setSrc(OnLoadImage);
        const img = new Image();
        img.src =
            typeof src === "object"
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/${src?.path}`
                : String(src).startsWith("uploads")
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/${src}`
                : src;

                img.onload = () => {
            setSrc(img.src);
        };

        img.onerror = () => {
            setSrc(ErrorImage);
        };
    }, [src, ErrorImage]);
    return (
        <Img
            src={imgSrc}
            loading="lazy"
            decoding="async"
            {...props}
            className={`${props.className || ""} select-none`}
            preview={
                preview
                    ? {
                          visible: isPreviewVisible,
                          maskClosable: true,
                          onVisibleChange: (visible) => {
                              setIsPreviewVisible(visible);
                          },
                          toolbarRender: (_, { icons, actions }) => (
                              <Space>
                                  <button
                                      onClick={actions.onZoomOut}
                                      style={{
                                          background: "none",
                                          border: "none",
                                          cursor: "pointer",
                                      }}>
                                      {icons.zoomOutIcon}
                                  </button>
                                  <button
                                      onClick={actions.onZoomIn}
                                      style={{
                                          background: "none",
                                          border: "none",
                                          cursor: "pointer",
                                      }}>
                                      {icons.zoomInIcon}
                                  </button>
                              </Space>
                          ),
                      }
                    : false
            }
            onClick={(e) => {
                if (preview) {
                    setIsPreviewVisible(true);
                }
                props.onClick?.(e);
            }}
        />
    );
};

export default ImageViewer;
