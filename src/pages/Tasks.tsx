import { useState } from 'react';
import { MoreHorizontal, Calendar } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  date: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  category: string;
  completed: boolean;
}

export default function Tasks() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'high'>('all');
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Pick Out Wedding Dress',
      date: 'September 15, 2024',
      priority: 'High Priority',
      category: 'Attire',
      completed: false,
    },
    {
      id: 2,
      title: 'Book Wedding Venue',
      date: 'October 20, 2024',
      priority: 'High Priority',
      category: 'Venue',
      completed: false,
    },
    {
      id: 3,
      title: 'Select Wedding Photographer',
      date: 'November 15, 2024',
      priority: 'Medium Priority',
      category: 'Photography',
      completed: false,
    },
    {
      id: 4,
      title: 'Choose Catering Menu',
      date: 'December 1, 2024',
      priority: 'High Priority',
      category: 'Catering',
      completed: false,
    },
    {
      id: 5,
      title: 'Finalize Guest List',
      date: 'December 20, 2024',
      priority: 'High Priority',
      category: 'Guests',
      completed: false,
    },
    {
      id: 6,
      title: 'Send Out Save-the-Dates',
      date: 'January 10, 2025',
      priority: 'Medium Priority',
      category: 'Guests',
      completed: true,
    },
    {
      id: 7,
      title: 'Decide on Wedding Favors',
      date: 'February 5, 2025',
      priority: 'Low Priority',
      category: 'Decorations',
      completed: false,
    },
    {
      id: 8,
      title: 'Order Wedding Cake',
      date: 'February 10, 2025',
      priority: 'Medium Priority',
      category: 'Catering',
      completed: false,
    },
    {
      id: 9,
      title: 'Hire a Wedding DJ',
      date: 'March 1, 2025',
      priority: 'Medium Priority',
      category: 'Music',
      completed: false,
    },
    {
      id: 10,
      title: 'Plan Honeymoon Itinerary',
      date: 'April 20, 2025',
      priority: 'Low Priority',
      category: 'Guests',
      completed: false,
    },
  ]);

  const filterButtons = [
    { label: 'All Tasks', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Completed', value: 'completed' },
    { label: 'High Priority', value: 'high' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High Priority':
        return 'text-red-600 bg-red-50';
      case 'Medium Priority':
        return 'text-orange-600 bg-orange-50';
      case 'Low Priority':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Wedding Tasks</h1>
        </div>

        <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
          {filterButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => setFilter(button.value as any)}
              className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === button.value
                  ? 'bg-pink-300 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-6 hover:bg-gray-50 transition-colors flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="w-5 h-5 rounded border-gray-300 text-pink-300 focus:ring-pink-300"
                />

                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{task.date}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {task.category}
                    </span>
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
