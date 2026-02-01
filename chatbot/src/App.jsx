import { useState, useEffect } from 'react';
import ChatWidget from './components/ChatWidget';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">✨</span>
                        <h1>AI Assistant</h1>
                    </div>
                    <button
                        className="theme-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>
            <main className="main">
                <ChatWidget />
            </main>
        </div>
    );
}

export default App;
