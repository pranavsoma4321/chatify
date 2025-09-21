import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser,  isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="flex flex-col gap-4"> {/* Added gap between items */}
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors flex items-center gap-3"
          onClick={() => setSelectedUser(contact)}
        >
          <div className={`avatar ${onlineUsers?.includes(contact._id) ? "online" : "offline"}`}>
            <div className="size-12 rounded-full overflow-hidden">
              <img src={contact.profilePic || "/login.png"} alt={contact.username} />
            </div>
          </div>
          <h4 className="text-slate-200 font-medium">{contact.username}</h4>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
