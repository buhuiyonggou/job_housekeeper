"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from "recharts";
import { Card, Heading } from "@chakra-ui/react";
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
        <Heading as='h3' size='md' noOfLines={1} mb="2">
        Bar Chart
      </Heading>
      <ResponsiveContainer width="90%"  height={350}>
        <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
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

