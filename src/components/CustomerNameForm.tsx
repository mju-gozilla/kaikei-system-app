import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CustomerNameFormProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  onNext: () => void;
}

const CustomerNameForm: React.FC<CustomerNameFormProps> = ({
  customerName,
  setCustomerName,
  onNext,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim()) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">名前を入力</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
            名前
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="例: 山田太郎"
            autoFocus
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={!customerName.trim()}
          className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          <span>次へ進む</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default CustomerNameForm;