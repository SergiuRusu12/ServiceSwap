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

export {
  getServices,
  getServiceById,
  createService,
  deleteServiceById,
  updateServiceById,
};
