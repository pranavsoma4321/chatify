import { useChatStore } from "../store/useChatStore"
import BorderAnimatedContainer from '../components/BorderAnimated';
import ProfileHeader from './../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import NoConversionPlaceholder from "../components/NoConversionPlaceholder";

function ChatPage() {
  const { activeTab , selectedUser} = useChatStore();
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>

      <BorderAnimatedContainer>
        {/* Left side */ }
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space=y-2">
            { activeTab === "chats" ? <ChatsList /> : <ContactList />}

          </div>
        </div>

        {/* RIGHT SIDE*/ }
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop:blur-sm">
        {selectedUser ? <ChatContainer/> : <NoConversionPlaceholder />} 

        </div>

      </BorderAnimatedContainer>
    
    </div>
  )
}

export default ChatPage