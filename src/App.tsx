import React, { useEffect, useState } from 'react';
import CustomerNameForm from './components/CustomerNameForm';
import AmountCalculator from './components/AmountCalculator';
import QRCodeDisplay from './components/QRCodeDisplay';
import ProgressIndicator from './components/ProgressIndicator';
import { CreditCard } from 'lucide-react';
import { Step, PaymentData } from './types';
import NowLoading from './components/NowLoading';
import generateQR from './lib/generateQR';
import Passcode from './components/Passcord';
function App() {
  const [currentStep, setCurrentStep] = useState<Step>('customer-name');
  const [customerName, setCustomerName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const gqr = generateQR();
  
  const paymentData: PaymentData = {
    customerName,
    amount,
    date: new Date().toISOString(),
  };

  useEffect(() => {
    if (url) {
      console.log('QR Code URL:', url);
      setIsLoading(false);
      setCurrentStep('qr-code');
    }
  },[url]);

  const goToPayment = async () => {
    setIsLoading(true);
    const commision = 0.05;
    const totalAmount = amount + (amount * commision);
    const rawUrl = await gqr.createPayment(customerName, totalAmount.toString());
    setUrl(rawUrl);
  }
  
  const goToNextStep = () => {
    if (currentStep === 'customer-name') {
      setCurrentStep('amount');
    } else if (currentStep === 'amount') {
      setCurrentStep('qr-code');
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep === 'amount') {
      setCurrentStep('customer-name');
    } else if (currentStep === 'qr-code') {
      setCurrentStep('amount');
    }
  };
  
  const resetForm = () => {
    setCurrentStep('customer-name');
    setCustomerName('');
    setAmount(0);
  };

  const onUnlock = () => {
    setIsLocked(false);
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isLocked && <Passcode onUnlock={onUnlock} />}
      {isLoading && <NowLoading />}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <CreditCard className="h-7 w-7 text-blue-600 mr-3" />
          <h1 className="text-xl font-bold text-gray-900">シンプルクレジット</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <ProgressIndicator currentStep={currentStep} />
        
        <div className="animation-fade-in">
          {currentStep === 'customer-name' && (
            <CustomerNameForm
              customerName={customerName}
              setCustomerName={setCustomerName}
              onNext={goToNextStep}
            />
          )}
          
          {currentStep === 'amount' && (
            <AmountCalculator
              amount={amount}
              setAmount={setAmount}
              onNext={goToPayment}
              onBack={goToPreviousStep}
            />
          )}
          
          {currentStep === 'qr-code' && (
            <QRCodeDisplay
              url={url}
              paymentData={paymentData}
              onBack={goToPreviousStep}
              onRestart={resetForm}
            />
          )}
        </div>
      </main>
      
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MJ Studio
        </div>
      </footer>
    </div>
  );
}

export default App;