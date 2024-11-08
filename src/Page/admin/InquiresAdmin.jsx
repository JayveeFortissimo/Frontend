import React, { useState } from 'react';
import Answered from "../../hooks/AdminHooks/AnsweredM.js";
import { VscSend } from "react-icons/vsc";
import { FiUser, FiSearch, FiMessageSquare } from "react-icons/fi";

const InquiriesAdmin = () => {
  const {
    allMessageUser,
    setClickedM,
    usersMessages,
    userName,
    mg,
    AnswerAdmin,
    message
  } = Answered();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = allMessageUser.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6 w-[100%]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar - Users List */}
        <div className="w-full md:w-72 bg-gray-800 rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Conversations</h2>
            <div className="mt-3 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(90vh-8rem)]">
            {filteredUsers.map(pro => {
              if (!pro.is_Admin) {
                return (
                  <div
                    key={pro.id}
                    onClick={() => {
                      setClickedM(pro.id);
                      userName.current = pro.name;
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer border-b transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center">
                      <FiUser className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{pro.name}</h3>
                      <p className="text-xs text-gray-400">Click to view messages</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-sm flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <FiMessageSquare className="text-gray-400" />
            </div>
            <div>
              <h2 className="font-semibold">{userName.current}</h2>
              <p className="text-sm text-gray-400">Customer Support Conversation</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {usersMessages.map((pro, index) => (
              <div
                key={index}
                className={`flex ${pro.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    pro.sender === 'admin'
                      ? 'bg-indigo-500 text-white rounded-tr-none'
                      : 'bg-gray-700 text-gray-200 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{pro.message}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <form onSubmit={AnswerAdmin} className="flex gap-3">
              <input
                type="text"
                className="flex-1 rounded-lg border border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 bg-gray-700 text-gray-200"
                placeholder="Type your message..."
                onChange={e => mg(e.target.value, "message")}
                value={message.message}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 flex items-center gap-2"
              >
                <span>Send</span>
                <VscSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiriesAdmin;