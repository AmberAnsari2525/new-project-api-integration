import React, {useState, useEffect} from 'react';
import  {getProduct} from "../Services/api";
import "../style/Style.css"
import {useNavigate} from "react-router-dom";

export  const ProductList = (props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // Correct state name
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProduct();
                console.log('Fetched data:', data); // Log the fetched data

                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err); // Log error for debugging

                if (err.response && err.response.status === 401) {
                    setError("Unauthorized access. Please log in.");
                } else {
                    setError(err.message);
                }
            }
        };

        fetchProducts();
    }, []);
    const handleClick = (id) => {
        navigate(`/product/${id}`); // Use navigate to go to the single product page
    };

    return (
        <>
            {error && <p>{error}</p>}
            {products.length > 0 ? (
                <table className="product-table">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((list) => (
                        <tr key={list.id} onClick={() => handleClick(list.id)} style={{cursor: 'pointer'}}>
                            <td>{list.name}</td>
                            <td>
                                {list.image ? (
                                    <img src={list.image} alt={list.name} className="product-image"/>
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td>${list.price}</td>
                            <td>{list.description}</td>
                            <td>{list.stock}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading products...</p>
            )}
        </>
    );
};


