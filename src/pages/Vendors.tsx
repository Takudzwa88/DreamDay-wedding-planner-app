import { Star, MapPin, Phone, Mail } from 'lucide-react';

interface Vendor {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  image: string;
  description: string;
}

export default function Vendors() {
  const vendors: Vendor[] = [
    {
      id: 1,
      name: 'Elegant Venues Co.',
      category: 'Venue',
      rating: 4.9,
      reviews: 127,
      location: 'Downtown',
      phone: '(555) 123-4567',
      email: 'info@elegantvenues.com',
      image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Beautiful ceremony and reception spaces for your special day.',
    },
    {
      id: 2,
      name: 'Gourmet Catering',
      category: 'Catering',
      rating: 4.8,
      reviews: 89,
      location: 'Midtown',
      phone: '(555) 234-5678',
      email: 'contact@gourmetcatering.com',
      image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Exquisite culinary experiences tailored to your taste.',
    },
    {
      id: 3,
      name: 'Perfect Moments Photography',
      category: 'Photography',
      rating: 5.0,
      reviews: 156,
      location: 'Citywide',
      phone: '(555) 345-6789',
      email: 'book@perfectmoments.com',
      image: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Capturing your love story with artistic vision.',
    },
    {
      id: 4,
      name: 'Bloom & Petal Florists',
      category: 'Florist',
      rating: 4.7,
      reviews: 92,
      location: 'Garden District',
      phone: '(555) 456-7890',
      email: 'orders@bloomandpetal.com',
      image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Stunning floral arrangements for every wedding style.',
    },
    {
      id: 5,
      name: 'Sweet Dreams Bakery',
      category: 'Baker',
      rating: 4.9,
      reviews: 134,
      location: 'Old Town',
      phone: '(555) 567-8901',
      email: 'info@sweetdreamsbakery.com',
      image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Custom wedding cakes that taste as good as they look.',
    },
    {
      id: 6,
      name: 'Rhythm & Beats DJ Service',
      category: 'Entertainment',
      rating: 4.8,
      reviews: 78,
      location: 'Various Locations',
      phone: '(555) 678-9012',
      email: 'bookings@rhythmbeats.com',
      image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Keep your guests dancing all night long.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Wedding Vendors</h1>
          <p className="text-gray-600">
            Find trusted professionals to bring your wedding vision to life
          </p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['All', 'Venue', 'Catering', 'Photography', 'Florist', 'Baker', 'Entertainment'].map(
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{vendor.name}</h3>
                    <span className="text-sm text-pink-300 font-medium">{vendor.category}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{vendor.rating}</span>
                    <span className="text-sm text-gray-500">({vendor.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{vendor.email}</span>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
                  Contact Vendor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
