import { useEffect, useState } from "react";

const FeaturesAdmin = () => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/features")
            .then(response => response.json())
            .then(data => setFeatures(data))
            .catch(error => console.error("Error fetching features:", error));
    }, []);

    return (
        <div>
            <h1>Administrar Características</h1>
            {features.length === 0 ? (
                <p>No hay características registradas.</p>
            ) : (
                <ul>
                    {features.map(feature => (
                        <li key={feature.id}>{feature.name} - {feature.icon}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeaturesAdmin;