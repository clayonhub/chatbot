import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

function MessageList({ messages, isTyping }) {
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="message-list" ref={listRef}>
            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
        </div>
    );
}

export default MessageList;
