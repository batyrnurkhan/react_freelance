import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const [profileData, setProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            setError('You must be logged in to view this page.');
            setIsLoading(false);
            return;
        }

        axios.get('http://127.0.0.1:8000/api/accounts/profile/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                setProfileData(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError('There was a problem fetching your profile data. Please try again.');
                setIsLoading(false);
            });
    }, [accessToken]);

    const profileImageUrl = profileData.profile_image
        ? `http://127.0.0.1:8000/${profileData.profile_image}`
        : 'default-profile-image-url.jpg';

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return (
            <div>
                <div>Error: {error}</div>
                <button onClick={() => navigate('/login')}>Go to Login Page</button>
            </div>
        );
    }

    const isFreelancer = profileData.role === 'freelancer';

    const renderReviews = () => {
        if (!profileData.reviews || profileData.reviews.length === 0) {
            return <p>No reviews yet.</p>;
        }

        return profileData.reviews.map((review, index) => (
            <div key={index}>
                <p>Rating: {review.rating}</p>
                <p>Review: {review.text}</p>
            </div>
        ));
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p>

            <img src={profileImageUrl} alt="Profile" style={{ width: '100px', height: '100px' }} />


            {isFreelancer && (
                <div>
                    <p>Skills: {profileData.skills?.join(', ')}</p>
                    <p>Portfolio: {profileData.portfolio}</p>
                    <p>Average Rating: {profileData.average_rating}</p>
                    <h3>Reviews:</h3>
                    {renderReviews()}
                </div>
            )}

            {!isFreelancer && (
                <div>
                    <p>Company Name: {profileData.company_name}</p>
                    <p>Company Website: {profileData.company_website}</p>
                    <p>Preferred Communication: {profileData.preferred_communication}</p>
                </div>
            )}
            <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
    );
}

export default ProfilePage;
