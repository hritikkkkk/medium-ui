// StatusCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface StatusCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatisticCard: React.FC<StatusCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card className="text-center shadow-md">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4">
        <CardTitle className="text-2xl text-white font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-4xl font-extrabold mb-2">{value}</div>
        <p className="text-gray-600">{description}</p>
        <div className="text-indigo-500 flex justify-center mt-4">{icon}</div>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
