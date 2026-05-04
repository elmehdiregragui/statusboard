import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import LoginForm from './components/LoginForm';
import StatusBoard from './components/StatusBoard';
import './App.css';

const socket = io('http://localhost:3001');

function App() {

    const [name, setName] = useState('');
    const [members, setMembers] = useState([]);

    useEffect(() => {
        socket.on('members:update', (updatedMembers) => {
            setMembers(updatedMembers);
        });

        return () => socket.off('members:update');
    }, []);

    if (!name) {
        return <LoginForm socket={socket} onJoin={setName} />;
    }

    return (
        <StatusBoard
            name={name}
            members={members}
            socket={socket}
        />
    );
}

export default App;