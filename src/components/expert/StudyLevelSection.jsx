import React, { useEffect } from "react";
import { Form, Select, Row, Col } from "antd";

const StudyLevelSection = ({
  studyLevels,
  handleStudyLevelChange,
  onSubStudyLevel,
  selectedStudyLevel,
  subStudyLevels,
  form,
}) => {
  useEffect(() => {
    if (selectedStudyLevel) {
      form?.setFieldsValue({
        studyLevels: selectedStudyLevel,
        subLevel:
        subStudyLevels.length > 0 ? subStudyLevels[0].idSubStudyLevel : null,
      });
    }
  }, [selectedStudyLevel, subStudyLevels, form]);
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Niveau d'étude"
            name="studyLevels"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner un niveau d'étude",
              },
            ]}
          >
            <Select
              placeholder="Sélectionnez votre niveau d'étude"
              onChange={handleStudyLevelChange}
              options={studyLevels.map((level) => ({
                value: level.idStudyLevel,
                label: level.stLevelName,
              }))}
            />
          </Form.Item>
        </Col>

        {selectedStudyLevel && (
          <Col span={12}>
            <Form.Item
              label="Sous-niveau d'étude"
              name="subLevel"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner un sous-niveau d'étude",
                },
              ]}
            >
              <Select
                placeholder="Sélectionnez votre sous-niveau d'étude"
                options={subStudyLevels.map((subLevel) => ({
                  value: subLevel.idSubStudyLevel,
                  label: subLevel.subStLevelName,
                }))}
                onChange={onSubStudyLevel}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
};
export default StudyLevelSection;
