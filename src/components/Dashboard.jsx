import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessage, getMessages } from "../utils/api";
import { UserContext } from "../context/UserContext";
import EditProfileModal from "./EditProfileModal";
import "./Dashboard.css";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const loadedMessages = await getMessages();
      setMessages(loadedMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    try {
      const userAvatar =
        user.pokemonData?.imageUrl || "https://via.placeholder.com/40";
      await sendMessage(user.id, user.name, inputValue, userAvatar);
      await loadMessages();
      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    updateUser(updatedUser);
    setShowEditProfile(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>PokéChat - Team Chat</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            {user.pokemonData?.imageUrl && (
              <img
                src={user.pokemonData.imageUrl}
                alt={user.name}
                className="user-avatar"
              />
            )}
            <div className="user-details">
              <p className="user-name">{user.name}</p>
              <p className="user-pokemon">{user.favoritePokemon}</p>
            </div>
          </div>
          <div className="header-buttons">
            <button
              className="btn-edit-profile"
              onClick={() => setShowEditProfile(true)}
            >
              Edit Profile
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => {
                const showDateSeparator =
                  index === 0 ||
                  formatDate(msg.timestamp) !==
                    formatDate(messages[index - 1].timestamp);

                return (
                  <div key={msg.id}>
                    {showDateSeparator && (
                      <div className="date-separator">
                        {formatDate(msg.timestamp)}
                      </div>
                    )}
                    <div
                      className={`message ${msg.userId === user.id ? "own" : "other"}`}
                    >
                      <img
                        src={msg.userAvatar}
                        alt={msg.userName}
                        className="message-avatar"
                      />
                      <div className="message-content">
                        <div className="message-header">
                          <span className="message-username">
                            {msg.userName}
                          </span>
                          <span className="message-time">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                        <div className="message-text">{msg.message}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form className="message-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="message-input"
          />
          <button
            type="submit"
            className="btn-send"
            disabled={loading || !inputValue.trim()}
          >
            <span>➤</span>
          </button>
        </form>
      </div>

      {showEditProfile && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditProfile(false)}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
