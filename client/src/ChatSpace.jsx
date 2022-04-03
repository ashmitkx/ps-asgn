import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { dateParse } from './utils/dateParse';

function Person({ otherUser, lastMessage, open, onClick }) {
    let timestampWidth = 5;
    if (lastMessage) timestampWidth = dateParse(lastMessage.timestamp).length * 0.75;

    let msgText = lastMessage?.text;
    if (msgText && msgText.length > 27 - timestampWidth)
        msgText = msgText.substring(0, 30 - timestampWidth) + '...';

    return (
        <button className={`person ${open ? 'open' : ''}`} onClick={onClick}>
            <span className='handle'>{otherUser.handle}</span>
            {lastMessage ? (
                <div className='msg'>
                    <span className='msgtext'>{msgText}</span>
                    <span className='msgtime'>{dateParse(lastMessage.timestamp)}</span>
                </div>
            ) : (
                <div>
                    <span className='msgtext'>No message history...</span>
                </div>
            )}
        </button>
    );
}

function Message({ text, timestamp, type = 'self' }) {
    return (
        <div className={`message ${type === 'self' ? 'inverted' : null}`}>
            <span className='text'>{text}</span>
            <span className='timestamp'>{dateParse(timestamp)}</span>
        </div>
    );
}

function NoPersonSelected() {
    return (
        <main className='nochat'>
            <span>Select a person to chat with...</span>
        </main>
    );
}

function Messages({ messagesState, openChat: chatId, currUser }) {
    const [messages, setMessages] = messagesState;
    const messagesEndRef = useRef(null);

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView();
    }

    useEffect(scrollToBottom, [messages]);
    useEffect(() => {
        async function getChat() {
            const res = await axios.get(`/api/v1/chats/${chatId}`);
            setMessages(res.data);
        }
        getChat();
    }, [chatId]);

    return (
        <main>
            <div className='messages'>
                {messages?.map(message => (
                    <Message
                        key={message._id}
                        {...message}
                        type={message.userId === currUser._id ? 'self' : 'other'}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <ChatBox messagesState={messagesState} chatId={chatId} currUser={currUser} />
        </main>
    );
}

function ChatBox({ messagesState, chatId, currUser }) {
    const [messages, setMessages] = messagesState;
    const [newMsg, setNewMsg] = useState('');

    function handleMsgInput(e) {
        e.preventDefault();
        setNewMsg(e.target.value);
    }

    async function submitMsg(e) {
        e.preventDefault();

        try {
            const body = { userId: currUser._id, text: newMsg };
            const res = await axios.post(`/api/v1/chats/${chatId}`, body);

            messages.push(res.data);
        } catch (e) {
            console.error(e);
        }

        setMessages([...messages]);
        setNewMsg('');
    }

    async function reloadChat(e) {
        e.preventDefault();

        const res = await axios.get(`/api/v1/chats/${chatId}`);
        setMessages(res.data);
    }

    return (
        <div className='chatbox'>
            <button className='reload' onClick={reloadChat}>
                ↻
            </button>
            <form className='chatform'>
                <input
                    type='text'
                    value={newMsg}
                    onChange={handleMsgInput}
                    placeholder='Send a message...'
                    maxLength={100}
                />
                <button type='submit' onClick={submitMsg}>
                    🡪
                </button>
            </form>
        </div>
    );
}

function ChatSpace({ currUser }) {
    const messagesState = useState(null);
    const messages = messagesState[0];
    const [persons, setPersons] = useState([]);
    const [openChat, setOpenChat] = useState(null);

    useEffect(() => {
        async function getChats() {
            const res = await axios.get(`/api/v1/users/${currUser._id}/chats`);
            setPersons(res.data);
        }
        getChats();
    }, [currUser, messages]);

    function onPersonSelect(chatId) {
        setOpenChat(chatId);
    }

    return (
        <div className='chatspace'>
            <aside>
                {persons?.map(person => (
                    <Person
                        key={person._id}
                        {...person}
                        open={openChat === person._id}
                        onClick={() => onPersonSelect(person._id)}
                    />
                ))}
            </aside>
            {openChat ? (
                <Messages openChat={openChat} currUser={currUser} messagesState={messagesState} />
            ) : (
                <NoPersonSelected />
            )}
        </div>
    );
}

export default ChatSpace;
