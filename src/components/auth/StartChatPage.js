import React from 'react';
import axios from 'axios';

const StartChatPage = ({ username }) => {
    const startChat = () => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:8000/api/chats/start-chat/${username}/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Chat started", response.data);
        })
        .catch(error => {
            console.error("There was an error starting the chat", error);
        });
    };

    return (
        <div>
            <button onClick={startChat}>Start Chat with {username}</button>
        </div>
    );
};

export default StartChatPage;
