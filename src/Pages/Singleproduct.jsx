import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleProduct } from "../Services/api"; // Create this function

export  const SingleProduct = () => {
    const { id } = useParams(); // Get product ID from URL parameters
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getSingleProduct(id);
                console.log('Fetched product data:', data); // Log the fetched data
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product.');
            }
        };

        fetchProduct();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Loading product...</p>;
    }

    return (

        <div className="card" style={{width: '400px', }}>
            {product.image && (
                <img src={product.image} alt={product.name} className="card-img-top"
                     style={{ height: '300px',backgroundSize:'cover'}}
                />
            )}
            <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                    Add to Cart
                </Link>
            </div>
        </div>
    );
};


