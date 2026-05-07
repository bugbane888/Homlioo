import API from "../api/axios";

// When you start Node.js, you just uncomment the API lines
export const propertyService = {
  // Get all PGs
  getAll: async () => {
    // const response = await API.get('/properties');
    // return response.data;

    // CURRENT MOCK LOGIC:
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(require("../constants/data").LISTINGS_DATA),
        1000,
      );
    });
  },

  // Add a PG
  create: async (data) => {
    // return await API.post('/properties', data);
    console.log("Service: Sending to Node.js...", data);
    return data;
  },

  // Delete a PG
  remove: async (id) => {
    // return await API.delete(`/properties/${id}`);
    console.log("Service: Removing ID from Node.js...", id);
    return id;
  },
};
