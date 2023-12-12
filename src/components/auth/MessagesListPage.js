import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagesListPage = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Assume the API requires a token for authentication
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/chats/messages/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setMessages(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the messages", error);
        });
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            {messages.map(message => (
                <div key={message.id}>
                    <p>{message.sender}: {message.message}</p>
                </div>
            ))}
        </div>
    );
};

export default MessagesListPage;
