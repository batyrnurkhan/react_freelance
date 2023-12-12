import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListingsPage = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        // Fetch listings data from your API here
        axios.get('http://127.0.0.1:8000/api/listings/open/')
            .then(response => {
                setListings(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch listings', error);
            });
    }, []);

    return (
        <div>
            <h2>Listings</h2>
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
