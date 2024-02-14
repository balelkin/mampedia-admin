import React, { useState } from 'react';
// import './ChatApp.css'; // Import your CSS file

const ChatApp = () => {
    const [activeChat, setActiveChat] = useState('person2');
    const [activePerson, setActivePerson] = useState('person2');

    const setAciveChat = (person) => {
        setActivePerson(person);
        setActiveChat(person);
    };

    const friendsData = [
        // ... your friends data
    ];

    const chatData = [
        // ... your chat data
    ];

    return (
        <div className="wrapper">
            <div className="container">
                <div className="left">
                    <div className="top">
                        <input type="text" placeholder="Search" />
                        <a href="javascript:;" className="search"></a>
                    </div>
                    <ul className="people">
                        {friendsData.map((friend) => (
                            <li
                                key={friend.dataChat}
                                className={`person ${activePerson === friend.dataChat ? 'active' : ''}`}
                                data-chat={friend.dataChat}
                                onMouseDown={() => setAciveChat(friend.dataChat)}
                            >
                                <img src={friend.imgSrc} alt="" />
                                <span className="name">{friend.name}</span>
                                <span className="time">{friend.time}</span>
                                <span className="preview">{friend.preview}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="right">
                    <div className="top">
                        <span>To: <span className="name">{friendsData.find((friend) => friend.dataChat === activePerson)?.name}</span></span>
                    </div>
                    {chatData.map((chat) => (
                        <div
                            key={chat.dataChat}
                            className={`chat ${activePerson === chat.dataChat ? 'active-chat' : ''}`}
                            data-chat={chat.dataChat}
                        >
                            <div className="conversation-start">
                                <span>{chat.conversationStart}</span>
                            </div>
                            {chat.bubbles.map((bubble, index) => (
                                <div key={index} className={`bubble ${bubble.type}`}>
                                    {bubble.content}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="write">
                        <a href="javascript:;" className="write-link attach"></a>
                        <input type="text" />
                        <a href="javascript:;" className="write-link smiley"></a>
                        <a href="javascript:;" className="write-link send"></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
