import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const StatsScript = ({ isoDates, confirmedGameStatsData, cancelledGameStatsData }) => {
  console.log(confirmedGameStatsData + "aa");
  console.log(cancelledGameStatsData + "bb");

  const chartRef = useRef(null);

  useEffect(() => {
    if (!confirmedGameStatsData || !cancelledGameStatsData) {
      return;
    }

    const reversedIsoDates = [...isoDates].reverse();
    const reversedConfirmedGames = [...confirmedGameStatsData].reverse();
    const reversedCancelledGames = [...cancelledGameStatsData].reverse();

    const ctx = document.getElementById("barChart");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: reversedIsoDates,
        datasets: [
          {
            label: "매치된 경기 수",
            data: reversedConfirmedGames,
            borderColor: "rgba(0, 194, 0, 0.9)",
            borderWidth: "0",
            backgroundColor: "rgba(0, 0, 150, 0.5)",
          },
          {
            label: "취소된 경기 수",
            data: reversedCancelledGames,
            borderColor: "rgba(0,194,0,0.09)",
            borderWidth: "0",
            backgroundColor: "rgba(200,0,0,0.5)"
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // Save the chart instance in the ref
    chartRef.current = myChart;
  }, [confirmedGameStatsData, cancelledGameStatsData]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas id="barChart"></canvas>
    </div>
  );
};

export default StatsScript