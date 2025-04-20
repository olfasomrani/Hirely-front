"use client";
import React, { useState, useEffect } from "react";
import { Layout, Button, Table, notification, Modal, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { projects, deleteProject } from "@/services/projectUsers";
import { Row, Col } from "antd";

const { Content } = Layout;
const { Search } = Input;

function formatDate(dateString) {
  const date = new Date(dateString); 
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); 
  const year = date.getUTCFullYear(); 

  return `${day}-${month}-${year}`; 
}
function Users() {
  const { t ,i18n} = useTranslation("main");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [originalData, setOriginalData] = useState([]);
    const [project, setProject] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await projects();
        setData(fetchedData.projects);
        setOriginalData(fetchedData.projects);
      } catch (error) {
        console.error("Error :", error);
        setError("Échec de l'affichage");
      }
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredData = originalData.filter((project) =>
      project.title.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date de depôt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "filed") return "Déposé";
        if (status === "draft") return "Brouillon";
        return status;
      },
    },
    {
      title: "Catégorie",
      key: "industryCategories",
      render: (record) =>
        record.industryCategories && Array.isArray(record.industryCategories)
          ? record.industryCategories.map(cat => cat.industryCatName).join(", ")
          : "N/A",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <span className="flex gap-2 ">
          <Button
            type="link"
            icon={<EditOutlined className="text-green-500" />}
            onClick={() => handleEdit(record)}
          />
            <Button
            type="link"
            icon={<DeleteOutlined className="text-red-500" />}
            onClick={() => showDeleteConfirm(record.idProject)}
          />
        </span>
      ),
    },
  ];
  const showDeleteConfirm = (idProject) => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir supprimer ce projet?',
      content: 'Cette action est irréversible.',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: () => handleDelete(idProject),
    });
  };
  const handleEdit = (record) => {
    localStorage.setItem("selectedProjectId", record.idProject);
    
    router.push("/admin/projets/updateProject");
  };
  const showModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleDelete = async (idProject) => {
    try {
      const response = await deleteProject(idProject);
      if (response.message === "Project deleted successfully") {
        const updatedData = data.filter((project) => project.idProject !== idProject);
        setData(updatedData);
        setOriginalData(updatedData);
        notification.success({
          message: "Succès",
          description: "Projet supprimé avec succès.",
          duration: 0,
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error(error); // Debugging error
      notification.error({
        message: "Erreur",
        description: "Échec de la suppression du projet.",
        duration: 0,
      });
    }
  };
  




  return (
    <Content className="flex flex-col bg-white rounded-3xl">
      <div className="flex flex-col px-4 lg:px-20 pt-10 lg:pt-20 pb-12">
        <Row justify="space-between" className="mb-4">
          <Col xs={24} md={12}>
            <Search
              placeholder="Rechercher un projet"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full md:max-w-sm"
            />
          </Col>
        </Row>
        <div className="pt-5 lg:pt-10 pb-10 lg:pb-20 mt-5 lg:mt-9 w-full bg-white rounded-2xl max-w-full lg:w-[1100px] mx-auto">
          <div className="mb-4 text-xl lg:text-2xl font-semibold text-center lg:text-left">
            Liste des projets
          </div>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowKey="idProject"
            className="overflow-x-auto"
            locale={{
              emptyText: t("No data"),
            }}
          />
        </div>
      </div>
    </Content>
  );
}

export default Users;
