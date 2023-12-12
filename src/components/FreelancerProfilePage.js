import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FreelancerProfilePage = () => {
    const [freelancerData, setFreelancerData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { username } = useParams();
    const [isClient, setIsClient] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://127.0.0.1:8000/api/accounts/freelancer/${username}/`)
            .then(response => {
                setFreelancerData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching freelancer data', error);
                setError('Failed to load freelancer profile. Please try again later.');
                setIsLoading(false);
            });

        // Check if logged-in user is a client
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios.get('http://127.0.0.1:8000/api/accounts/profile/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            }).then(response => {
                setIsClient(response.data.role === 'client');
            }).catch(error => {
                console.error('Error fetching user data', error);
            });
        }
    }, [username]);
    const handleAddReview = () => {
        navigate(`/freelancer/${username}/add-review`);
    };

    const renderReviews = () => {
        if (!freelancerData.reviews || freelancerData.reviews.length === 0) {
            return <p>No reviews yet.</p>;
        }

        return freelancerData.reviews.map((review, index) => (
            <div key={index}>
                <p>Rating: {review.rating}</p>
                <p>Review: {review.text}</p>
            </div>
        ));
    };

    const handleStartChat = () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.post(`http://127.0.0.1:8000/api/start-chat/${username}/`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(response => {
                navigate(`/chats/${response.data.chat_id}`);
            })
            .catch(error => {
                console.error('Error starting chat', error);
            });
    };

    if (isLoading) {
        return <div>Loading freelancer profile...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>{freelancerData.user?.username || 'Freelancer'}'s Profile</h1>
            <img src={freelancerData.profile_image} alt={`${freelancerData.user?.username}'s profile`} />
            <p>Portfolio: <a href={freelancerData.portfolio}>{freelancerData.portfolio}</a></p>
            <p>Skills: {freelancerData.skills?.join(', ')}</p>
            <p>Average Rating: {freelancerData.average_rating}</p>
            <h3>Reviews:</h3>
            {renderReviews()}
            {isClient && (
                <button onClick={handleAddReview}>Add Review</button>

            )}

            {isClient && (
                <button onClick={handleStartChat}>Start Chat with {username}</button>
            )}
        </div>
    );
};

export default FreelancerProfilePage;