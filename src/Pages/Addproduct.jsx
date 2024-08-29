import React, { useState } from 'react';
import { addProductList } from '../Services/api';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export const AddProduct = () => {
    const [order, setOrder] = useState({
        product_id: '',
        quantity: '',
        payment_method: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Order data being sent:', order); // Debugging line

        if (!order.productId) {
            setError('Product ID is required.');
            return;
        }

        try {
            const response = await addProductList(order);
            console.log('API response:', response);
            if (response.status === 200) {
                console.log('Product added successfully:', response.data);
                navigate('/order');
            } else {
                const errorMessage = response.data?.message || 'Failed to add product';
                setError(errorMessage);
                console.error('Error: Unable to add product', errorMessage);
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Error adding product';
            setError(errorMessage);
            console.error('Error:', errorMessage, err);
        }
    };



    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Add Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="product_id" className="form-label">Product ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="product_id"
                                name="product_id"
                                value={order.product_id}
                                onChange={handleChange}
                                placeholder="Enter Product ID"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                value={order.quantity}
                                onChange={handleChange}
                                placeholder="Enter Quantity"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="payment_method" className="form-label">Payment Method</label>
                            <input
                                type="text"
                                className="form-control"
                                id="payment_method"
                                name="payment_method"
                                value={order.payment_method}
                                onChange={handleChange}
                                placeholder="Enter Payment Method"
                                required
                            />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="btn btn-primary">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
