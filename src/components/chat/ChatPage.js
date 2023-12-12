import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import '../styles/ChatPage.css';

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem('userId'); // Assuming user ID is stored in local storage
    console.log("Logged in User ID: ", loggedInUserId);
    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
            return;
        }

        setIsLoggedIn(true);
        axios.get('http://127.0.0.1:8000/api/chats/', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(response => {
                setChats(response.data);
                if (response.data.length > 0 && !selectedChat) {
                    handleSelectChat(response.data[0]);
                }
            })
            .catch(error => {
                console.error('Failed to fetch chats', error);
            });
    }, [accessToken, navigate]);

    const handleSelectChat = (chat) => {
        console.log("Selected chat: ", chat);
        setSelectedChat(chat);
    };


    return (
        <div className="chat-page">
            {isLoggedIn ? (
                <>
                    <div className="chat-list-container">
                        <ChatList chats={chats} onSelectChat={handleSelectChat} />
                    </div>
                    {selectedChat && (
                        <div className="chat-window-container">
                            <ChatWindow
                                chat={selectedChat}
                                accessToken={accessToken}
                                loggedInUserId={loggedInUserId}
                            />
                        </div>
                    )}
                </>
            ) : (
                <p>You must be logged in to view this page.</p>
            )}
        </div>
    );
};

export default ChatPage;
