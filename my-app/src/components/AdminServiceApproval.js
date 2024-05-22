import React, { useState, useEffect } from "react";
import "../components-css/AdminServiceApproval.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ServiceDetailsModal from "./ServiceDetailsModal";
const AdminServiceApproval = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:9000/api/services");
        const allServices = await response.json();
        const pendingServices = allServices.filter(
          (service) => service.service_status === "Pending"
        );
        setServices(pendingServices);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleApprove = async (serviceId) => {
    updateServiceStatus(serviceId, "Active");
    navigate(0);
  };

  const handleDeny = async (serviceId) => {
    updateServiceStatus(serviceId, "Denied");
    navigate(0);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const updateServiceStatus = async (serviceId, status) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/service/${serviceId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (response.ok) {
        setServices(services.filter((service) => service.id !== serviceId));
      } else {
        throw new Error("Failed to update service status");
      }
    } catch (error) {
      console.error("Failed to update service status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const handleCloseModal = () => {
    setShowDetailsModal(false);
  };
  const handleCheckService = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };
  return (
    <div className="admin-service-approval">
      <button onClick={handleBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <h1>Service Approval</h1>
      {services.length > 0 ? (
        services.map((service) => (
          <div
            key={service.id || service.service_id}
            className="ad-service-card"
          >
            <h2>{service.title}</h2>
            <div className="ad-button-group">
              <button
                className="adButton"
                onClick={() => handleCheckService(service)}
              >
                Check Service
              </button>

              <button
                className="adButton"
                onClick={() => handleApprove(service.id || service.service_id)}
              >
                Approve
              </button>
              <button
                className="adButton"
                onClick={() => handleDeny(service.id || service.service_id)}
              >
                Deny
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No pending services to display.</p>
      )}
      <ServiceDetailsModal
        service={selectedService}
        isOpen={showDetailsModal}
        closeModal={handleCloseModal}
      />
    </div>
  );
};

export default AdminServiceApproval;
