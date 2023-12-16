import React, { useEffect } from 'react';
import Chart from 'chart.js';

const StatsScript = ({ confirmedGameStatsData, cancelledGameStatsData }) => {
  useEffect(() => {
    if (!confirmedGameStatsData || !cancelledGameStatsData) {
      return;
    }

    const sortedDates = confirmedGameStatsData.map((_, index) => index + 1);

    const ctx = document.getElementById("barChart");

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedDates,
        datasets: [
          {
            label: "매치된 경기 수",
            data: confirmedGameStatsData,
            borderColor: "rgba(0, 194, 146, 0.9)",
            borderWidth: "0",
            backgroundColor: "rgba(0, 194, 146, 0.5)"
          },
          {
            label: "취소된 경기 수",
            data: cancelledGameStatsData,
            borderColor: "rgba(0,0,0,0.09)",
            borderWidth: "0",
            backgroundColor: "rgba(0,0,0,0.07)"
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
  }, [confirmedGameStatsData, cancelledGameStatsData]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas id="barChart"></canvas>
    </div>
  );
};

export default StatsScript;