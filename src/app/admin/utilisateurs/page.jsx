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
import { users, deleteUser } from "../../../services/users";
import UserForm from "./userForm";
import { Row, Col } from "antd";

const { Content } = Layout;
const { Search } = Input;

const Users = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const fetchedData = await users();
      setData(fetchedData);
      setOriginalData(fetchedData.users);
    } catch (error) {
      console.error("Error:", error);
      setError("Échec de l'affichage");
    }
  };
  
  useEffect(() => {
    fetchUsers();
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
      key: "id",
    },
    {
      title: "Nom",
      className: "lg:text-sm text-xs",
      dataIndex: "lastName",
      key: "lastName",
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
      key: "actions",
      render: (text, record) => (
        <span className="flex gap-2">
        <Button
          type="link"
          icon={<EditOutlined className="text-green-500 text-lg" />} 
          onClick={() => showModal(record.id)}
        />
        <Button
          type="link"
          icon={<DeleteOutlined style={{ color: 'red' }} />}  
          onClick={() => showDeleteConfirm(record.id)}
        />
      </span>
      
      ),
    },
  ];


  const showModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cet utilisateur?",
      content: "Cette action est irréversible.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const updatedData = data.filter((user) => user.id !== id);
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

  const handleUpdateSuccess = async() => {

  
    await fetchUsers();
    setIsModalOpen(false);
    notification.success({
      message: "Succès",
      description: "L'utilisateur a été modifié avec succès.",
      duration: 0,
    });
  };

  const handleAddSuccess = async() => {
    await fetchUsers();
    notification.success({
      message: "Succès",
      description: "L'utilisateur a été ajouté avec succès.",
      duration: 0,
    });
    setIsModalOpen(false);
  };

  return (
    <Content className="flex flex-col bg-white rounded-3xl">
      <div className="flex flex-col pt-20 pb-12">
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

            <Col xs={24} md={6} className="mt-4 lg:flex justify-end">
              <Button
                type="button"
                className="bg-[#06b6d4] text-black rounded-full px-8 py-3 flex items-center justify-center "
                icon={<PlusOutlined />}
                onClick={() => showModal(null)}
              >
                Ajouter
              </Button>
            </Col>
          </Row>

          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            className="overflow-x-auto"
          />
        </div>
      </div>

      <Modal open={isModalOpen} onCancel={handleModalCancel} footer={null}>
        <UserForm
          userId={selectedUserId}
          onSuccess={handleUpdateSuccess}
          onSuccessAdd={handleAddSuccess}
        />
      </Modal>
    </Content>
  );
};

export default Users;
