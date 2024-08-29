import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getingProductList } from '../Services/api';

export const Order = () => {
    const [getlist, setList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getingProductList();
                console.log('Fetched product data:', data);
                setList(data);
            } catch (err) {
                console.error('Error fetching products data:', err);
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized access');
                } else {
                    setError(err.message);
                }
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <div className="justify-content-between d-flex mb-3">
                <h3>Product Order List</h3>
                <Link to="/add-product">
                    <Button variant="primary">Add Order</Button>
                </Link>
            </div>
            {error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <>
                    {getlist.length === 0 ? (
                        <p>No orders available.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Payment Method</th>
                                </tr>
                                </thead>
                                <tbody>
                                {getlist.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.product_id}</td>
                                        <td>{item.user_id}</td>
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
            )}
        </>
    );
};
