import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetail } from "../Services/api";
import Spinner from 'react-bootstrap/Spinner';

export const OrderDetail = () => {
    const { id } = useParams(); // Get order ID from URL parameters
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true); // Set loading to true when fetching starts
            try {
                console.log(`Fetching order with ID: ${id}`); // Log ID being fetched
                const data = await getOrderDetail(id);
                console.log('Order data:', data); // Log the fetched data
                setOrder(data);
            } catch (err) {
                console.error('Error fetching order:', err.response ? err.response.data : err.message);
                setError('Failed to load order.');
            } finally {
                setLoading(false); // Set loading to false after fetching is complete
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" />
                <p>Loading order details...</p>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>No order found.</p>;
    }

    return (
        <div className="card" style={{ width: '400px' }}>
            <img
                src={order.product.image}
                alt={order.product.name}
                style={{ maxWidth: '150px' }}
                className="card-img-top"
            />
            <div className="card-body">
                <h4 className="card-title">Order ID: {order.id}</h4>
                <h4 className="card-title">{order.product.name}</h4>
                <p className="card-text">Price: ${order.product.price}</p>
                <p className="card-text">Description: {order.product.description}</p>
                <p className="card-text">Stock: {order.product.stock}</p>
            </div>
        </div>
    );
};
