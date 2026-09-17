import { BillingProvider } from './BillingProvider';

export class PaddleProvider extends BillingProvider {
  constructor() {
    super('Paddle');
    this.vendorId = process.env.REACT_APP_PADDLE_VENDOR_ID || null;
    this.isSandbox = process.env.NODE_ENV !== 'production';
  }

  async initialize() {
    if (!this.vendorId) {
      console.info('[Billing:Paddle] Paddle Vendor ID not configured. Real transactions disabled.');
      return false;
    }
    // In production: load Paddle.js script and initialize Paddle.Environment.set('sandbox' | 'production')
    return true;
  }

  async openCheckout({ planId, billingCycle, userEmail, userId }) {
    if (!this.vendorId) {
      return {
        success: false,
        message: 'Paddle is in demonstration mode. Configure REACT_APP_PADDLE_VENDOR_ID for live checkouts.'
      };
    }
    // Trigger Paddle.Checkout.open({ items: [...] })
    return { success: true };
  }

  async openCustomerPortal(customerId) {
    return {
      success: false,
      message: 'Customer portal requires live Paddle webhook and subscriber verification.'
    };
  }

  getStatus() {
    return {
      provider: this.name,
      isConfigured: Boolean(this.vendorId),
      environment: this.isSandbox ? 'sandbox' : 'production'
    };
  }
}
