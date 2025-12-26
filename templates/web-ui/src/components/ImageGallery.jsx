import React, { useState } from 'react';

const ImageGallery = ({ images = [], productName = '' }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const currentImage = images[selectedImage] || '/placeholder.jpg';

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square bg-jumia-light-gray rounded-lg overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="skeleton w-full h-full"></div>
        {isZoomed && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${currentImage})`,
              backgroundSize: '200%',
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-jumia-light-gray rounded-lg overflow-hidden border-2 transition ${
                selectedImage === index
                  ? 'border-jumia-orange'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <div className="skeleton w-full h-full"></div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Button */}
      <button
        onClick={() => {
          // TODO: Implement full lightbox modal
          console.log('Open lightbox');
        }}
        className="w-full py-2 border border-gray-300 rounded-lg hover:bg-jumia-light-gray transition text-sm font-medium"
      >
        View All Images
      </button>
    </div>
  );
};

export default ImageGallery;

