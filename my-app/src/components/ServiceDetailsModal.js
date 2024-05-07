import React, { useState } from "react";
import "../components-css/ServiceDetailsModal.css";

const ServiceDetailsModal = ({ service, isOpen, closeModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!service || !isOpen) {
    return null;
  }

  const images = [
    service.image_url,
    service.extra_image_1,
    service.extra_image_2,
  ].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="modal-backdrop-ad">
      <div className="modal-content-ad">
        <button onClick={closeModal} className="close-button-ad">
          X
        </button>
        <h1>{service.title}</h1>
        <div className="image-container-ad">
          {images.length > 1 && (
            <button onClick={previousImage} className="prev-button-ad">
              ❮
            </button>
          )}
          <img
            src={images[currentImageIndex]}
            alt="Service"
            className="modal-image-ad"
          />
          {images.length > 1 && (
            <button onClick={nextImage} className="next-button-ad">
              ❯
            </button>
          )}
        </div>
        <p>{service.description}</p>
        <p>Locality: {service.locality}</p>
        <p>Service in exchange: {service.item_in_exchange}</p>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;
