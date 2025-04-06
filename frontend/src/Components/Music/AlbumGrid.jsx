import React from 'react';

const AlbumGrid = ({ albums }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
      {albums.map((album) => (
        <div 
          key={album.id}
          className="bg-gray-900 p-3 sm:p-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
          style={{ backgroundColor: album.bgColor }}
        >
          <img 
            src={album.image} 
            alt={album.name} 
            className="w-full aspect-square object-cover rounded-lg mb-2 sm:mb-4" 
          />
          <h3 className="text-white font-bold text-sm sm:text-base truncate">{album.name}</h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate">{album.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumGrid; 