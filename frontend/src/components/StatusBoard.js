import MemberCard from './MemberCard';

function StatusBoard({ name, members, socket }) {

    const enLigne = members.filter(m => m.status === 'En ligne').length;
    const absent = members.filter(m => m.status === 'Absent').length;
    const occupe = members.filter(m => m.status === 'Occupé').length;

    const getStatusClass = (status) => {
        if (status === 'En ligne') return 'dot-green';
        if (status === 'Absent') return 'dot-orange';
        return 'dot-red';
    };

    const getTimeNow = () => {
        const date = new Date();
        return date.getHours().toString().padStart(2, '0') + ':' +
               date.getMinutes().toString().padStart(2, '0');
    };

    return (
        <div className="app">

            <header>
                <div className="brand">
                    <div className="logo">S</div>
                    <h2>StatusBoard</h2>
                    <span>{members.length} en ligne</span>
                </div>

                <p>Connecté : <b>{name}</b></p>
            </header>

            <div className="layout">
                <aside>
                    <h3>STATUTS</h3>

                    <div className="stat-line green">
                        <span>● En ligne</span>
                        <b>{enLigne}</b>
                    </div>

                    <div className="stat-line orange">
                        <span>● Absent</span>
                        <b>{absent}</b>
                    </div>

                    <div className="stat-line red">
                        <span>● Occupé</span>
                        <b>{occupe}</b>
                    </div>

                    <div className="total">
                        Total <b>{members.length}</b>
                    </div>
                </aside>

                <main>
                    <div className="main-top">
                        <h2>Membres connectés</h2>
                        <div>
                            <button>Grille</button>
                            <button>Liste</button>
                        </div>
                    </div>

                    <div className="members-grid">
                        {members.map((m) => (
                            <MemberCard
                                key={m.id}
                                member={m}
                                socket={socket}
                                currentName={name}
                            />
                        ))}
                    </div>

                    <h3>Historique des événements</h3>

                    <ul className="history">
                        {members.map((m) => (
                            <li key={m.id}>
                                <span>
                                    <span className={'history-dot ' + getStatusClass(m.status)}></span>
                                    {m.status === 'En ligne'
                                        ? `${m.name} a rejoint le board`
                                        : `${m.name} → ${m.status}`
                                    }
                                </span>

                                <span className="time">
                                    {m.time || getTimeNow()}
                                </span>
                            </li>
                        ))}
                    </ul>

                </main>
            </div>

            <footer>
                <span>● Socket.io connecté</span>
                <span>ws://localhost:3001</span>
            </footer>
        </div>
    );
}

export default StatusBoard;