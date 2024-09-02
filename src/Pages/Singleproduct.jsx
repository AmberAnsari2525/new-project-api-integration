import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from "../Services/api";
import Swal from 'sweetalert2';

export const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // State for product quantity

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
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));

        console.log('Product added to cart:', product);

        Swal.fire({
            title: 'Added to Cart',
            text: 'Product added to cart successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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
                <div className="mb-3">
                    <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
                    <span className="mx-2">{quantity}</span>
                    <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
                </div>
                <button className="btn btn-primary" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
