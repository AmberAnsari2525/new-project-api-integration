import React, { useState, useEffect } from 'react';
import { confirmOrder, fetchUserData } from '../Services/api';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const Checkout = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        country: '',
        city: '',
        street: '',
        zipcode: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [creditCardInfo, setCreditCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData();
                if (data && data.user) {
                    setUserData(data.user);
                } else {
                    setError("Failed to load user data.");
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };

        getUserData();
    }, []);

    useEffect(() => {
        const storedSelectedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || [];
        setCart(storedSelectedItems);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevProfile => ({
            ...prevProfile,
            [id]: value
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCreditCardChange = (e) => {
        const { id, value } = e.target;
        setCreditCardInfo(prevInfo => ({
            ...prevInfo,
            [id]: value
        }));
    };

    const formatPrice = (price) => {
        const numericPrice = Number(price);
        return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0).toFixed(2);
    };

    const handleQuantityChange = (id, change) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const handleRemoveProduct = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const validateForm = () => {
        const { name, email, country, city, street, zipcode } = userData;
        return name && email && country && city && street && zipcode && paymentMethod;
    };

    const handleOrder = async () => {
        if (!validateForm()) {
            Swal.fire({
                icon: 'warning',
                title: 'Form Incomplete',
                text: 'Please fill out all required fields and select a payment method before confirming the order.',
                confirmButtonText: 'OK'
            });
            return;
        }

        setShowOrderDetails(true);

        try {
            const confirmResult = await Swal.fire({
                icon: 'warning',
                title: 'Confirm Order',
                text: 'Are you sure you want to confirm the order?',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (confirmResult.isConfirmed) {
                console.log("Order Details:", { userData, cart, paymentMethod, creditCardInfo });

                await confirmOrder({ cart, paymentMethod, creditCardInfo });
                setSuccessMessage('Order placed successfully!');
                setCart([]);

                Swal.fire({
                    icon: 'success',
                    title: 'Order Confirmed',
                    text: 'Your order has been placed successfully!',
                    confirmButtonText: 'OK'
                });

                setShowOrderDetails(false);
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Order Cancelled',
                    text: 'Your order has been cancelled.',
                    confirmButtonText: 'OK'
                });

                setShowOrderDetails(false);
            }
        } catch (error) {
            setError('Failed to place order.');

            Swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: 'There was an issue with your order. Please try again.',
                confirmButtonText: 'OK'
            });

            setShowOrderDetails(false);
        }
    };

    return (
        <div className="container-fluid py-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <h3>Update Information</h3>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={userData.name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="country">Country <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            value={userData.country}
                            onChange={handleChange}
                            placeholder="Enter Country"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="city">City <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={userData.city}
                            onChange={handleChange}
                            placeholder="Enter City"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="street">Street <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="street"
                            value={userData.street}
                            onChange={handleChange}
                            placeholder="Enter Street"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="zipcode">Zipcode <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="zipcode"
                            value={userData.zipcode}
                            onChange={handleChange}
                            placeholder="Enter Zipcode"
                        />
                    </div>
                </div>

                <div className="col-md-8">
                    <h3>Order Summary</h3>
                    {cart.length === 0 ? (
                        <p>No items selected for checkout.</p>
                    ) : (
                        <>
                            <table className="table table-striped mb-4">
                                <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: '100px',
                                                    height: 'auto',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{formatPrice(item.price)}</td>
                                        <td>{formatPrice(item.price * (item.quantity || 1))}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-secondary btn-sm me-2"
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            {item.quantity}
                                            <button
                                                className="btn btn-outline-secondary btn-sm ms-2"
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleRemoveProduct(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <h5>Total Price: ${calculateTotal()}</h5>

                            <div className="mb-4">
                                <h4>Payment Method <span className="text-danger">*</span></h4>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="creditCard"
                                        value="Credit Card"
                                        checked={paymentMethod === 'Credit Card'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="creditCard">Credit Card</label>
                                </div>
                                {paymentMethod === 'Credit Card' && (
                                    <div className="mt-3">
                                        <div className="form-group mb-3">
                                            <label htmlFor="cardNumber">Card Number <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cardNumber"
                                                value={creditCardInfo.cardNumber}
                                                onChange={handleCreditCardChange}
                                                placeholder="Enter Card Number"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="expiryDate">Expiry Date <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="expiryDate"
                                                value={creditCardInfo.expiryDate}
                                                onChange={handleCreditCardChange}
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="cvv">CVV <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cvv"
                                                value={creditCardInfo.cvv}
                                                onChange={handleCreditCardChange}
                                                placeholder="Enter CVV"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="paypal"
                                        value="PayPal"
                                        checked={paymentMethod === 'PayPal'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={handleOrder}
                                disabled={loading || cart.length === 0 || !paymentMethod}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : 'Confirm Order'}
                            </button>
                        </>
                    )}
                </div>
            </div>
            {successMessage && <p className="text-success mt-4">{successMessage}</p>}
            {error && <p className="text-danger mt-4">{error}</p>}
        </div>
    );
};
