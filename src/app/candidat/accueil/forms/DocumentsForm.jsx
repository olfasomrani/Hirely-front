// DocumentsForm.jsx
import React, { useState } from 'react';
import { Form, Upload, Button, Typography, Card, Space, message, Tooltip, Divider } from 'antd';
import { 
  UploadOutlined, 
  FilePdfOutlined, 
  FileImageOutlined, 
  FileTextOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const DocumentsForm = ({ onFinish, initialValues = {} }) => {
  const [fileList, setFileList] = useState({
    cv: initialValues.cv || [],
    coverLetter: initialValues.coverLetter || [],
    diploma: initialValues.diploma || [],
    certificates: initialValues.certificates || [],
    idCard: initialValues.idCard || []
  });

  const updateFileList = (type, info) => {
    let newFileList = [...info.fileList];
    
    // Limit number of files based on type
    if (type === 'certificates') {
      newFileList = newFileList.slice(-5); // Max 5 certificates
    } else {
      newFileList = newFileList.slice(-1); // Max 1 file for other types
    }
    
    setFileList(prev => ({
      ...prev,
      [type]: newFileList
    }));
    
    // Show upload status message
    if (info.file.status === 'done') {
      message.success(`${info.file.name} téléchargé avec succès`);
    } else if (info.file.status === 'error') {
      message.error(`Erreur de téléchargement de ${info.file.name}`);
    }
  };

  const getUploadProps = (type, accept, maxSize = 5, required = true) => {
    return {
      name: 'file',
      multiple: type === 'certificates',
      fileList: fileList[type],
      accept: accept,
      beforeUpload: file => {
        const isLessThan = file.size / 1024 / 1024 < maxSize;
        if (!isLessThan) {
          message.error(`Le fichier doit être inférieur à ${maxSize}MB!`);
        }
        // Return false to stop default upload behavior
        return false;
      },
      onChange: info => updateFileList(type, info),
      onDrop: e => {
        console.log('Dropped files', e.dataTransfer.files);
      }
    };
  };

  const documentTypes = [
    {
      key: 'cv',
      title: 'CV',
      description: 'Curriculum Vitae (format PDF)',
      icon: <FilePdfOutlined />,
      accept: '.pdf',
      required: true,
      maxSize: 2
    },
    {
      key: 'coverLetter',
      title: 'Lettre de motivation',
      description: 'Lettre de motivation (format PDF)',
      icon: <FileTextOutlined />,
      accept: '.pdf,.doc,.docx',
      required: false,
      maxSize: 2
    },
    {
      key: 'diploma',
      title: 'Diplôme',
      description: 'Copie de votre diplôme le plus élevé',
      icon: <FilePdfOutlined />,
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
      maxSize: 3
    },
    {
      key: 'certificates',
      title: 'Certificats',
      description: 'Certificats professionnels (maximum 5)',
      icon: <FilePdfOutlined />,
      accept: '.pdf,.jpg,.jpeg,.png',
      required: false,
      maxSize: 10,
      multiple: true
    },
    {
      key: 'idCard',
      title: 'Pièce d\'identité',
      description: 'Carte d\'identité ou passeport',
      icon: <FileImageOutlined />,
      accept: '.jpg,.jpeg,.png,.pdf',
      required: true,
      maxSize: 2
    }
  ];

  return (
    <Card className="form-card">
      <Title level={4}>Documents</Title>
      <Text type="secondary">
        Veuillez télécharger les documents suivants pour compléter votre dossier.
        Formats acceptés: PDF, JPG, PNG (taille max: voir chaque document).
      </Text>
      
      <Divider />
      
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        {documentTypes.map(doc => (
          <Form.Item
            key={doc.key}
            name={doc.key}
            label={
              <Space>
                {doc.title}
                {doc.required && <Text type="danger">*</Text>}
                <Tooltip title={`${doc.description}. Taille maximale: ${doc.maxSize}MB.`}>
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            }
            rules={[
              { 
                required: doc.required, 
                message: `Veuillez télécharger ${doc.title.toLowerCase()}` 
              }
            ]}
          >
            <Dragger 
              {...getUploadProps(doc.key, doc.accept, doc.maxSize, doc.required)}
              style={{ padding: '10px 0' }}
            >
              <p className="ant-upload-drag-icon">
                {doc.icon}
              </p>
              <p className="ant-upload-text">{doc.description}</p>
              <p className="ant-upload-hint">
                Cliquez ou glissez-déposez des fichiers dans cette zone pour les télécharger
              </p>
              <Button 
                icon={<UploadOutlined />}
                style={{ marginTop: 16 }}
              >
                Sélectionner un fichier
              </Button>
            </Dragger>
          </Form.Item>
        ))}
      </Form>
    </Card>
  );
};

export default DocumentsForm;