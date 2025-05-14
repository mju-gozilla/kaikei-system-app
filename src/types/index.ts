export type Step = 'customer-name' | 'amount' | 'qr-code';

export interface PaymentData {
  customerName: string;
  amount: number;
  date: string;
}