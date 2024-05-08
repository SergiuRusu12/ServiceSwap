// ServicesDA.js

import Services from "../Entities/Services.js";

// Function to get all services
async function getServices() {
  return await Services.findAll();
}

// Function to get a service by ID
async function getServiceById(service_id) {
  return await Services.findByPk(service_id);
}

// Function to create a new service
async function createService(service) {
  return await Services.create(service);
}

// Function to delete a service by ID
async function deleteServiceById(service_id) {
  return await Services.destroy({ where: { service_id } });
}

// Function to update a service by ID
async function updateServiceById(service_id, serviceDetails) {
  return await Services.update(serviceDetails, { where: { service_id } });
}

async function getServicesByCategoryId(categoryId) {
  return await Services.findAll({
    where: {
      category_fk: categoryId,
      service_status: "Active", // Assuming you want only active services
    },
  });
}
async function updateServiceImageById(service_id, imageUrl) {
  return await Services.update(
    { image_url: imageUrl },
    { where: { service_id } }
  );
}
// Function to update the first extra image of a service by ID
async function updateServiceExtraImage1ById(service_id, extraImage1Url) {
  return await Services.update(
    { extra_image_1: extraImage1Url },
    { where: { service_id } }
  );
}

// Function to update the second extra image of a service by ID
async function updateServiceExtraImage2ById(service_id, extraImage2Url) {
  return await Services.update(
    { extra_image_2: extraImage2Url },
    { where: { service_id } }
  );
}

// Function to update all image fields of a service by ID
async function updateAllServiceImagesById(service_id, imageUrls) {
  return await Services.update(
    {
      image_url: imageUrls.image_url,
      extra_image_1: imageUrls.extra_image_1,
      extra_image_2: imageUrls.extra_image_2,
    },
    { where: { service_id } }
  );
}
async function getServicesByUserId(seller_fk_user_id) {
  return await Services.findAll({
    where: {
      seller_fk_user_id,
    },
  });
}
async function updateServiceStatusById(serviceId, status) {
  try {
    const service = await Services.findByPk(serviceId);
    if (!service) {
      return false; // No service found with the given ID
    }
    await service.update({ service_status: status });
    return true; // Successfully updated
  } catch (error) {
    console.error("Error updating service status:", error);
    return false;
  }
}

export {
  getServices,
  getServiceById,
  createService,
  deleteServiceById,
  updateServiceById,
  getServicesByCategoryId,
  updateServiceImageById,
  updateAllServiceImagesById,
  updateServiceExtraImage1ById,
  updateServiceExtraImage2ById,
  getServicesByUserId,
  updateServiceStatusById,
};
