import { PaddleProvider } from './PaddleProvider';
import { RazorpayProvider } from './RazorpayProvider';
import { StripeProvider } from './StripeProvider';

export const paddleProvider = new PaddleProvider();
export const razorpayProvider = new RazorpayProvider();
export const stripeProvider = new StripeProvider();

export const billingProviders = {
  paddle: paddleProvider,
  razorpay: razorpayProvider,
  stripe: stripeProvider
};

/**
 * Returns default active provider (configured via REACT_APP_BILLING_PROVIDER or defaults to stripe)
 */
export const getActiveBillingProvider = () => {
  const preferred = (process.env.REACT_APP_BILLING_PROVIDER || 'stripe').toLowerCase();
  return billingProviders[preferred] || stripeProvider;
};
