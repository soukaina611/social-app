import { useContext, useState, useEffect, useRef} from "react"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { AuthContext } from "../../components/context/AuthContext"
import Conversation from "../../components/conversation/Conversation"
import Message from "../../components/message/Message"
import TopBar from "../../components/TopBar"
import "./messenger.css"
import axios from 'axios';
import {io} from 'socket.io-client'
import { BASE_URL } from '../../services/helper'


const Messenger = () => {
  const {user} = useContext(AuthContext);
  const [conversations, setConversations]=useState([]);
  const [currentChat, setCurrentChat]=useState(null);
  const [messages, setMessages]=useState([]);
  const [newMessages, setNewMessages]=useState("");
  const [ArivalMessages, setArivalMessages]=useState(null);
  const[onlineUsers, setOnlineUsers]=useState([]);
  const scrollRef=useRef();
  const socket=useRef();
  
  useEffect(()=>{
    socket.current=io(`${BASE_URL}`);
    socket.current.on("getMessage", (data)=>{
      setArivalMessages({
        sender:data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  },[])

  //update our messages 
  useEffect(()=>{
    // condition
    ArivalMessages && currentChat?.members.includes(ArivalMessages.sender) &&
    setMessages((prev)=>[...prev, ArivalMessages]);
  },[ArivalMessages,currentChat]);

  useEffect(()=>{
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users)=>{
      setOnlineUsers(user.followings.filter((f)=>users.some((u)=>u.userId===f)));
    });
    },[user]);


  useEffect(()=>{
    const getConversations=async()=>{
      try{
      const res= await axios.get(`${BASE_URL}/conversations/`+user._id);
      setConversations(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getConversations();
  },[user._id])

  useEffect(()=>{
    const getMessages=async()=>{
    try{
      const messages= await axios.get(`${BASE_URL}/messages/`+ currentChat?._id);
      setMessages(messages.data);
    }catch(err){
      console.log(err)
    }
  };
  getMessages();
  },[currentChat])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const message={
      conversationId:currentChat._id,
      sender:user._id,
      text:newMessages
    }
    const receiverId= currentChat?.members.find(m=>m !== user._id);
    socket.current.emit("sendMessage",{
      senderId:user._id,
      receiverId,
      text: newMessages
    })
    try{
      const res= await axios.post(`${BASE_URL}/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages])
  return (
    <>
    <TopBar/>
    <div className="messenger">
        <div className="messengerMenu">
          <div className="messengerMenuWrapper">
            <input className="inputFriend" placeholder="Search for friends"/>
            {conversations.map((c)=>(
              <div onClick={()=>setCurrentChat(c)}>
              <Conversation  conversation={c} currentUser={user}/>
              </div>
            ))}

          </div>
        </div>
        <div className="messengerChatBox">
          <div className="messengerBoxWrapper">
            {currentChat ? (
            <>
            <div className="chatBoxTop">
              {messages.map((m)=>(
                <div ref={scrollRef}>
                <Message message={m} own={m.sender===user._id}/>
                </div>
              ))}
              
            </div>
            <div className="chatBoxBottom">
              <textarea value={newMessages} onChange={(e)=>setNewMessages(e.target.value)}className="textAreaMessage" placeholder="write something..."/>
              <button onClick={handleSubmit} className="btnMessage">Send</button>
            </div>
            </>
             ):(<span className="chatText">Open a conversation to start a chat.</span>)}
          </div>
        </div>
        <div className="messengerChatOnline">
          <div className="messengerOnlineWrapper">
            <ChatOnline 
            onlineUsers={onlineUsers} 
            currentId={user._id} 
            setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
    </div>
    </>
  )
}

export default Messenger
