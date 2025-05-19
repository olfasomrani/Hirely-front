import React from 'react';
import { Card } from 'antd';

const SectionBlock = ({ title, children }) => (
  <Card title={title} className="mb-4 shadow-lg rounded-md">
    {children}
  </Card>
);

export default SectionBlock;
