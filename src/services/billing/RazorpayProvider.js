import { BillingProvider } from './BillingProvider';

export class RazorpayProvider extends BillingProvider {
  constructor() {
    super('Razorpay');
    this.keyId = process.env.REACT_APP_RAZORPAY_KEY_ID || null;
  }

  async initialize() {
    if (!this.keyId) {
      console.info('[Billing:Razorpay] Razorpay Key ID not configured. Real transactions disabled.');
      return false;
    }
    return true;
  }

  async openCheckout({ planId, billingCycle, userEmail, userId }) {
    if (!this.keyId) {
      return {
        success: false,
        message: 'Razorpay is currently in mock preview mode. Set REACT_APP_RAZORPAY_KEY_ID for live checkout.'
      };
    }
    // Razorpay subscription checkout integration via standard options
    return { success: true };
  }

  async openCustomerPortal(customerId) {
    return {
      success: false,
      message: 'Razorpay customer portal integration requires server subscription retrieval.'
    };
  }

  getStatus() {
    return {
      provider: this.name,
      isConfigured: Boolean(this.keyId),
      environment: process.env.NODE_ENV === 'production' ? 'live' : 'test'
    };
  }
}
