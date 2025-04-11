import { useState } from "react";
import FeatureList from "../components/FeatureList";
import FeatureForm from "../components/FeatureForm";

const FeatureManagement = () => {
  const [editingFeature, setEditingFeature] = useState(null);

  return (
    <div>
      <h1>Feature Management</h1>
      <FeatureForm editingFeature={editingFeature} setEditingFeature={setEditingFeature} />
      <FeatureList onEdit={setEditingFeature} />
    </div>
  );
};

export default FeatureManagement;