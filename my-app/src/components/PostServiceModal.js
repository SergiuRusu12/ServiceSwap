// PostServiceModal.js
import React, { useState, useEffect } from "react";
import "../components-css/PostServiceModal.css";

const PostServiceModal = ({ isOpen, setModalOpen }) => {
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
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Fetch error: ", error.message);
      }
    };

    if (isOpen) {
      fetchCategories();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle the form submission to your API
  };

  if (!isOpen) return null; // Don't render if not open

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
            {/* Show preview of selected images */}
            <div className="image-preview">
              {Array.from(selectedImages).map((image, index) => (
                <div key={index} className="preview-wrapper">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />
                  {/* Optionally, add a remove button */}
                </div>
              ))}
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
