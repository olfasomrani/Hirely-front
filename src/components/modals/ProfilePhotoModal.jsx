import React from 'react';
import { Modal, Input, Button } from 'antd';

const PhotoModal = ({ visible, onClose, photo, onPhotoChange, onPhotoUpdate }) => {
  return (
    <Modal open={visible} onCancel={onClose} footer={null}>
      <img
        src={photo}
        alt="User Photo"
        style={{ width: '100%', height: 'auto' }}
      />
      <div style={{ marginTop: '10px' }}>
        <Input
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          style={{ marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose}>Fermer</Button>
          <Button type="primary" onClick={onPhotoUpdate}>
            Modifier
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;