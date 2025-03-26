import React from 'react';

const ProfileImage = ({ user, size = "md", className = "" }) => {
  const getSize = () => {
    switch (size) {
      case "xs": return "w-8 h-8";
      case "sm": return "w-10 h-10";
      case "md": return "w-12 h-12";
      case "lg": return "w-16 h-16";
      case "xl": return "w-20 h-20";
      default: return "w-12 h-12";
    }
  };

  const profilePicture = user?.profilePicture;

  return (
    <div className={`${getSize()} rounded-full overflow-hidden border-2 border-white/50 shadow-lg ${className}`}>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={user?.name || 'Profile'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '';
            e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center">
              <span class="text-white font-semibold">${user?.name?.charAt(0)?.toUpperCase() || '?'}</span>
            </div>`;
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center">
          <span className="text-white font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileImage; 