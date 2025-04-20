import ImageViewer from "./ImageViewer";

const ProfileImage = ({
    src,
    gender = "sir",
    size = 48,
    border,
    borderColor,preview,
    style,
    className,
    ...props
}) => {
    return (
        <div
            className={ `${className || ""} rounded-full overflow-hidden` }
            style={{
                ...style,
                width: size,
                height: size,
                ...(border
                    ? {
                          border: `${border}px solid ${borderColor}`,
                      }
                    : {}),
            }}>
            <ImageViewer
                {...props}
                src={src}
                ErrorImage={
                    gender === "madam"
                        ? "/icons/gender/profileAvatarWomen.jpg"
                        : "/icons/gender/profileAvatarMen.jpg"
                }
                className="rounded-full overflow-hidden"
                style={{ width: size, height: size }}
                preview={preview}
            />
        </div>
    );
};

export default ProfileImage;
