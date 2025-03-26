import React from 'react';

const AlbumGrid = ({ albums }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {albums.map((album) => (
        <div 
          key={album.id}
          className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
          style={{ backgroundColor: album.bgColor }}
        >
          <img 
            src={album.image} 
            alt={album.name} 
            className="w-full aspect-square object-cover rounded-lg mb-4" 
          />
          <h3 className="text-white font-bold">{album.name}</h3>
          <p className="text-gray-400 text-sm mt-1">{album.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumGrid; 