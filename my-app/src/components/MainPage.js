import React, { useEffect, useState } from "react";
import "../components-css/MainPage.css";
import { useNavigate } from "react-router-dom";
// import { storage } from "../firebase"; // Make sure the path is correct
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Toolbar from "./Toolbar";
import { useParams } from "react-router-dom";

const localities = [
  "Alba Iulia",
  "Alexandria",
  "Arad",
  "Bacau",
  "Baia Mare",
  "Bistrita",
  "Botosani",
  "Braila",
  "Brasov",
  "Bucuresti",
  "Buzau",
  "Calarasi",
  "Cluj-Napoca",
  "Constanta",
  "Craiova",
  "Deva",
  "Drobeta-Turnu Severin",
  "Focsani",
  "Galati",
  "Giurgiu",
  "Iasi",
  "Miercurea Ciuc",
  "Oradea",
  "Piatra Neamt",
  "Pitesti",
  "Ploiesti",
  "Radauti",
  "Ramnicu Valcea",
  "Resita",
  "Roman",
  "Satu Mare",
  "Sfantu Gheorghe",
  "Sibiu",
  "Slatina",
  "Slobozia",
  "Suceava",
  "Targoviste",
  "Targu Jiu",
  "Targu Mures",
  "Timisoara",
  "Tulcea",
  "Vaslui",
  "Zalau",
  "Other",
];

const MainPage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { hashedUserID } = useParams();
  const navigate = useNavigate();

  const userId = atob(hashedUserID);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const refreshServices = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/services");
      const data = await response.json();
      setServices(data);
      console.log("Services refreshed", data); // Check if the services are updated
    } catch (error) {
      console.error("Failed to refresh services:", error);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const url = selectedCategory
        ? `http://localhost:9000/api/services/category/${selectedCategory}`
        : "http://localhost:9000/api/services";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  const filteredServices = services
    .filter((service) => service.service_status === "Active")
    .filter(
      (service) =>
        service.locality === selectedLocality || selectedLocality === ""
    )
    .filter((service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Toolbar refreshServices={refreshServices} context="MainPage" />
      <div className="containerMain">
        <h1>Service Swap</h1>
        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="dropdown-group">
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
            >
              <option value="">All Localities</option>
              {localities.map((locality) => (
                <option key={locality} value={locality}>
                  {locality}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option
                  key={category.category_id}
                  value={category.category_id.toString()}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Services list and other elements */}

        <div className="services-list">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div className="service-card" key={service.service_id}>
                {service.image_url && (
                  <div className="service-image">
                    <img src={service.image_url} alt={service.title} />
                  </div>
                )}
                <div className="service-info">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
                <button
                  className="details-button"
                  onClick={() =>
                    navigate(`/service/${service.service_id}/${userId}`)
                  }
                >
                  See details...
                </button>
              </div>
            ))
          ) : (
            <p>No services match your criteria.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
