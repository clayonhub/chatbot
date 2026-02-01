function ChatInput({ value, onChange, onSubmit, disabled }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <form className="chat-input-form" onSubmit={onSubmit}>
            <div className="input-wrapper">
                <input
                    type="text"
                    className="chat-input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    disabled={disabled}
                    autoFocus
                />
                <button
                    type="submit"
                    className="send-button"
                    disabled={disabled || !value.trim()}
                    aria-label="Send message"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default ChatInput;
