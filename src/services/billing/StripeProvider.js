import { BillingProvider } from './BillingProvider';

export class StripeProvider extends BillingProvider {
  constructor() {
    super('Stripe');
    this.publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || null;
  }

  async initialize() {
    return Boolean(this.publishableKey);
  }

  async openCheckout({ planId, billingCycle, userEmail, userId }) {
    if (!this.publishableKey) {
      return {
        success: false,
        message: 'Stripe is in demonstration mode. Configure REACT_APP_STRIPE_PUBLISHABLE_KEY for live sessions.'
      };
    }
    return { success: true };
  }

  async openCustomerPortal(customerId) {
    return {
      success: false,
      message: 'Stripe billing portal requires server-created session URL.'
    };
  }

  getStatus() {
    return {
      provider: this.name,
      isConfigured: Boolean(this.publishableKey),
      environment: process.env.NODE_ENV === 'production' ? 'live' : 'test'
    };
  }
}
