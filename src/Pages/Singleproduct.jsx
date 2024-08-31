import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from "../Services/api";
import Swal from 'sweetalert2';

export const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getSingleProduct(id);
                console.log('Fetched product data:', data);
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product.');
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        // Get existing cart items from session storage or initialize an empty array
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // If the product already exists, increase the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart with quantity 1
            cart.push({ ...product, quantity: 1 });
        }

        // Save the updated cart back to session storage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Show success message in console
        console.log('Product added to cart:', product);

        // Show SweetAlert2 success alert
        Swal.fire({
            title: 'Added to Cart',
            text: 'Product added to cart successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Loading product...</p>;
    }

    return (
        <div className="card" style={{ width: '400px' }}>
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: '300px', backgroundSize: 'cover' }}
                />
            )}
            <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <button className="btn btn-primary" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
