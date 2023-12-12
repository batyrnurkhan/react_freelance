import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        portfolio: '',
        skills: [],
        profile_image: null,
    });
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
            return;
        }

        axios.get('http://127.0.0.1:8000/api/accounts/profile/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        }).then(response => {
            setFormData(f => ({ ...f, ...response.data }));
        }).catch(error => {
            console.error('Error fetching profile data', error);
        });
    }, [navigate, accessToken]); // formData is not a dependency now

    const handleChange = (e) => {
        if (e.target.name === 'profile_image') {
            setFormData(f => ({ ...f, profile_image: e.target.files[0] }));
        } else {
            setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        axios.put('http://127.0.0.1:8000/api/accounts/profile/update/', formDataToSend, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                navigate('/profile');
            })
            .catch(error => {
                console.error('Error updating profile', error.response.data);
            });
    };
    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Portfolio URL:</label>
                    <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} />
                </div>
                <div>
                    <label>Skills (comma-separated):</label>
                    <input type="text" name="skills" value={formData.skills.join(', ')} onChange={handleChange} />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input type="file" name="profile_image" onChange={handleChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfilePage;
