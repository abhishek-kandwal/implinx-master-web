import React, { useState } from 'react';
import { Mail, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="section-header">
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                Contact & Support
              </span>
              <h1 className="display-2">We'd love to hear from you.</h1>
              <p>Have a question about ImPlinx, need technical help, or want to suggest a feature?</p>
            </div>

            <Card style={{ padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Message Received</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Thank you for reaching out! A member of the ImPlinx product team will respond to <strong>{formData.email}</strong> shortly.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <Input
                      label="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Chen"
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                    />
                  </div>

                  <Input
                    label="Subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Feedback, Bug Report, or Enterprise Inquiry"
                  />

                  <div className="form-group">
                    <label className="form-label">Message <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <textarea
                      required
                      rows={5}
                      className="form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" style={{ width: '100%', marginTop: '0.75rem' }}>
                    Submit Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
