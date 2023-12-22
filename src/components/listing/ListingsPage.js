// ListingsPage component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const ListingsPage = () => {
    const [listings, setListings] = useState([]);
    const { isLoggedIn } = useAuth(); // Use states from AuthContext
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/listings/open/')
            .then(response => {
                setListings(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch listings', error);
            });
    }, []);
    console.log('User Role:', userRole); // Debugging line

    return (
        <div>
            <h2>Listings</h2>
            {/* Conditionally render the "Create Listing" button */}
            {userRole === 'client' && (
                <Link to="/create-listing">
                    <button>Create Listing</button>
                </Link>
            )}
            <ul>
                {listings.map(listing => (
                    <li key={listing.id}>
                        <Link to={`/listings/${listing.slug}`}>
                            <h3>{listing.title}</h3>
                        </Link>
                        <p>{listing.description}</p>
                        <p>Price: ${listing.price}</p>
                        <p>Created At: {new Date(listing.created_at).toLocaleString()}</p>
                        <p>Skills: {listing.skills.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListingsPage;
