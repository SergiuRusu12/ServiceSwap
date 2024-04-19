// PostServiceModal.js
import React, { useState, useEffect } from "react";
import "../components-css/PostServiceModal.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const PostServiceModal = (props) => {
  // Accept props here
  const { isOpen, setModalOpen, refreshServices, context, serviceToEdit } =
    props;

  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    itemInExchange: "",
    category: "",
    locality: "",
    serviceStatus: "Active", // default value
  });
  const removeSelectedImage = (indexToRemove) => {
    setSelectedImages(
      selectedImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleImageChange = (event) => {
    // Get the selected files from the input
    const files = event.target.files;

    // Limit to 3 images
    if (files.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    // Update the state with the selected files
    setSelectedImages([...files]);
  };

  // Fetch categories independently
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await fetch("http://localhost:9000/api/categories");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error("Fetch error:", error.message);
        }
      };

      fetchCategories();
    }
  }, [isOpen]);

  // Set form data for editing independently
  useEffect(() => {
    if (isOpen && serviceToEdit && categories.length) {
      const category =
        categories.find((c) => c.category_id === serviceToEdit.category_fk)
          ?.category_name || "";
      setFormData({
        title: serviceToEdit.title,
        description: serviceToEdit.description,
        itemInExchange: serviceToEdit.item_in_exchange || "",
        category,
        locality: serviceToEdit.locality || "",
        serviceStatus: serviceToEdit.service_status || "Active",
      });

      setSelectedImages(
        [
          serviceToEdit.image_url,
          serviceToEdit.extra_image_1,
          serviceToEdit.extra_image_2,
        ].filter(Boolean)
      );
    }
  }, [isOpen, serviceToEdit, categories]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        description: "",
        itemInExchange: "",
        category: "",
        locality: "",
        serviceStatus: "Active",
      });
      setSelectedImages([]);
    }
  }, [isOpen]);

  // Localities array
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
  const uploadImages = async () => {
    const newImages = selectedImages.filter((img) => img instanceof File);
    const uploadPromises = newImages.map((image) => {
      const imageRef = ref(storage, `images/${image.name}`);
      return uploadBytes(imageRef, image).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verify that at least one image is selected or already exists
    if (selectedImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      // Gather URLs from already uploaded images and upload new images if necessary
      const existingImageUrls = selectedImages.filter(
        (img) => typeof img === "string"
      );
      const newImageUrls = await uploadImages(); // This function uploads only new images
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      // Prepare the service data with the image URLs
      const serviceData = {
        ...formData,
        price: null, // Replace with actual logic if managing price
        item_in_exchange: formData.itemInExchange,
        seller_fk_user_id: parseInt(atob(localStorage.getItem("hashedUserID"))),
        service_status: "Active",
        category_fk: categories.find(
          (cat) => cat.category_name === formData.category
        )?.category_id,
        locality: formData.locality,
        image_url: allImageUrls[0] || null,
        extra_image_1: allImageUrls[1] || null,
        extra_image_2: allImageUrls[2] || null,
      };

      const endpoint = serviceToEdit
        ? `http://localhost:9000/api/service/${serviceToEdit.service_id}`
        : "http://localhost:9000/api/service";
      const method = serviceToEdit ? "PUT" : "POST";

      // Make the request to the server
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Clear the form and close the modal upon success
      setFormData({
        title: "",
        description: "",
        itemInExchange: "",
        category: "",
        locality: "",
        serviceStatus: "Active",
      });
      setSelectedImages([]);
      setModalOpen(false);

      // Refresh the list of services
      if (context === "ProfilePage") {
        props.refreshPage();
      } else {
        refreshServices && refreshServices();
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post the service. Please try again.");
    }
  };

  // ...

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Post New Service</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Service Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Service in Exchange"
            value={formData.itemInExchange}
            onChange={(e) =>
              setFormData({ ...formData, itemInExchange: e.target.value })
            }
          />
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
          <select
            value={formData.locality}
            onChange={(e) =>
              setFormData({ ...formData, locality: e.target.value })
            }
            required
          >
            <option value="">Select Locality</option>
            {localities.map((locality, index) => (
              <option key={index} value={locality}>
                {locality}
              </option>
            ))}
          </select>
          <div className="image-upload-container">
            <label htmlFor="image-upload">Upload Images (max 3):</label>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="image-preview">
              {selectedImages.map((image, index) => {
                // Check if 'image' is a File object; if it's a string, it's assumed to be a URL
                const isFileObject = image instanceof File;
                const imageUrl = isFileObject
                  ? URL.createObjectURL(image)
                  : image;
                return (
                  <div key={index} className="preview-wrapper">
                    <img src={imageUrl} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeSelectedImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <button type="submit">Post Service</button>
          <button type="button" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostServiceModal;
