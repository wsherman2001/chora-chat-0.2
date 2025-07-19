import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

export default function MemberList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // very simple list: every connection adds an id
    const update = () => setUsers((prev) => [...new Set([...prev, socket.id])]);
    socket.on('connect', update);
    socket.on('disconnect', update);
    return () => socket.off();
  }, []);

  return (
    <aside className="member-list">
      <h3>Online — {users.length}</h3>
      <ul>
        {users.map((u) => (
          <li key={u}>👤 {u.slice(-4)}</li>
        ))}
      </ul>
    </aside>
  );
}