"use client";
import React, { useState, useEffect } from "react";
import { Layout, Button, Table, notification, Modal, Input } from "antd";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from 'dayjs';
import { offres, deleteOffre } from "../../../services/offres";
import { Row, Col } from "antd";

const { Content } = Layout;
const { Search } = Input;

const Offres = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOffres = async () => {
      try {
        const fetchedData = await offres();
        setData(fetchedData);
        setOriginalData(fetchedData.offres);
      } catch (error) {
        console.error("Error:", error);
        setError("Échec de l'affichage");
      }
    };
    
    useEffect(() => {
      fetchOffres();
    }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredData = originalData.filter(
      (offre) =>
        offre.title.toLowerCase().includes(value.toLowerCase()) ||
        offre.location.toLowerCase().includes(value.toLowerCase()) 
    );
    setData(filteredData);
  };

  const columns = [
    {
      title: "Titre",
      dataIndex: "title",
      className: "lg:text-sm text-xs",
      key: "title",
    },
    {
      title: "Description",
      className: "lg:text-sm text-xs",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Emplacement",
      dataIndex: "location",
      className: "lg:text-sm text-xs",
      key: "location",
    },
    {
      title: "Société",
      dataIndex: "recruiter",
      className: "lg:text-sm text-xs",
      key: "campanyName",
      render: (recruiter) => recruiter?.companyName || "N/A",
    },
    {
        title: "Date de création",
        dataIndex: "createdAt",
        key: "createdAt",
        className: "lg:text-sm text-xs",
        render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY à HH:mm"),
      },
    {
      title: "Actions",
      className: "lg:text-sm text-xs",
      key: "actions",
      render: (text, record) => (
        <span className="flex gap-2">
          <Button
            type="link"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => showDeleteConfirm(record.id)}
          />
        </span>
      ),
    },
  ];

  const showModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette offre?",
      content: "Cette action est irréversible.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (offreId) => {
    try {
      await deleteOffre(offreId);
      const updatedData = data.filter((offre) => offre.id !== offreId);
      setData(updatedData);
      setOriginalData(updatedData);
      notification.success({
        message: "Succès",
        description: "offre supprimé avec succès.",
        duration: 0,
      });
    } catch (error) {
      notification.error({
        message: "Erreur",
        description: "Échec de la suppression de la offre.",
        duration: 0,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <Content className="flex flex-col bg-white rounded-3xl">
      <div className="flex flex-col pt-20 pb-12">
        <div className="p-5 lg:p-20 mt-9 bg-white rounded-2xl lg:w-full">
          <div className="mb-4 mt-[-100px] text-base lg:text-2xl font-semibold text-left">
            Liste des offres
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
    </Content>
  );
};

export default Offres;
