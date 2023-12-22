// CreateListing.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
    const [listingData, setListingData] = useState({
        title: '',
        description: '',
        price: '',
        skills: [] // Skills are an array of skill IDs
    });
    const [allSkills, setAllSkills] = useState([]); // Store all skills from the backend
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch skills from backend
        axios.get('http://127.0.0.1:8000/api/skills/') // Adjust URL to your skills endpoint
            .then(response => {
                setAllSkills(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch skills', error);
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'skills') {
            setListingData({ ...listingData, skills: [...e.target.selectedOptions].map(o => o.value) });
        } else {
            setListingData({ ...listingData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error("Access token not found");
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/listings/create/', listingData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            navigate('/listings');
        } catch (error) {
            console.error("Error creating listing:", error);
        }
    };
    return (
        <div>
            <h2>Create a New Listing</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={listingData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={listingData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={listingData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="skills">Skills</label>
                    <select
                        multiple
                        id="skills"
                        name="skills"
                        value={listingData.skills}
                        onChange={handleChange}>
                        {allSkills.map(skill => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Listing</button>
            </form>
        </div>
    );
};

export default CreateListing;
