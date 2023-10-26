import React from "react";
import { Pie } from "react-chartjs-2";
import { Text } from "react-native";

const PieChart = ({ chartData }) => {
  return (
    <Text>
      <Text style={{ textAlign: "center" }}>Pie Chart</Text>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </Text>
  );
};

export default React.memo(PieChart);
