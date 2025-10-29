import { Heart } from 'lucide-react';

export default function Gallery() {
  const photos = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding ceremony',
      category: 'Ceremony',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding rings',
      category: 'Details',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Bridal bouquet',
      category: 'Florals',
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Outdoor ceremony setup',
      category: 'Venue',
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding cake',
      category: 'Reception',
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/265705/pexels-photo-265705.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Couple portrait',
      category: 'Portraits',
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Table setting',
      category: 'Reception',
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'First dance',
      category: 'Reception',
    },
    {
      id: 9,
      url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding dress',
      category: 'Details',
    },
    {
      id: 10,
      url: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Ceremony arch',
      category: 'Ceremony',
    },
    {
      id: 11,
      url: 'https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Champagne toast',
      category: 'Reception',
    },
    {
      id: 12,
      url: 'https://images.pexels.com/photos/1857075/pexels-photo-1857075.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Wedding shoes',
      category: 'Details',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Wedding Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Inspiration for your perfect day. Browse through beautiful wedding moments and ideas to
            help plan your celebration.
          </p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['All', 'Ceremony', 'Reception', 'Details', 'Florals', 'Venue', 'Portraits'].map(
            (category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-medium mb-1">{photo.alt}</p>
                  <p className="text-sm text-gray-200">{photo.category}</p>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-pink-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
            Load More Photos
          </button>
        </div>
      </div>
    </div>
  );
}
