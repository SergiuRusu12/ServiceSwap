import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ServicePage.css";
import Toolbar from "./Toolbar.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export const ServicePage = () => {
  const { serviceId, initiatorIds } = useParams();
  const [service, setService] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [rating, setRating] = useState(null);
  const [ratingLoading, setRatingLoading] = useState(true);

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchOrdersAndCalculateRating = async () => {
      try {
        // Fetch orders for the user
        const ordersResponse = await fetch(
          `http://localhost:9000/api/orders/user/${initiatorIds}`
        );
        const ordersData = await ordersResponse.json();
        const relatedOrders = ordersData.buyerOrders
          .concat(ordersData.sellerOrders)
          .filter(
            (order) => order.service_fk_service_id.toString() === serviceId
          );

        // Fetch all reviews and calculate rating based on related orders
        const reviewsResponse = await fetch(
          `http://localhost:9000/api/reviews`
        );
        const reviewsData = await reviewsResponse.json();
        const relatedReviews = reviewsData.filter((review) =>
          relatedOrders.some(
            (order) => order.order_id === review.order_fk_order_id
          )
        );

        if (relatedReviews.length > 0) {
          const totalRating = relatedReviews.reduce(
            (acc, curr) => acc + curr.rating,
            0
          );
          setRating(totalRating / relatedReviews.length);
        } else {
          setRating("0");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setRatingLoading(false);
      }
    };

    fetchOrdersAndCalculateRating();
  }, [serviceId, initiatorIds]); // Add dependencies if needed

  const handleSendMessage = () => {
    const initiatorId = initiatorIds; // Assuming the user's ID is stored in localStorage
    const receiverId = service.seller_fk_user_id; // Assuming the service object has this field

    fetch("http://localhost:9000/api/chats/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initiator_id: initiatorId,
        receiver_id: receiverId,
        service_id: serviceId,
      }),
    })
      .then((res) => res.json())
      .then((chat) => {
        ///chat/:userId/:chatId/:serviceId
        navigate(`/chat/${initiatorIds}/${chat.chat_id}/${serviceId}`);
      })
      .catch((err) => console.error("Failed to initiate or find chat", err));
  };

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
      <Toolbar />
      <div className="service-page-container">
        <div className="image-container">
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
        <div className="service-details">
          <h1 className="service-title">{service.title}</h1>
          <p className="service-description">{service.description}</p>
          <p className="service-locality">Locality: {service.locality}</p>
          <p className="service-exchange">
            Service in exchange: {service.item_in_exchange}
          </p>
          <p className="service-rating">
            {ratingLoading ? "Loading rating..." : `Rating: ${rating}`} / 5{" "}
            <FontAwesomeIcon icon={faStar} />
          </p>
          <div className="message-button-container">
            <button className="message-button" onClick={handleSendMessage}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
