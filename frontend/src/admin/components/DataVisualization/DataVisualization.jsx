import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DataVisualization = () => {
  const data = [
    { name: 'Jan', submitted: 10, accepted: 7, rejected: 3 },
    { name: 'Feb', submitted: 15, accepted: 12, rejected: 3 },
    { name: 'Mar', submitted: 20, accepted: 18, rejected: 2 },
    { name: 'Apr', submitted: 25, accepted: 22, rejected: 3 },
    { name: 'May', submitted: 18, accepted: 14, rejected: 4 },
    { name: 'Jun', submitted: 30, accepted: 25, rejected: 5 },
    { name: 'Jul', submitted: 28, accepted: 24, rejected: 4 },
  ];

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="submitted" stackId="a" fill="#8884d8" name="Soumises" />
      <Bar dataKey="accepted" stackId="a" fill="#82ca9d" name="Acceptées" />
      <Bar dataKey="rejected" stackId="a" fill="#ff7f7f" name="Rejetées" />
    </BarChart>
  );
};

export default DataVisualization;
