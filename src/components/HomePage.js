import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/HomePage.css';
import {Link} from "react-router-dom";
import logo1 from "./styles/free-icon-freelancer-11356308.png"
import logo2 from "./styles/free-icon-freelance-7608655.png"
import logo3 from "./styles/free-icon-freelance-10491662.png"

const HomePage = () => {
    const [topFreelancers, setTopFreelancers] = useState([]);
    const [matchedListings, setMatchedListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const carouselItems = [
        {
            imgSrc: logo1,
            imgAlt: 'Description of image 1',
            testimonialText: '"Great platform for freelancers! Highly recommend. 1 "',
            testimonialAuthor: 'John Doe'
        },
        // ... add more carousel items as needed
        {
            imgSrc: logo2,
            imgAlt: 'Description of image 1',
            testimonialText: '"Great platform for freelancers! Highly recommend. 2"',
            testimonialAuthor: 'John Doe'
        },
        {
            imgSrc: logo3,
            imgAlt: 'Description of image 1',
            testimonialText: '"Great platform for freelancers! Highly recommend. 3"',
            testimonialAuthor: 'John Doe'
        },
    ];

    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const goToNextItem = () => {
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    };

    const currentItem = carouselItems[currentItemIndex];

    // Render function for gallery items

    // Fetch top freelancers (this can be done irrespective of login status)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/accounts/top-freelancers/')
            .then(response => {
                setTopFreelancers(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.toString());
                setIsLoading(false);
            });
    }, []);

    // Fetch matched listings only if access token is present
    useEffect(() => {
        if (!accessToken) return;

        axios.get('http://127.0.0.1:8000/api/listings/open/matched/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                setMatchedListings(response.data);
            })
            .catch(err => {
                if (err.response && err.response.status !== 401) {
                    // Only set error for non-401 (unauthorized) errors
                    setError(err.toString());
                }
            });
    }, [accessToken]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className="homepage">
            <div className="sidebar">
                <h2>Top Freelancers</h2>
                <div className="list-container">
                    {topFreelancers.map(freelancer => (
                        <div key={freelancer.username} className="freelancer-item">
                            <div className="freelancer-details">
                                {freelancer.first_name} {freelancer.last_name}
                            </div>
                            <div className="freelancer-rating">
                                Rating: {freelancer.freelancer_profile ? freelancer.freelancer_profile.average_rating.toFixed(2) : 'No rating'}
                            </div>
                        </div>
                    ))}
                </div>

                {accessToken && (
                    <>
                        <h2>Listings for You</h2>
                        <div className="list-container">
                            {matchedListings.map(listing => (
                                <Link to={`/listings/${listing.slug}`} key={listing.id}>
                                    <div className="listing-item">
                                        {listing.title}
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="content">
            <div className="main-content">
                <h1>Welcome to the Freelance Marketplace!</h1>
                <p>
                    Discover top freelance talent ready to contribute to your projects!
                    Our platform connects skilled professionals with businesses seeking expertise.
                    Browse through our listings to find the right match for your needs.
                    Whether you're looking to hire or seeking to offer your services,
                    you've come to the right place.
                </p>
                <p>
                    Get started today by creating an account, or log in to continue where you left off.
                    Happy freelancing!
                </p>
            </div>
                <div className="image-gallery">
                    <h2>Our Work</h2>
                    <div className="carousel-container" onClick={goToNextItem}>
                        <div className="carousel-item">
                            <img src={currentItem.imgSrc} alt={currentItem.imgAlt} />
                            <div className="testimonial">
                                <p>{currentItem.testimonialText}</p>
                                <span>{currentItem.testimonialAuthor}</span>
                            </div>
                        </div>
                    </div>
                </div>


        </div>
        </div>
    );
}

export default HomePage;
