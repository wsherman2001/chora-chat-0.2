const channels = ['general', 'memes', 'support'];

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h3>Channels</h3>
      <ul>
        {channels.map((c) => (
          <li key={c}>#{c}</li>
        ))}
      </ul>
    </nav>
  );
}