import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ServicePage.css";
import Toolbar from "./Toolbar.js";

export const ServicePage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const response = await fetch(
        `http://localhost:9000/api/service/${serviceId}`
      );
      const data = await response.json();
      setService(data);
    };

    fetchServiceDetails();
  }, [serviceId]);

  if (!service) {
    return <div>Loading...</div>;
  }

  const images = [
    service.image_url,
    service.extra_image_1,
    service.extra_image_2,
  ].filter((url) => url);

  const goToPreviousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <Toolbar /> {/* Add the Toolbar component here */}
      <div className="service-page-container">
        <div className="image-slider">
          {images.length > 1 && (
            <button className="prev" onClick={goToPreviousImage}>
              ❮
            </button>
          )}
          <img
            src={images[currentImage]}
            alt={service.title}
            className="main-image"
          />
          {images.length > 1 && (
            <button className="next" onClick={goToNextImage}>
              ❯
            </button>
          )}
        </div>
        <div className="service-content">
          <h1 className="service-title text-background">{service.title}</h1>
          <p className="service-description text-background">
            {service.description}
          </p>
          <p className="service-locality text-background">
            Locality: {service.locality}
          </p>
          <p className="service-locality text-background">
            Service in exchange: {service.item_in_exchange}{" "}
          </p>
        </div>

        {/* Navigation dots */}
        {images.length > 1 && (
          <div className="navigation-dots">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={currentImage === idx ? "dot active" : "dot"}
                onClick={() => setCurrentImage(idx)}
              ></span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
