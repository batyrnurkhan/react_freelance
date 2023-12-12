import React, { useState } from 'react';
import axios from 'axios';

const SendMessagePage = () => {
    const [chatId, setChatId] = useState('');
    const [senderId, setSenderId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const sendMessage = () => {
        const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

        if (!accessToken) {
            setError('You must be logged in to send messages.');
            return;
        }

        axios.post('http://127.0.0.1:8000/api/messages/', {
            chat: chatId,
            content: message,
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(response => {
                console.log('Message sent:', response.data);
                // Clear the form or navigate as needed
            })
            .catch(error => {
                console.error('Error sending message:', error);
                setError(error.response?.data?.message || 'An error occurred while sending the message.');
            });
    };


    return (
        <div>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="Chat ID"
            />
            <input
                type="text"
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
                placeholder="Your User ID"
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default SendMessagePage;
