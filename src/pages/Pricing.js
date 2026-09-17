import React, { useState } from 'react';
import { Check, HelpCircle, ChevronDown, ChevronUp, Sparkles, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PRICING_PLANS, PRICING_FAQS } from '../config/pricing';

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                Simple, Transparent Pricing
              </span>
              <h1 className="display-2">Invest in your productivity.</h1>
              <p>
                Start free with core bookmarks. Upgrade to Pro or Everything when you need unlimited scale and multi-app power.
              </p>

              {/* Billing Cycle Toggle */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--bg-surface-subtle)',
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-default)',
                  marginTop: '2rem'
                }}
              >
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    background: billingCycle === 'monthly' ? 'var(--bg-surface)' : 'transparent',
                    color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: billingCycle === 'monthly' ? 'var(--shadow-xs)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Monthly billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    background: billingCycle === 'yearly' ? 'var(--bg-surface)' : 'transparent',
                    color: billingCycle === 'yearly' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: billingCycle === 'yearly' ? 'var(--shadow-xs)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span>Yearly billing</span>
                  <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '2rem',
                maxWidth: '1100px',
                margin: '0 auto 5rem auto'
              }}
            >
              {PRICING_PLANS.map((plan) => {
                const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

                return (
                  <Card
                    key={plan.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      border: plan.highlighted ? '2px solid var(--brand-primary)' : undefined,
                      boxShadow: plan.highlighted ? 'var(--shadow-lg)' : undefined
                    }}
                  >
                    {plan.badge && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--brand-primary)',
                          color: '#fff',
                          padding: '0.2rem 0.85rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em'
                        }}
                      >
                        {plan.badge}
                      </div>
                    )}

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>{plan.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{plan.tagline}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.75rem' }}>
                      <span style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        ${price}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {plan.id === 'free' ? 'forever' : billingCycle === 'yearly' ? '/ month, billed yearly' : '/ month'}
                      </span>
                    </div>

                    <Button
                      to={plan.ctaLink}
                      variant={plan.highlighted ? 'primary' : 'secondary'}
                      size="lg"
                      style={{ width: '100%', marginBottom: '2rem' }}
                    >
                      {plan.ctaText}
                    </Button>

                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      Included Features
                    </div>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                      {plan.features.map((feat, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.65rem',
                            fontSize: '0.875rem',
                            color: feat.included ? 'var(--text-primary)' : 'var(--text-muted)',
                            opacity: feat.included ? 1 : 0.5
                          }}
                        >
                          <Check
                            size={16}
                            color={feat.included ? 'var(--brand-primary)' : 'var(--border-strong)'}
                            style={{ flexShrink: 0, marginTop: '0.15rem' }}
                          />
                          <span style={{ textDecoration: feat.included ? 'none' : 'line-through' }}>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>

            {/* FAQs */}
            <div style={{ maxWidth: '780px', margin: '0 auto' }}>
              <div className="section-header" style={{ marginBottom: '2.5rem' }}>
                <h2>Frequently asked questions</h2>
                <p>Have questions about plans, security, or payment methods? We have answers.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {PRICING_FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <Card
                      key={idx}
                      style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}
                      onClick={() => toggleFaq(idx)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{faq.question}</span>
                        {isOpen ? <ChevronUp size={18} color="var(--brand-primary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                      </div>
                      {isOpen && (
                        <div style={{ marginTop: '0.85rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                          {faq.answer}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
