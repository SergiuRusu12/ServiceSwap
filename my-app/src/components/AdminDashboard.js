import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Pie, Bar } from "react-chartjs-2"; // Assuming you're using Chart.js v2
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
import "../components-css/AdminDashboard.css";

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
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
      },
      title: {
        display: true,
        text: "Ticket Status Distribution", // Replace with your desired title
        font: {
          size: 16,
        },
      },
    },
  };
  const chartOptionsService = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Set true if you want to display legend
      },
      title: {
        display: true,
        text: "Service Status Overview",
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
      },
    },
  };
  const ticketChartData = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        data: [ticketData.open, ticketData.closed],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
    options: {
      ...chartOptionsTicket,
      title: {
        ...chartOptionsTicket.title,
        text: "Ticket Status Distribution", // Specific title for this chart
      },
    },
  };

  const serviceChartData = {
    labels: ["Active", "Pending", "Denied"],
    datasets: [
      {
        data: [serviceData.active, serviceData.pending, serviceData.denied],
        backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
      },
    ],
    options: {
      ...chartOptionsService,
      title: {
        ...chartOptionsService.title,
        text: "Service Status Overview", // Specific title for this chart
      },
    },
  };
  console.log(serviceData.active, serviceData.pending, serviceData.denied);
  return (
    <div className="admin-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
      <h1>Admin Dashboard</h1>
      <div className="admin-sections">
        <div className="admin-section">
          <h2>Tickets Management</h2>
          <p>Review and manage user submitted tickets.</p>
          <button onClick={() => handleNavigate("/adminTicketManagement")}>
            Manage Tickets
          </button>
          <Pie data={ticketChartData} options={ticketChartData.options} />
        </div>
        <div className="admin-section">
          <h2>Services Approval</h2>
          <p>Approve or reject new service submissions.</p>
          <button onClick={() => handleNavigate("/adminServiceApproval")}>
            Approve Services
          </button>
          <Bar data={serviceChartData} options={serviceChartData.options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
