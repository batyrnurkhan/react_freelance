import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddReviewPage = () => {
    const [review, setReview] = useState({ rating: '', text: '' });
    const { username } = useParams(); // Freelancer's username
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        // Make a POST request to the backend to submit the review
        axios.post(`http://127.0.0.1:8000/api/accounts/freelancer/${username}/review/`, review, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                // Handle success - navigate back to freelancer's profile
                navigate(`/freelancer/${username}`);
            })
            .catch(error => {
                // Handle error
                console.error('Error submitting review', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Write a Review for {username}</h2>
            <label>
                Rating:
                <input type="number" value={review.rating} onChange={e => setReview({...review, rating: e.target.value})} />
            </label>
            <label>
                Review:
                <textarea value={review.text} onChange={e => setReview({...review, text: e.target.value})}></textarea>
            </label>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default AddReviewPage;
