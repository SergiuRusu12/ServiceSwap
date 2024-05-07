import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ProfilePage.css";
import Toolbar from "./Toolbar.js";
import PostServiceModal from "./PostServiceModal.js";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [activeServices, setActiveServices] = useState([]);
  const [pendingServices, setPendingServices] = useState([]);
  const [deniedServices, setDeniedServices] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  // Handler for the edit button
  const openEditModal = (service) => {
    setServiceToEdit(service);
    setEditModalOpen(true);
  };
  const refreshUserServices = useCallback(async () => {
    // Fetching user services logic here
    // This is similar to what you have in fetchUserDataAndServices
    try {
      const servicesResponse = await fetch(
        `http://localhost:9000/api/services/user/${userId}`
      );
      const userServices = await servicesResponse.json();
      setServices(userServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, [userId]);

  // Wrap the fetching logic with useCallback
  const fetchUserDataAndServices = useCallback(async () => {
    try {
      const userResponse = await fetch(
        `http://localhost:9000/api/user/${userId}`
      );
      const userData = await userResponse.json();
      setUser(userData);

      const servicesResponse = await fetch(
        `http://localhost:9000/api/services/user/${userId}`
      );
      const userServices = await servicesResponse.json();
      setServices(userServices);
      setActiveServices(
        userServices.filter((service) => service.service_status === "Active")
      );
      setPendingServices(
        userServices.filter((service) => service.service_status === "Pending")
      );
      setDeniedServices(
        userServices.filter((service) => service.service_status === "Denied")
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }, [userId]); // Dependencies for useCallback

  useEffect(() => {
    fetchUserDataAndServices();
  }, [fetchUserDataAndServices]); // Including the dependency here

  const deleteService = async (serviceId) => {
    console.log("Attempting to delete service with ID:", serviceId); // Log the service ID
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(
          `http://localhost:9000/api/service/${serviceId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete the service.");
        }
        console.log(`Service with ID: ${serviceId} deleted successfully.`); // Confirm deletion
        // Refresh the services by filtering out the deleted one
        setServices(
          services.filter((service) => service.service_id !== serviceId)
        );
        navigate(0);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleServiceUpdate = (updatedService) => {
    setServices(
      services.map((service) => {
        if (service.service_id === updatedService.service_id) {
          return updatedService; // Return the updated service data
        }
        return service; // Return unmodified service data
      })
    );
  };

  if (!user) return <div>Loading...</div>;
  const refreshPage = () => {
    // Navigate to the current user's profile page to cause a remount
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <Toolbar refreshServices={refreshUserServices} context="ProfilePage" />
      <div className="profile-page-container-pfp">
        <div className="profile-header-pfp">
          <h1>{user.username}'s Profile</h1>
        </div>
        <div className="profile-body-pfp">
          <div className="user-info-pfp">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="user-services-pfp">
            <h2>My Services</h2>
            <div className="services-list-pfp">
              {[
                { title: "Active Services", data: activeServices },
                { title: "Pending Services", data: pendingServices },
                { title: "Denied Services", data: deniedServices },
              ].map((section) => (
                <div key={section.title}>
                  <h2>{section.title}</h2>
                  {section.data.map((service) => (
                    <div key={service.service_id} className="service-card-pfp">
                      {service.image_url && (
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="service-image-pfp"
                        />
                      )}
                      <div className="service-info-pfp">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <div className="service-actions-pfp">
                          <button
                            className="delete-btn-pfp"
                            onClick={() => deleteService(service.service_id)}
                          >
                            Delete
                          </button>
                          {section.title === "Active Services" && (
                            <button
                              className="edit-btn-pfp"
                              onClick={() => openEditModal(service)}
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing a service */}
      {editModalOpen && (
        <PostServiceModal
          isOpen={editModalOpen}
          setModalOpen={setEditModalOpen}
          refreshServices={refreshUserServices}
          onServiceUpdate={handleServiceUpdate}
          context="ProfilePage"
          serviceToEdit={serviceToEdit}
          refreshPage={refreshPage}
        />
      )}
    </>
  );
};
export default ProfilePage;
