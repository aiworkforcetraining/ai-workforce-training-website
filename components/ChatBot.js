import React, { useState } from 'react';

const ChatBot = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleSendMessage = async () => {
        if (!query) return;
        try {
            const response = await fetch('https://api.gemini.com/v1/training_courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add appropriate headers for Gemini API if needed
                },
                body: JSON.stringify({ question: query }),
            });
            const data = await response.json();
            setResponse(data.answer || 'Sorry, I could not find an answer to your question.');
        } catch (error) {
            setResponse('An error occurred while fetching the answer.');
        }
    };

    return (
        <div>
            <h1>AI ChatBot</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Ask a question about the training courses..."
            />
            <button onClick={handleSendMessage}>Send</button>
            <div>
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default ChatBot;