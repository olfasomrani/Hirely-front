"use client";
import React, { useState, useEffect } from "react";
import { Layout, Button, Table, notification, Modal, Input } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    LockOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import { users, deleteUser, updateUser } from "../../../services/users";
import EditUser from "./formUser";
import { Row, Col } from "antd";
// import { useTranslation } from "next-i18next";
import ProfileImage from "../../../components/ui/preview/ProfileImage";

const { Content } = Layout;
const { Search } = Input;

function Users() {
    // const { t, i18n } = useTranslation("main");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [originalData, setOriginalData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await users();
                const usersWithPhotos = fetchedData.users;

                setData(fetchedData);
                console.log("userrrs",data);
                setOriginalData(usersWithPhotos);
            } catch (error) {
                console.error("Error :", error);
                setError("Échec de l'affichage");
            }
        };
        fetchData();
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredData = originalData.filter(
            (user) =>
                user.firstName.toLowerCase().includes(value.toLowerCase()) ||
                user.lastName.toLowerCase().includes(value.toLowerCase()) ||
                user.email.toLowerCase().includes(value.toLowerCase()) ||
                user.role.toLowerCase().includes(value.toLowerCase())
        );
        setData(filteredData);
    };

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            className: "lg:text-sm text-xs",
            key: "idUser",
        },
        {
            title: "Photo",
            dataIndex: "photo",
            className: "lg:text-sm text-xs",
            key: "photo",
            render: (photo, record) => (
                <ProfileImage src={photo} gender={record.civility} size={90} preview/>
            ),
        },
        {
            title: "Nom",
            className: "lg:text-sm text-xs",
            dataIndex: "lastName",
            key: "fullName",
        },
        {
            title: "Prénom",
            dataIndex: "firstName",
            className: "lg:text-sm text-xs",
            key: "firstName",
        },
        {
            title: "Email",
            dataIndex: "email",
            className: "lg:text-sm text-xs",
            key: "email",
        },
        {
            title: "Titre",
            dataIndex: "civility",
            className: "lg:text-sm text-xs",
            key: "civility",
        },
        {
            title: "Société",
            dataIndex: "company",
            className: "lg:text-sm text-xs",
            key: "company",
        },
        {
            title: "Rôle",
            dataIndex: "role",
            className: "lg:text-sm text-xs",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            className: "lg:text-sm text-xs",
            key: "status",
        },
        {
            title: "Actions",
            className: "lg:text-sm text-xs",
            key: "action",
            render: (text, record) => (
                <span className="flex gap-2 ">
                    <Button
                        type="link"
                        icon={<EditOutlined className="text-green-500" />}
                        onClick={() => showModal(record.idUser)}
                    />
                    <Button
                        type="link"
                        icon={<DeleteOutlined className="text-red-500" />}
                        onClick={() => showDeleteConfirm(record.idUser)}
                    />
                    <Button
                        type="link"
                        icon={
                            record.status === "Actif" ? (
                                <UnlockOutlined className="text-blue-500" />
                            ) : (
                                <LockOutlined className="text-red-500" />
                            )
                        }
                        onClick={() =>
                            handleUserStatusChange(
                                record.idUser,
                                record.status === "Actif" ? "InActif" : "Actif"
                            )
                        }
                    />
                </span>
            ),
        },
    ];
    const handleUserStatusChange = async (userId, status) => {
        try {
            await updateUser(userId, { status });
            const updatedData = data.map((user) =>
                user.idUser === userId ? { ...user, status } : user
            );
            setData(updatedData);
            setOriginalData(updatedData);
            notification.success({
                message: "Succès",
                description: `Le statut de l'utilisateur a été ${
                    status === "Actif" ? "activé" : "désactivé"
                }.`,
                duration: 0,
            });
        } catch (error) {
            notification.error({
                message: "Erreur",
                description: `Échec de la mise à jour du statut de l'utilisateur.`,
                duration: 0,
            });
        }
    };

    const showModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };
    const showDeleteConfirm = (userId) => {
        Modal.confirm({
            title: "Êtes-vous sûr de vouloir supprimer cet utilisateur?",
            content: "Cette action est irréversible.",
            okText: "Oui",
            okType: "danger",
            cancelText: "Non",
            onOk: () => handleDelete(userId),
        });
    };
    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            const updatedData = data.filter((user) => user.idUser !== userId);
            setData(updatedData);
            setOriginalData(updatedData);
            notification.success({
                message: "Succès",
                description: "Utilisateur supprimé avec succès.",
                duration: 0,
            });
        } catch (error) {
            notification.error({
                message: "Erreur",
                description: "Échec de la suppression de l'utilisateur.",
                duration: 0,
            });
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdateSuccess = (updatedUser) => {
        setIsModalOpen(false);
        const updatedData = data.map((user) =>
            user.idUser === updatedUser.idUser ? updatedUser : user
        );
        setData(updatedData);
        setOriginalData(updatedData);
        notification.success({
            message: "Succès",
            description: "L'utilisateur a été modifié avec succès.",
            duration: 0,
        });
        window.location.reload();
    };

    const handleAddSuccess = (response) => {
        const newUser = response.user;
        const updatedData = [...data, newUser];
        setData(updatedData);
        setOriginalData(updatedData);
        notification.success({
            message: "Succès",
            description: "L'utilisateur a été ajouté avec succès.",
            duration: 0,
        });
        setIsModalOpen(false);
    };

    return (
        <Content className="flex flex-col bg-white rounded-3xl">
            <div className="flex flex-col  pt-20 pb-12">
                <div className="p-5 lg:p-20 mt-9 bg-white rounded-2xl lg:w-full">
                    <div className="mb-4 mt-[-100px] text-base lg:text-2xl font-semibold text-left">
                        Liste des utilisateurs
                    </div>
                    <Row justify="space-between" className="mb-4">
                        <Col xs={24} md={12}>
                            <Search
                                placeholder="Rechercher un utilisateur"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-[180px] lg:w-[400px]"
                            />
                        </Col>
                        <Col
                            xs={24}
                            md={6}
                            className="justify-start mt-4 lg:flex justify-end">
                            <Button
                                type="button"
                                className="bg-primary text-white"
                                icon={<PlusOutlined />}
                                onClick={() => showModal(null)}>
                                Ajouter
                            </Button>
                        </Col>
                    </Row>

                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        rowKey="idUser"
                        className="overflow-x-auto"
                        // locale={{
                        //     emptyText: t("No data"),
                        // }}
                    />
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onCancel={handleModalCancel}
                footer={null}>
                {selectedUserId ? (
                    <EditUser
                        userId={selectedUserId}
                        onSuccess={handleUpdateSuccess}
                    />
                ) : (
                    <EditUser onSuccessAdd={handleAddSuccess} />
                )}
            </Modal>
        </Content>
    );
}

export default Users;
