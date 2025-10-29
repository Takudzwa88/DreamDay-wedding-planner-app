import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Expense {
  id: number;
  category: string;
  item: string;
  estimated: number;
  actual: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export default function Budget() {
  const expenses: Expense[] = [
    {
      id: 1,
      category: 'Venue',
      item: 'Reception Hall Deposit',
      estimated: 4000,
      actual: 4000,
      status: 'Paid',
    },
    {
      id: 2,
      category: 'Catering',
      item: 'Food & Beverage Tasting',
      estimated: 500,
      actual: 500,
      status: 'Paid',
    },
    {
      id: 3,
      category: 'Photography',
      item: 'Engagement Shoot',
      estimated: 1000,
      actual: 1000,
      status: 'Paid',
    },
    {
      id: 4,
      category: 'Attire',
      item: 'Wedding Dress Alterations',
      estimated: 300,
      actual: 350,
      status: 'Pending',
    },
    {
      id: 5,
      category: 'Decorations',
      item: 'Floral Arrangements',
      estimated: 1200,
      actual: 1200,
      status: 'Paid',
    },
    {
      id: 6,
      category: 'Music',
      item: 'DJ Deposit',
      estimated: 250,
      actual: 250,
      status: 'Paid',
    },
    {
      id: 7,
      category: 'Transportation',
      item: 'Limo Rental',
      estimated: 600,
      actual: 0,
      status: 'Pending',
    },
    {
      id: 8,
      category: 'Stationery',
      item: 'Save-the-Dates',
      estimated: 200,
      actual: 220,
      status: 'Overdue',
    },
    {
      id: 9,
      category: 'Catering',
      item: 'Cake Design Fee',
      estimated: 800,
      actual: 800,
      status: 'Paid',
    },
    {
      id: 10,
      category: 'Attire',
      item: "Groom's Tuxedo Rental",
      estimated: 150,
      actual: 150,
      status: 'Pending',
    },
  ];

  const totalEstimated = expenses.reduce((sum, expense) => sum + expense.estimated, 0);
  const totalActual = expenses.reduce((sum, expense) => sum + expense.actual, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-pink-100 text-pink-700';
      case 'Pending':
        return 'bg-green-100 text-green-700';
      case 'Overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif text-gray-900 mb-2">Budget Overview</h1>
            <p className="text-gray-600">Track and manage your wedding expenses</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
            <Plus className="w-5 h-5" />
            Add New Expense
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Budget</h3>
            <p className="text-3xl font-bold text-gray-900">$25,000</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Spent</h3>
            <p className="text-3xl font-bold text-pink-300">${totalActual.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Remaining</h3>
            <p className="text-3xl font-bold text-green-600">
              ${(25000 - totalActual).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Detailed Expenses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Estimated
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actual
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{expense.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{expense.item}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${expense.estimated.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${expense.actual.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          expense.status
                        )}`}
                      >
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
