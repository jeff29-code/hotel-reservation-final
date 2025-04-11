import { createContext, useState, useEffect } from "react";
import { getFeatures } from "../services/FeatureService";

export const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    const data = await getFeatures();
    setFeatures(data);
  };

  return (
    <FeatureContext.Provider value={{ features, setFeatures, loadFeatures }}>
      {children}
    </FeatureContext.Provider>
  );
};