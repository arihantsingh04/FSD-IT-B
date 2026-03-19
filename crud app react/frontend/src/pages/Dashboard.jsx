import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            fetchUsers();
        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
            if (id === currentUser.id) {
                handleLogout();
            } else {
                fetchUsers();
            }
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const startEditing = (user) => {
        setEditingId(user.id);
        setEditForm({ name: user.name || '', email: user.email || '' });
    };

    const handleEditSubmit = async (id) => {
        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            setEditingId(null);
            fetchUsers();
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!currentUser) return null;

    return (
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'right', marginBottom: '15px', marginTop: '15px' }}>
                <button className="outline logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div>
                <h2>Registered Users</h2>
                <div className="users-grid">
                    {users.map(user => (
                        <div key={user.id} className="glass-panel user-card">
                            {editingId === user.id ? (
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div className="input-group" style={{ marginBottom: '1rem' }}>
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="input-group" style={{ marginBottom: '1rem' }}>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="card-actions">
                                        <button style={{ background: '#10b981' }} onClick={() => handleEditSubmit(user.id)}>Save</button>
                                        <button className="outline" onClick={() => setEditingId(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <h3>{user.name || user.username}</h3>
                                    <p><strong>Username:</strong> {user.username}</p>
                                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>

                                    <div className="card-actions">
                                        <button className="outline" onClick={() => startEditing(user)}>Edit</button>
                                        <button className="danger" onClick={() => handleDelete(user.id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
