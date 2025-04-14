import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product, userId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/favorites/${userId}`)
            .then(response => response.json())
            .then(favorites => {
                setIsFavorite(favorites.some(fav => fav.id === product.id));
            });
    }, [userId, product.id]);

    const toggleFavorite = async () => {
        await fetch(`http://localhost:8080/api/favorites/${userId}/${product.id}`, {
            method: "POST",
        });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <button onClick={toggleFavorite} className="favorite-btn">
                {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>
        </div>
    );
};

export default ProductCard;