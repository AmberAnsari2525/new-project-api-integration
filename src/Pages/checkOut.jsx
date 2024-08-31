import React, { useState, useEffect } from 'react';
import { updateUserData, fetchUserData, confirmOrder } from '../Services/api';
import { Spinner } from 'react-bootstrap';

export const Checkout = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        city: '',
        street: '',
        zipcode: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');
        try {
            const token = localStorage.getItem('token');
            await updateUserData(userData, token);
            setSuccessMessage('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update user data.');
        } finally {
            setLoading(false);
        }
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

    // Handler for removing a product from the cart
    const handleRemoveProduct = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const handleOrder = async () => {
        console.log("Order submitted with payment method:", paymentMethod);
        // Add further order processing logic here
        try {
            await confirmOrder({ cart, paymentMethod, creditCardInfo });
            setSuccessMessage('Order placed successfully!');
            setCart([]); // Clear cart after successful order
        } catch (error) {
            setError('Failed to place order.');
        }
    };

    return (
        <div className="container-fluid py-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <h3>Edit Profile</h3>
                    <form onSubmit={handleSubmit}>
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
                            <label htmlFor="email">Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="country">Country</label>
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
                            <label htmlFor="city">City</label>
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
                            <label htmlFor="street">Street</label>
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
                            <label htmlFor="zipcode">Zipcode</label>
                            <input
                                type="text"
                                className="form-control"
                                id="zipcode"
                                value={userData.zipcode}
                                onChange={handleChange}
                                placeholder="Enter Zipcode"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <Spinner animation="border" size="sm"/> : 'Update Profile'}
                        </button>
                        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </form>
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
                                <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                                <select
                                    id="paymentMethod"
                                    className="form-select"
                                    value={paymentMethod}
                                    onChange={handlePaymentMethodChange}
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="creditCard">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>

                            {paymentMethod === 'creditCard' && (
                                <div>
                                    <h5>Credit Card Details</h5>
                                    <div className="form-group mb-3">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            className="form-control"
                                            value={creditCardInfo.cardNumber}
                                            onChange={handleCreditCardChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="expiryDate">Expiry Date</label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            className="form-control"
                                            value={creditCardInfo.expiryDate}
                                            onChange={handleCreditCardChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            className="form-control"
                                            value={creditCardInfo.cvv}
                                            onChange={handleCreditCardChange}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                className="btn btn-primary"
                                onClick={handleOrder}
                                disabled={cart.length === 0 || paymentMethod === ''}
                            >
                                Place Order
                            </button>
                            {error && <p className="text-danger mt-3">{error}</p>}
                            {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
