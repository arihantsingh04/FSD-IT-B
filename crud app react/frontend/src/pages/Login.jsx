import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Cannot connect to server');
        }
    };

    return (
        <div className="glass-panel auth-box">
            <h1 style={{ textAlign: 'center' }}>SIGN IN HERE</h1>

            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your username" required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password" required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit">Sign In</button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <Link to="/register" className="link">Click here to Register</Link>
            </div>
        </div>
    );
}
