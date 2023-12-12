import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Ensure this path is correct

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">LOGO</Link>
            <ul className="navbar-links">
                <li className="navbar-item">
                    <Link to="/profile" className="navbar-link">Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/chats" className="navbar-link">Chats</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/listings" className="navbar-link">Listings</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/freelancers" className="navbar-link">Freelancers</Link>
                </li>
                {isLoggedIn && (
                    <li className="navbar-item">
                        <Link to="/logout" onClick={handleLogout}>Logout</Link>
                    </li>
                )}
                {!isLoggedIn && (
                    <>
                        <li className="navbar-item dropdown">
                            <button className="dropbtn">Join</button>
                            <div className="dropdown-content">
                                <Link to="/login" className="dropdown-link">Login</Link>
                                <Link to="/register" className="dropdown-link">Register</Link>
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
