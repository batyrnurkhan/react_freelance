import React from 'react';

function ChatList({ chats, onSelectChat }) {
    return (
        <div>
            {chats.map(chat => (
                <div key={chat.id} onClick={() => onSelectChat(chat)}>
                    {/* Display logic for chat item */}
                    Chat with {chat.participant_usernames.join(', ')}
                </div>
            ))}
        </div>
    );
}

export default ChatList;
