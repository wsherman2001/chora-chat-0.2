import Sidebar from './Sidebar';
import ChatView from './ChatView';
import MemberList from './MemberList';

export default function DiscordLayout() {
  return (
    <div className="discord">
      <Sidebar />
      <ChatView />
      <MemberList />
    </div>
  );
}