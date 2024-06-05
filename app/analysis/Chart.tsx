"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  CartesianGrid,
  LineChart,
  Legend,
  Line,
  Pie,
  PieChart,
} from "recharts";
import { Box, Card, Flex, Heading } from "@chakra-ui/react";
import { SummaryStatus, getAnalysisColorScheme } from "@/app/src/utils/Reusables";
import { Status } from "@prisma/client";
import axios from "axios";

// fetch data analysis from the server
const fetchApplicationsSubmitted = async () => {
  const response = await axios.get("/api/analysis");
  if (response.status !== 200) {
    throw new Error("Failed to fetch applications data");
  }
  return response.data;
};

const Chart = ({ data }: { data: SummaryStatus }) => {
  // Define all types of status for the bar chart
  const chartData = [
    { name: "Applied", value: data.applied },
    { name: "Interview", value: data.interview },
    { name: "Offer", value: data.offer },
    { name: "Rejected", value: data.rejected },
    { name: "Updating", value: data.updating },
  ];

  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const applicationsData = await fetchApplicationsSubmitted();
        setLineChartData(applicationsData.chartDataByMonth);
        setPieChartData(applicationsData.chartDataByCategory);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <Card mt="6">
      <Flex  direction={{ base: "column", md: "row" }} justify="center" >
        
        <Box width={{ base: "100%", md: "50%" }}>
        <Heading as="h3" size="md" noOfLines={1} mb="2" textAlign="center">
          Bar Chart
        </Heading>
        <ResponsiveContainer width="90%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(tick) => Math.floor(tick).toString()}/>
            <Tooltip />
            <Bar dataKey="value" barSize={60}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getAnalysisColorScheme(entry.name as Status)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </Box>
        
        <Box width={{ base: "100%", md: "50%" }}>
        <Heading as="h3" size="md" noOfLines={1} mb="2" mt="4" textAlign="center">
          Recent Applications Analysis
        </Heading>
        <ResponsiveContainer width="90%" height={350}>
          <LineChart
            data={lineChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(tick) => Math.floor(tick).toString()}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        </Box>
        
        <Box width={{ base: "100%", md: "33%" }}>
          <Heading as="h3" size="md" noOfLines={1} mb="2" mt="4" textAlign="center">
            Applications by Category
          </Heading>
          <ResponsiveContainer width="90%" height={350}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </Card>
  );
};

export default Chart;