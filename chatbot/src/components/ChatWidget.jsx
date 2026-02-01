import { useState, useCallback } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const WELCOME_MESSAGE = {
    role: 'assistant',
    content: 'Hello! 👋 I\'m your AI assistant. How can I help you today?'
};

function ChatWidget() {
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputText, setInputText] = useState('');

    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || isTyping) return;

        const userMessage = { role: 'user', content: text.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            const assistantMessage = { role: 'assistant', content: data.response };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: error.message || 'The assistant is temporarily unavailable. Please try again.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [isTyping]);

    const handleSubmit = (e) => {
        e?.preventDefault();
        sendMessage(inputText);
    };

    return (
        <div className="chat-widget">
            <div className="chat-container">
                <MessageList messages={messages} isTyping={isTyping} />
                <ChatInput
                    value={inputText}
                    onChange={setInputText}
                    onSubmit={handleSubmit}
                    disabled={isTyping}
                />
            </div>
        </div>
    );
}

export default ChatWidget;
