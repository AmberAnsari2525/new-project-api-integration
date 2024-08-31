import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getingProductList } from '../Services/api';

export const Order = () => {
    const navigate = useNavigate();
    const [getlist, setList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getingProductList();
                setList(data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError("Unauthorized access. Please log in.");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false); // Set loading to false after data fetch is complete
            }
        };

        fetchOrders();
    }, []);

    const handleClick = (id) => {
        navigate(`/order-detail/${id}`);
    };

    return (
        <>
            <div className="justify-content-between d-flex mb-3">
                <h3>Product Order List</h3>
                <Link to="/add-product">
                    <Button variant="primary">Add Order</Button>
                </Link>
            </div>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : getlist.length === 0 ? (
                <p>No orders available.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order ID</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Address</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Payment Method</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getlist.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td onClick={() => handleClick(item.id)} style={{ cursor: 'pointer' }}>
                                    {item.id}
                                </td>
                                <td>{item.user_id}</td>
                                <td>{item.address}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total_price}</td>
                                <td>{item.payment_method}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};
