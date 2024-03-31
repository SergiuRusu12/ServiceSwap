import React, { useEffect, useState } from "react";
import "../components-css/MainPage.css";
// import { storage } from "../firebase"; // Make sure the path is correct
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  useEffect(() => {
    // Function to fetch categories from your API
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

  useEffect(() => {
    // Function to fetch services from your API
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

  const filteredServices = selectedLocality
    ? services.filter(
        (service) =>
          service.locality === selectedLocality &&
          service.service_status === "Active"
      )
    : services.filter((service) => service.service_status === "Active");

  return (
    <div className="container">
      <h1>Service Swap</h1>
      <div className="filters">
        {/* Filters for locality and category */}
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
            </div>
          ))
        ) : (
          <p>No services match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
