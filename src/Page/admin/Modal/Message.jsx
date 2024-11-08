import React from 'react';
import { VscSend, VscChromeClose } from "react-icons/vsc";
import { FiMessageSquare } from "react-icons/fi";
import Messages from "../../../hooks/Messages.js";

const Message = ({ id, dispatch, Sidebars }) => 
  {

  const { mg, HandleSubmit, message, messenger } = Messages(id);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(Sidebars.messageOpen(false))}
      />

      {/* Modal */}
      <div className="relative w-[27rem]  h-[35rem] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FiMessageSquare className="text-blue-600 text-lg" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Messages</h2>
              <p className="text-sm text-gray-500">To Admin </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(Sidebars.messageOpen(false))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <VscChromeClose className="text-gray-500 w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messenger.map((pro, index) => (
            <div
              key={index}
              className={`flex ${pro.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] rounded-2xl px-4 py-3 
                  ${pro.sender === 'me' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }
                `}
              >
                <p className="text-sm whitespace-pre-wrap">{pro.message}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-gray-50">
          <form 
            onSubmit={HandleSubmit} 
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 
                focus:outline-none focus:border-blue-500 focus:ring-2 
                focus:ring-blue-100 transition-all duration-200"
              onChange={e => mg(e.target.value, "message")}
              value={message.message}
              required
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-blue-500 text-white rounded-lg 
                hover:bg-blue-600 active:bg-blue-700 
                transition-colors duration-200 flex items-center gap-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="text-sm font-medium">Send</span>
              <VscSend className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;