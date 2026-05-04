import { useState } from 'react';

function LoginForm({ socket, onJoin }) {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (!name.trim()) return;
        socket.emit('user:join', { name });
        onJoin(name);
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="logo-big">S</div>
                <h2>StatusBoard</h2>
                <p>Entrez votre nom pour rejoindre</p>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                />

                <button onClick={handleSubmit}>Rejoindre →</button>
            </div>
        </div>
    );
}

export default LoginForm;