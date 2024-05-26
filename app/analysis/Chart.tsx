"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, Legend, Line } from "recharts";
import { Card } from "@chakra-ui/react";
import { SummaryStatus, getAnalysisColorScheme } from "@/app/utils/Reusables";
import { Status } from "@prisma/client";

const Chart = ({ data }: { data: SummaryStatus }) => {
  const chartData = [
    { name: "Applied", value: data.applied },
    { name: "Interview", value: data.interview },
    { name: "Offer", value: data.offer },
    { name: "Rejected", value: data.rejected },
    { name: "Updating", value: data.updating },
  ];

  return (
    <Card mt="6">
      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" barSize={60}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getAnalysisColorScheme(entry.name as Status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;

