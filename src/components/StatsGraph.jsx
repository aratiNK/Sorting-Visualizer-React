import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StatsGraph({ comparisons, swaps, algo }) {
  const data = {
    labels: ["Comparisons", "Swaps"],
    datasets: [
      {
        label: algo + " Performance",
        data: [comparisons, swaps],
        backgroundColor: ["#4f46e5", "#22c55e"],
        borderRadius: 8,
      },
    ],
  };
  
  const options = {
  responsive: true,
  maintainAspectRatio: false, // 🔥 important
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { font: { size: 12 } },
    },
    x: {
      ticks: { font: { size: 12 } },
    },
  },
};

  return (
  <div style={{ height: "220px" }}>
    <Bar data={data} options={options} />
  </div>
);

}

export default StatsGraph;
