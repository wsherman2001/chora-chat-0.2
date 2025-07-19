import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const socket = io();

export default function ChatView() {
  const { user } = useAuth();
  const [draft, setDraft] = useState('');
  const [msgs, setMsgs] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on('load messages', setMsgs);
    socket.on('chat message', (m) => setMsgs((x) => [...x, m]));
    return () => socket.off();
  }, []);

  useEffect(() => bottomRef.current?.scrollIntoView(), [msgs]);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim() || !user) return;
    socket.emit('chat message', { nickname: user.email, text: draft });
    setDraft('');
  };

  return (
    <main className="chat-view">
      <div className="chat-messages">
        {msgs.map((m, i) => (
          <div key={i} className="msg">
            <strong>{m.nickname}</strong> <span>{m.time}</span>
            <p>{m.text}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="chat-input">
        <input
          placeholder={`Message #general`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button>Send</button>
      </form>
    </main>
  );
}