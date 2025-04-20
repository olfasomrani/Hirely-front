import React, { useState } from "react";
import { Dropdown, Modal, Button } from "antd";
import { MoreOutlined, CheckCircleOutlined } from "@ant-design/icons";
import ProfileImage from "../ui/preview/ProfileImage";

const DirectoryCard = ({ user, onConnect }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleRequest = async () => {
        if (onConnect) {
            setIsModalVisible(true);
        }
    };

    const confirmRequest = async () => {
        await onConnect();
        setRequestSent(true);
        setIsConfirming(false);
        setIsModalVisible(false);
    };

    const cancelRequest = () => {
        setIsConfirming(false);
        setIsModalVisible(false);
    };

    return (
        <div
            className="flex items-center p-4 mb-4 bg-white h-[140px]"
            style={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
            }}>
            <ProfileImage
                src={user.photo}
                gender={user.civility}
                preview
                alt="Profile"
                size={90}
                className="me-4"
            />
            <div className="flex-1 md:flex-row flex-col">
                <h3 className="md:text-lg text-sm font-semibold">
                    {user.firstName} {user.lastName}
                </h3>
                <p className="md:text-sm text-xs text-gray-500">
                    {user.company?.companyName}
                </p>
                <p className="md:text-sm text-xs text-gray-500">
                    {user.countries?.join(", ")}
                </p>
            </div>

            <button
                onClick={handleRequest}
                className={`mr-16 px-4 py-0.5 rounded flex items-center text-center ${
                    requestSent
                        ? "bg-[#BC946B] text-white"
                        : "border border-black text-black"
                }`}
                disabled={requestSent}>
                {requestSent ? (
                    <>Demande de mise en relation transmise</>
                ) : (
                    <>
                        <img
                            src="/icons/profile/user-plus.svg"
                            alt="User"
                            className="mr-2 w-6 h-6"
                        />
                        <span className=" hidden md:inline">
                            Demander une <br /> mise en relation
                        </span>
                    </>
                )}
            </button>

            {/* <Dropdown overlay={menu} trigger={["click"]}>
        <button className="mr-6 text-black" style={{ fontSize: "30px" }}>
          <MoreOutlined rotate={90} />
        </button>
      </Dropdown> */}

            <Modal
                visible={isModalVisible}
                onCancel={cancelRequest}
                footer={null}
                centered>
                <div className="flex flex-col items-center">
                    <CheckCircleOutlined
                        style={{ fontSize: "48px", color: "green" }}
                    />
                    <p className="text-lg font-semibold mt-4 text-center">
                        Vous avez demandé une mise en relation. Merci de
                        confirmer ou d'annuler.
                        <br />
                        Si vous confirmez, la demande sera transmise à l'équipe
                        du Business Club qui l'étudiera.
                    </p>
                    <div className="mt-4 flex space-x-4">
                        <Button type="primary" onClick={confirmRequest}>
                            Confirmer
                        </Button>
                        <Button onClick={cancelRequest}>Annuler</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DirectoryCard;
