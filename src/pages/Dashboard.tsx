import { Receipt, CheckCircle2, Users, Calendar } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-3">Your Wedding at a Glance</h1>
          <p className="text-gray-600">
            A comprehensive overview of your planning progress, ensuring every detail is perfectly managed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-pink-300 mb-2">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-pink-300">$15,000</div>
              <p className="text-sm text-gray-600">spent of $25,000 total</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-pink-300 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600">60% Allocated</p>
              <button className="w-full mt-4 px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-green-500 mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-green-500">3</div>
              <p className="text-sm text-gray-600">tasks due soon</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700">Finalize Venue (May 10)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700">Book Photographer (May 20)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700">Send Save-the-Dates (Jun 01)</span>
                </li>
              </ul>
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Manage Tasks
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-pink-300 mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Guest List Status</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-pink-300">120</div>
              <p className="text-sm text-gray-600">RSVPs received of 180 invited</p>
              <p className="text-sm text-gray-700 font-medium">
                60 guests still pending response.
              </p>
              <button className="w-full mt-4 px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
                View Guest List
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-pink-300 mb-2">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">The Big Day</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-pink-300">185</div>
              <p className="text-sm text-gray-600">Days Left!</p>
              <p className="text-sm text-gray-700 font-medium">
                Wedding date: June 15, 2025
              </p>
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Wedding Timeline
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-700">Marked "Book Wedding Venue" as completed</p>
              <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-700">Added new expense: Reception Hall Deposit - $4,000</p>
              <span className="ml-auto text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-gray-100">
              <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
              <p className="text-gray-700">Received 15 new RSVPs</p>
              <span className="ml-auto text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
