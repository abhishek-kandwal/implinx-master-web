/**
 * Abstract Billing Provider Interface
 *
 * ImPlinx Billing Architecture Principles:
 * 1. The frontend never decides payment success directly.
 * 2. Checkout is initiated via provider overlay or redirect to a secure session created by server.
 * 3. Payment lifecycle events (subscription_created, payment_succeeded, subscription_canceled)
 *    are handled server-side by webhooks verifying provider signatures.
 * 4. Database tables (`subscriptions`, `entitlements`) are updated strictly via authenticated
 *    server webhooks / Supabase Edge Functions.
 */

export class BillingProvider {
  constructor(name) {
    this.name = name;
  }

  /**
   * Initializes client SDK if required (e.g. Paddle.js or Razorpay.js)
   */
  async initialize() {
    throw new Error('initialize() must be implemented by concrete billing provider');
  }

  /**
   * Starts checkout flow for a specific plan
   * @param {Object} options - { planId, billingCycle, userEmail, userId }
   */
  async openCheckout(options) {
    throw new Error('openCheckout() must be implemented by concrete billing provider');
  }

  /**
   * Opens customer self-service portal to update card or cancel subscription
   * @param {string} customerId
   */
  async openCustomerPortal(customerId) {
    throw new Error('openCustomerPortal() must be implemented by concrete billing provider');
  }

  /**
   * Returns metadata and status of provider configuration
   */
  getStatus() {
    return {
      provider: this.name,
      isConfigured: false,
      mode: 'mock'
    };
  }
}
