import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatWindow({ chat, accessToken, loggedInUserId }) {
    const [messages, setMessages] = useState(chat.messages || []);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setMessages(chat.messages || []);
    }, [chat]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const payload = {
            content: newMessage,
            chat: chat.id,
            author: parseInt(loggedInUserId)
        };

        console.log("Sending message:", payload);

        const url = `http://127.0.0.1:8000/api/chats/${chat.id}/send/`;

        axios.post(url, payload, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(response => {
                setMessages(prevMessages => [...prevMessages, response.data]);
                setNewMessage('');
            })
            .catch(err => {
                console.error('Failed to send message', err);
                setError(err.response?.data?.message || 'An error occurred while sending the message.');
            });
    };

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here"
            />
            <button onClick={sendMessage}>Send Message</button>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.author === parseInt(loggedInUserId) ? 'You' : `User ${message.author}`}: </strong>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatWindow;
