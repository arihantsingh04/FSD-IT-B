import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, name, email })
            });
            const data = await res.json();

            if (res.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Cannot connect to server');
        }
    };

    return (
        <div className="glass-panel auth-box">
            <h1 style={{ textAlign: 'center' }}>REGISTER HERE</h1>

            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={name} onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit">Register</button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <Link to="/login" className="link">Click here to Sign in</Link>
            </div>
        </div>
    );
}
