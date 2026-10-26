import { useState } from 'react';
import { loginUser, fetchProtectedResource } from './api';

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(username, password);
            setMessage('Logged in! JWT saved to localStorage.');
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleGetResource = async () => {
        try {
            // Replace '/api/user' with the actual @GetMapping path in your ResourceController
            const data = await fetchProtectedResource('/api/user');
            setMessage(`Backend response: ${data}`);
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Spring Security JWT + React</h2>
            <form onSubmit={handleLogin}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            <hr />
            <button onClick={handleGetResource}>Test Protected Endpoint</button>
            <p>{message}</p>
        </div>
    );
}