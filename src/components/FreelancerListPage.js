import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FreelancerListPage = () => {
    const [freelancers, setFreelancers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://127.0.0.1:8000/api/accounts/freelancers/')
            .then(response => {
                setFreelancers(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching freelancers', error);
                setError('Failed to load freelancers. Please try again later.');
                setIsLoading(false);
            });
    }, []);

    const handleFreelancerClick = (username) => {
        navigate(`/freelancer/${username}`);
    };

    if (isLoading) {
        return <div>Loading freelancers...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Freelancers</h1>
            {freelancers.map(freelancer => (
                <div key={freelancer.username} className="freelancer-item" onClick={() => handleFreelancerClick(freelancer.username)}>
                    <h2>{freelancer.first_name} {freelancer.last_name}</h2>
                    <p>Role: {freelancer.role}</p>
                    {freelancer.profile_image && (
                        <img src={freelancer.profile_image} alt={`${freelancer.first_name}'s profile`} />
                    )}
                    {/* Add more details as needed */}
                </div>
            ))}
        </div>
    );
};

export default FreelancerListPage;
