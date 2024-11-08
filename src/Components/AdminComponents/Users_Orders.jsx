import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag, FiChevronRight } from 'react-icons/fi';

const UsersOrders = ({ user }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredUsers = user.filter(prod => 
    !prod.is_Admin && 
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-8 w-full">
      {/* Header Section */}
      <div className="relative mb-12">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-3">
            User Profiles & Orders
          </h1>
          <p className="text-slate-400 text-lg">
            Manage customer profiles and their order history
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative mb-12 max-w-2xl mx-auto">
        <div className={`absolute inset-0 bg-cyan-500/30 rounded-2xl transition-all duration-500 ${
          isSearchFocused ? 'blur-xl opacity-100' : 'blur-none opacity-0'
        }`} />
        <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-300 ${
            isSearchFocused ? 'text-cyan-400' : 'text-slate-400'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search customers..."
            className="w-full pl-12 pr-4 py-5 bg-transparent text-slate-200 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map(prod => (
          <div
            key={prod.id}
            className="group"
          >
            <div
              onClick={() => navigate(`${prod.id}`)}
              className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/10 rounded-2xl transition-all duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl" />
              </div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors duration-300">
                    <FiUser className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-200 mb-1">{prod.name}</h2>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <FiShoppingBag className="text-slate-500" />
                      <span className="group-hover:text-cyan-400 transition-colors duration-300">
                        View order history
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiChevronRight className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-300 group-hover:translate-x-1 transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg">
            No users found matching "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersOrders;