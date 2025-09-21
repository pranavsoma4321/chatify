import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore(); // default to empty array

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/login.png"} alt={chat.username} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.username}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;
