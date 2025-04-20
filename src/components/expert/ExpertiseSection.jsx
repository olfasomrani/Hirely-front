import React, { useEffect } from "react";
import { Form, Select, Input, Row, Col } from "antd";

const ExpertiseSection = ({
  expertiseData,
  onSectorChange,
  onSubSectorChange,
  selectedSector,
  subSectors,
  form,
}) => {
  useEffect(() => {
    if (selectedSector) {
      form?.setFieldsValue({
        expertise: selectedSector,
        subExpertise: subSectors.length > 0 ? subSectors[0].idSubExpertiseSector : null,
      });
    }
  }, [selectedSector, subSectors, form]);

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Secteur d'expertise"
            name="expertise"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner votre secteur d'expertise",
              },
            ]}
          >
            <Select
              options={expertiseData.map((sector) => ({
                label: sector.sectorName,
                value: sector.idExpertiseSector,
              }))}
              onChange={onSectorChange}
            />
          </Form.Item>
        </Col>

        {selectedSector && (
          <Col span={12}>
            <Form.Item
              label="Sous-secteur d'expertise"
              name="subExpertise"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner un sous-secteur d'expertise",
                },
              ]}
            >
              <Select
                options={subSectors.map((subSector) => ({
                  label: subSector.subSectorName,
                  value: subSector.idSubExpertiseSector,
                }))}
                onChange={onSubSectorChange}
              />
              
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
};

export default ExpertiseSection;