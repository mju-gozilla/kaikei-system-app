import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { formatDateToJapanese } from '../utils/formatters';
import { PaymentData } from '../types';

interface QRCodeDisplayProps {
  url: string;
  paymentData: PaymentData
  onBack: () => void;
  onRestart: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  url,
  paymentData,
  onBack,
  onRestart,
}) => {

  const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">決済QRコード</h2>
      
      <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm mb-6">
        <div className="flex flex-col items-center">
          <div className="mb-6 p-4 bg-white border-2 border-gray-200 rounded-lg">
            <QRCodeSVG
              value={url}
              size={200}
              level="M"
              className="mx-auto"
            />
          </div>
          
          <div className="w-full space-y-3 text-center">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600">顧客名:</span>
              <span className="font-medium">{paymentData.customerName}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600">金額:</span>
              <span className="font-medium">¥{formatNumberWithCommas((paymentData.amount*0.05) + paymentData.amount)}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-600">日付:</span>
              <span className="font-medium">{formatDateToJapanese(paymentData.date)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>戻る</span>
        </button>
        
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          <span>新規決済</span>
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;