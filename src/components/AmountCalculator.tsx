import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Delete } from 'lucide-react';

interface AmountCalculatorProps {
  amount: number;
  setAmount: (amount: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const AmountCalculator: React.FC<AmountCalculatorProps> = ({
  amount,
  setAmount,
  onNext,
  onBack,
}) => {
  const [displayValue, setDisplayValue] = useState(amount > 0 ? amount.toString() : '0');

  const formatNumberWithCommas = (num: string): string => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNumberClick = (num: number) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num.toString());
    }
    setAmount(parseInt(displayValue === '0' ? num.toString() : displayValue + num.toString(), 10));
  };

  const handleDeleteClick = () => {
    if (displayValue.length === 1) {
      setDisplayValue('0');
      setAmount(0);
    } else {
      const newValue = displayValue.slice(0, -1);
      setDisplayValue(newValue);
      setAmount(parseInt(newValue, 10));
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setAmount(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">金額を入力</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="text-right text-3xl font-semibold">
            ¥{formatNumberWithCommas(displayValue)}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumberClick(num)}
              className="py-4 px-6 bg-white border border-gray-300 rounded-lg text-xl font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {num}
            </button>
          ))}
          
          <button
            type="button"
            onClick={handleClearClick}
            className="py-4 px-6 bg-white border border-gray-300 rounded-lg text-xl font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            C
          </button>
          
          <button
            type="button"
            onClick={() => handleNumberClick(0)}
            className="py-4 px-6 bg-white border border-gray-300 rounded-lg text-xl font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            0
          </button>
          
          <button
            type="button"
            onClick={handleDeleteClick}
            className="py-4 px-6 bg-white border border-gray-300 rounded-lg text-xl font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Delete className="h-6 w-6 mx-auto" />
          </button>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 flex items-center justify-center py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>戻る</span>
          </button>
          
          <button
            type="submit"
            disabled={amount <= 0}
            className="flex-1 flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            <span>次へ進む</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AmountCalculator;