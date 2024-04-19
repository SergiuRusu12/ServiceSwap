import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ProfilePage.css";
import Toolbar from "./Toolbar.js";
const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchUserDataAndServices = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `http://localhost:9000/api/user/${userId}`
        );
        if (!userResponse.ok) {
          throw new Error("Network response was not ok for user data");
        }
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch services for the user
        const servicesResponse = await fetch(
          `http://localhost:9000/api/services/user/${userId}`
        );
        if (!servicesResponse.ok) {
          throw new Error("Network response was not ok for services");
        }
        const userServices = await servicesResponse.json();
        setServices(userServices);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserDataAndServices();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Toolbar />
      <div className="profile-page-container-pfp">
        <div className="profile-header-pfp">
          <h1>{user.username} Profile</h1>
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
            <h2>User's Services</h2>
            <div className="services-list-pfp">
              {services.map((service) => (
                <div className="service-card-pfp" key={service.id}>
                  {service.image_url && ( // Check if there is an image URL
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="service-image-pfp"
                    />
                  )}
                  <div className="service-info-pfp">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="service-actions-pfp">
                    <button className="edit-btn-pfp">Edit</button>
                    <button className="delete-btn-pfp">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
