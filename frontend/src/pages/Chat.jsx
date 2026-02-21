import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import './Chat.css';

const dummyContacts = [
    { id: 1, name: 'Startup Inc.', role: 'Employer', lastMessage: 'Great, let\'s start tomorrow.', unread: 0 },
    { id: 2, name: 'Alice Smith', role: 'Student', lastMessage: 'Here is my portfolio link!', unread: 2 },
    { id: 3, name: 'TechNova', role: 'Employer', lastMessage: 'Are you available for a quick call?', unread: 0 },
];

const dummyMessages = [
    { id: 1, senderId: 1, text: 'Hi, I saw your application for the React Developer role.', timestamp: '10:00 AM' },
    { id: 2, senderId: 'me', text: 'Hello! Yes, I am very interested in the position.', timestamp: '10:05 AM' },
    { id: 3, senderId: 1, text: 'Your portfolio looks great. Can you start next week?', timestamp: '10:10 AM' },
    { id: 4, senderId: 'me', text: 'Absolutely. I can dedicate 20 hours a week.', timestamp: '10:15 AM' },
    { id: 5, senderId: 1, text: 'Great, let\'s start tomorrow.', timestamp: '10:20 AM' },
];

const Chat = () => {
    const { user } = useAuthStore();
    const [activeContact, setActiveContact] = useState(dummyContacts[0]);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState(dummyMessages);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const newMessage = {
            id: Date.now(),
            senderId: 'me',
            text: messageInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessageInput('');
    };

    return (
        <div className="chat-page container py-4">
            <div className="chat-layout card">

                {/* Contacts Sidebar */}
                <aside className="chat-sidebar border-right">
                    <div className="chat-sidebar-header pb-3 border-bottom">
                        <h2 className="text-xl font-bold">Messages</h2>
                        <input type="text" className="input mt-3" placeholder="Search conversations..." />
                    </div>

                    <div className="contacts-list mt-3">
                        {dummyContacts.map(contact => (
                            <div
                                key={contact.id}
                                className={`contact-item flex items-center gap-3 p-3 ${activeContact.id === contact.id ? 'active' : ''}`}
                                onClick={() => setActiveContact(contact)}
                            >
                                <div className="avatar-placeholder chat-avatar-sm">
                                    {contact.name.charAt(0)}
                                </div>
                                <div className="contact-info flex-1">
                                    <div className="flex-between">
                                        <h4 className="font-semibold text-sm">{contact.name}</h4>
                                        {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
                                    </div>
                                    <p className="text-muted text-xs text-truncate">{contact.lastMessage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Window */}
                <main className="chat-window flex-col">
                    {activeContact ? (
                        <>
                            {/* Chat Header */}
                            <header className="chat-header flex items-center gap-3 p-4 border-bottom">
                                <div className="avatar-placeholder chat-avatar-sm">
                                    {activeContact.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{activeContact.name}</h3>
                                    <p className="text-muted text-xs">{activeContact.role}</p>
                                </div>
                            </header>

                            {/* Messages Area */}
                            <div className="messages-area flex-1 p-4 flex-col gap-3 overflow-y-auto">
                                {messages.map((msg) => {
                                    const isMe = msg.senderId === 'me';
                                    return (
                                        <div key={msg.id} className={`message-bubble-wrapper flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`message-bubble ${isMe ? 'msg-me' : 'msg-other'}`}>
                                                <p>{msg.text}</p>
                                                <span className="msg-time">{msg.timestamp}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Message Input Area */}
                            <footer className="chat-footer p-4 border-top">
                                <form className="flex gap-2" onSubmit={handleSendMessage}>
                                    <button type="button" className="btn btn-outline btn-icon" title="Attach file">📎</button>
                                    <input
                                        type="text"
                                        className="input flex-1"
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </form>
                            </footer>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted">
                            Select a conversation to start chatting
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Chat;
