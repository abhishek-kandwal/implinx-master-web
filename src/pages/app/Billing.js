import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Sparkles,
  Check,
  AlertCircle,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Zap
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { PRICING_PLANS } from '../../config/pricing';
import { getActiveBillingProvider } from '../../services/billing';

export const Billing = () => {
  const { user, updateUserPlan, isDemo } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [activePlanId, setActivePlanId] = useState(user?.plan || 'free');
  const [checkoutNotice, setCheckoutNotice] = useState(null);

  const activeProvider = getActiveBillingProvider();
  const providerStatus = activeProvider.getStatus();

  const handlePlanSelect = async (planId) => {
    setActivePlanId(planId);

    // Call billing provider checkout interface
    const res = await activeProvider.openCheckout({
      planId,
      billingCycle: 'yearly',
      userEmail: user?.email,
      userId: user?.id
    });

    if (!res.success) {
      setCheckoutNotice({
        type: 'info',
        message: `${res.message} (In Demo mode, you can switch your active preview tier below).`
      });
      // In demo mode, allow evaluator to switch plan
      if (isDemo) {
        updateUserPlan(planId);
      }
    } else {
      setModalOpen(false);
    }
  };

  const currentPlan = PRICING_PLANS.find((p) => p.id === (user?.plan || 'free')) || PRICING_PLANS[0];

  return (
    <AppShell title="Billing & Subscriptions">
      <div style={{ maxWidth: '980px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header summary */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Subscription Overview</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your master subscription, payment methods, and ecosystem entitlements.
          </p>
        </div>

        {/* Notice banner if checkout attempted without live credentials */}
        {checkoutNotice && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-info-bg)',
              border: '1px solid var(--border-default)',
              color: 'var(--brand-primary)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{checkoutNotice.message}</span>
          </div>
        )}

        {/* Current Plan Card */}
        <Card style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
                Active Subscription
              </span>
              <h3 style={{ fontSize: '1.75rem', margin: 0 }}>{currentPlan.name}</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{currentPlan.tagline}</p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ${currentPlan.monthlyPrice}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                  {currentPlan.id === 'free' ? ' forever' : ' / month'}
                </span>
              </div>
              <span className="badge badge-success" style={{ marginTop: '0.35rem' }}>
                Status: Operational
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              background: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.75rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Next Renewal Date
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>
                {currentPlan.id === 'free' ? 'Never (Free Plan)' : 'October 17, 2026'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Billing Gateway
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>
                {providerStatus.provider} ({providerStatus.isConfigured ? 'Live' : 'Sandbox / Preview'})
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Seat Allocation
              </div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>
                1 Master User (Personal)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
              {currentPlan.id === 'free' ? 'Upgrade Plan' : 'Change Plan'}
            </Button>
            {isDemo && (
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  const nextPlan = currentPlan.id === 'pro' ? 'everything' : currentPlan.id === 'everything' ? 'free' : 'pro';
                  updateUserPlan(nextPlan);
                }}
              >
                <RefreshCw size={14} /> Quick Demo Toggle: Switch to {currentPlan.id === 'pro' ? 'Everything' : currentPlan.id === 'everything' ? 'Free' : 'Pro'}
              </Button>
            )}
          </div>
        </Card>

        {/* Enterprise / Billing Gateway Architecture Info */}
        <Card style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <ShieldCheck size={20} color="var(--brand-primary)" />
            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Secure Billing Architecture</h4>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            ImPlinx handles all financial transactions through PCI-DSS Level 1 certified billing aggregators (Stripe / Paddle / Razorpay). Payment lifecycle events are verified on the backend via cryptographic webhooks before updating user database entitlements. Client frontend code never processes or stores raw card data.
          </p>
        </Card>

        {/* Mock Invoices History */}
        <Card style={{ padding: '1.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Recent Invoices & Receipts</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Invoice</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Receipt</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>INV-2026-0881</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-secondary)' }}>Sep 17, 2026</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>${currentPlan.monthlyPrice} USD</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span className="badge badge-success">Paid</span>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                    <button
                      className="btn-ghost btn-sm"
                      style={{ padding: '0.2rem 0.5rem', color: 'var(--brand-primary)', fontSize: '0.8rem' }}
                      onClick={() => alert('Demo invoice: Official PDF receipts are generated on checkout completion.')}
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Change Plan Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Select Your ImPlinx Plan"
          maxWidth="640px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                style={{
                  border: plan.id === (user?.plan || 'free') ? '2px solid var(--brand-primary)' : '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  background: 'var(--bg-surface)',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{plan.name}</span>
                    {plan.id === (user?.plan || 'free') && (
                      <span className="badge badge-primary">Current Plan</span>
                    )}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    ${plan.monthlyPrice}
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {plan.tagline}
                </p>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </AppShell>
  );
};
