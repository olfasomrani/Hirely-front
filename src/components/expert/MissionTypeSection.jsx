import React from "react";
import { Form, Select, Row, Col } from "antd";

const MissionTypeSection = ({
  missionTypes,
  handleMissionTypeChange,
  selectedMissionType,
  subMissionTypes,
  onSubMissionType,
}) => (
  <>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Type de mission"
          name="missionType"
          rules={[
            {
              required: true,
              message: "Veuillez sélectionner un type de mission",
            },
          ]}
        >
          <Select
            placeholder="Sélectionnez votre type de mission"
            onChange={handleMissionTypeChange}
            options={missionTypes.map((type) => ({
              value: type.idMissionType,
              label: type.typeName,
            }))}
          />
        </Form.Item>
      </Col>

      {selectedMissionType && (
        <Col span={12}>
          <Form.Item
            label="Sous-type de mission"
            name="subMissionType"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner un sous-type de mission",
              },
            ]}
          >
            <Select
              placeholder="Sélectionnez votre sous-type de mission"
              options={subMissionTypes.map((subType) => ({
                value: subType.idSubMissionType,
                label: subType.subTypeName,
              }))}
              onChange={onSubMissionType}
            />
          </Form.Item>
        </Col>
      )}
    </Row>
  </>
);

export default MissionTypeSection;
