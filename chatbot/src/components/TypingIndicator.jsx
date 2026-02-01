function TypingIndicator() {
    return (
        <div className="message-bubble assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
                <div className="typing-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </div>
    );
}

export default TypingIndicator;
