const API_URL = "http://localhost:8080/api/features";

export const getFeatures = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getFeatureById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createFeature = async (feature) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feature),
  });
  return response.json();
};

export const updateFeature = async (id, feature) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feature),
  });
  return response.json();
};

export const deleteFeature = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};