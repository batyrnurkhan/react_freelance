import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListingDetailPage = () => {
    const [listing, setListing] = useState(null);
    const [error, setError] = useState('');
    const { slug } = useParams();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios.get(`http://127.0.0.1:8000/api/listings/${slug}/`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(response => {
                    setListing(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch listing details', error);
                    setError('Failed to fetch listing details');
                });
        }
    }, [slug]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!listing) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{listing.title}</h1>
            <p><strong>Description:</strong> {listing.description}</p>
            <p><strong>Status:</strong> {listing.status}</p>
            <p><strong>Price:</strong> ${listing.price}</p>
            <p><strong>Created At:</strong> {new Date(listing.created_at).toLocaleString()}</p>
            {listing.taken_at && <p><strong>Taken At:</strong> {new Date(listing.taken_at).toLocaleString()}</p>}
            {listing.ended_at && <p><strong>Ended At:</strong> {new Date(listing.ended_at).toLocaleString()}</p>}
            <p><strong>User ID:</strong> {listing.user}</p>
            <p><strong>Freelancer:</strong> {listing.freelancer ? listing.freelancer : 'None'}</p>
            <p><strong>Skills:</strong> {listing.skills.join(', ')}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default ListingDetailPage;
