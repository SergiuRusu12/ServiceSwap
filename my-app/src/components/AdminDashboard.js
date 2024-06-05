import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Pie, Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../components-css/AdminDashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  ChartDataLabels // Register the plugin
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({ open: 0, closed: 0 });
  const [serviceData, setServiceData] = useState({
    active: 0,
    pending: 0,
    denied: 0,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch("http://localhost:9000/api/tickets");
      const data = await response.json();
      const statusCounts = data.reduce((acc, ticket) => {
        acc[ticket.ticket_status.toLowerCase()] =
          (acc[ticket.ticket_status.toLowerCase()] || 0) + 1;
        return acc;
      }, {});
      setTicketData(statusCounts);
    };

    const fetchServices = async () => {
      const response = await fetch("http://localhost:9000/api/services");
      const data = await response.json();
      const statusCounts = data.reduce((acc, service) => {
        acc[service.service_status.toLowerCase()] =
          (acc[service.service_status.toLowerCase()] || 0) + 1;
        return acc;
      }, {});
      setServiceData(statusCounts);
    };

    fetchTickets();
    fetchServices();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const chartOptionsTicket = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Ticket Status Distribution",
        font: {
          size: 16,
          color: "#fff",
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce(
            (acc, curr) => acc + curr,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
    maintainAspectRatio: false,
  };

  const chartOptionsService = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Service Status Overview",
        font: {
          size: 16,
          color: "#fff",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(57, 255, 20, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(57, 255, 20, 0.2)",
        },
      },
    },
    maintainAspectRatio: false,
  };

  const ticketChartData = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        data: [ticketData.open, ticketData.closed],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderColor: ["#FF6384", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  const serviceChartData = {
    labels: ["Active", "Pending", "Denied"],
    datasets: [
      {
        data: [serviceData.active, serviceData.pending, serviceData.denied],
        backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
        borderColor: ["#FFCE56", "#FF6384", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
      <div className="admin-sections">
        <div className="admin-section">
          <h2>Tickets Management</h2>
          <p>Review and manage user submitted tickets.</p>
          <button
            className="buttonADD"
            onClick={() => handleNavigate("/adminTicketManagement")}
          >
            Manage Tickets
          </button>
          <div style={{ width: "600px", height: "575px", margin: "0 auto" }}>
            <Pie data={ticketChartData} options={chartOptionsTicket} />
          </div>
        </div>
        <div className="admin-section">
          <h2>Services Approval</h2>
          <p>Approve or reject new service submissions.</p>
          <button
            className="buttonADD"
            onClick={() => handleNavigate("/adminServiceApproval")}
          >
            Approve Services
          </button>
          <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
            <Bar data={serviceChartData} options={chartOptionsService} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
