function MemberCard({ member, socket, currentName }) {

    const changeStatus = (status) => {
        socket.emit('status:change', { status });
    };

    const initials = member.name.substring(0, 2).toUpperCase();

    return (
        <div className="member-card">
            <div className="member-top">
                <div className="avatar">{initials}</div>

                <div>
                    <h3>{member.name}</h3>
                    <p>Membre</p>
                </div>

                {member.name === currentName && <span className="vous">vous</span>}
            </div>

            <span className={'status ' + member.status.replace(' ', '-').toLowerCase()}>
                ● {member.status}
            </span>

            {member.name === currentName && (
                <div className="buttons">
                    <button onClick={() => changeStatus('En ligne')}>En ligne</button>
                    <button onClick={() => changeStatus('Absent')}>Absent</button>
                    <button onClick={() => changeStatus('Occupé')}>Occupé</button>
                </div>
            )}
        </div>
    );
}

export default MemberCard;