import { useState, useEffect } from 'react';

function MessageBubble({ message }) {
    const [displayedContent, setDisplayedContent] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const isUser = message.role === 'user';

    useEffect(() => {
        if (isUser) {
            setDisplayedContent(message.content);
            return;
        }

        // Typing animation for assistant messages
        setIsAnimating(true);
        setDisplayedContent('');

        const content = message.content;
        let index = 0;

        const interval = setInterval(() => {
            if (index < content.length) {
                setDisplayedContent(content.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                setIsAnimating(false);
            }
        }, 15);

        return () => clearInterval(interval);
    }, [message.content, isUser]);

    return (
        <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
            <div className="message-avatar">
                {isUser ? '👤' : '🤖'}
            </div>
            <div className="message-content">
                <div className="message-text">
                    {displayedContent}
                    {isAnimating && <span className="cursor">|</span>}
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;
