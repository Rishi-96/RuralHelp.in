import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Store 
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import { SERVICES_DATA } from '../../api/mockData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    business_name: '',
    business_type: '',
    service_id: '',
    project_description: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const businessTypes = [
    { value: 'retail_kirana', label: 'Retail / Kirana / Supermarket' },
    { value: 'clinic_healthcare', label: 'Clinic / Hospital / Pathology' },
    { value: 'coaching_school', label: 'Coaching Institute / School' },
    { value: 'manufacturing_handloom', label: 'Small Factory / Handloom / Artisan' },
    { value: 'hardware_sanitary', label: 'Hardware / Sanitary / Electric Store' },
    { value: 'transport_logistics', label: 'Transport / Warehouse / Logistics' },
    { value: 'restaurant_hotel', label: 'Restaurant / Hotel / Sweet Shop' },
    { value: 'other', label: 'Other Business Type' },
  ];

  const serviceOptions = SERVICES_DATA.map((s) => ({
    value: s.title,
    label: s.title,
  }));

  const validate = () => {
    const err = {};
    if (!formData.customer_name.trim()) err.customer_name = 'Customer name is required';
    if (!formData.phone.trim()) {
      err.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      err.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Please enter a valid email address';
    }
    if (!formData.business_name.trim()) err.business_name = 'Business name is required';
    if (!formData.business_type) err.business_type = 'Please select your business type';
    if (!formData.project_description.trim()) {
      err.project_description = 'Please tell us briefly what you want to improve or automate';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Attempt backend POST if running, or save in localStorage leads queue
      const existingLeads = JSON.parse(localStorage.getItem('ruralhelp_offline_leads') || '[]');
      const newLead = {
        ...formData,
        id: Date.now(),
        status: 'New',
        created_at: new Date().toISOString(),
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('ruralhelp_offline_leads', JSON.stringify(existingLeads));

      // Attempt API call in background
      try {
        await fetch('http://localhost:8000/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        // Fallback to offline store gracefully
      }

      setSubmitted(true);
      setFormData({
        customer_name: '',
        email: '',
        phone: '',
        business_name: '',
        business_type: '',
        service_id: '',
        project_description: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="md">DIRECT CONTACT &amp; ON-SITE VISIT</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            Schedule a Store Visit or In-Person Consultation
          </h1>
          <p className="text-base text-neutral-muted leading-relaxed font-sans">
            Have questions about billing machines, WhatsApp automation, or custom software? Fill out the ledger form below or call our Baruasagar field team directly.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Field Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-card p-6 rounded-lg border border-surface-border shadow-tactile-sm space-y-6">
              <h2 className="font-serif font-bold text-2xl text-primary border-b border-surface-border pb-3">
                Bundelkhand Operations Center
              </h2>

              <div className="space-y-4 text-xs text-neutral">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm text-neutral-dark">Main Office &amp; Training Lab:</strong>
                    <p className="text-neutral-muted leading-relaxed mt-0.5">
                      Station Road, Near Bank of Baroda,<br />
                      Baruasagar, Jhansi District,<br />
                      Uttar Pradesh — 284201
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm text-neutral-dark">Helpline &amp; WhatsApp:</strong>
                    <p className="text-neutral-muted leading-relaxed mt-0.5">
                      +91 79050 00000<br />
                      +91 94500 00000 (Hindi / Bundelkhandi)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm text-neutral-dark">Official Email:</strong>
                    <p className="text-neutral-muted leading-relaxed mt-0.5">
                      contact@ruralhelp.in<br />
                      support@ruralhelp.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm text-neutral-dark">Support Hours:</strong>
                    <p className="text-neutral-muted leading-relaxed mt-0.5">
                      Monday to Saturday: 8:00 AM – 8:30 PM<br />
                      Sunday: On-call emergency retail support
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface-subtle rounded border border-surface-border text-xs space-y-1">
                <span className="font-bold text-secondary-dark flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Free 48-Hour Field Service Guarantee
                </span>
                <p className="text-neutral-muted">
                  For registered clients in Jhansi and Baruasagar, any critical hardware or software failure receives on-site engineer visit within 4 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-card p-6 sm:p-8 rounded-lg border-2 border-surface-border shadow-tactile">
              <div className="border-b border-surface-border pb-4 mb-6">
                <h2 className="font-serif font-bold text-2xl text-neutral-dark">
                  Business Transformation Enquiry Form
                </h2>
                <p className="text-xs text-neutral-muted mt-1">
                  Tell us about your store, clinic, or enterprise. We will schedule a physical demo.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-secondary/15 border border-secondary/40 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-secondary-dark mx-auto" />
                  <h3 className="font-serif font-bold text-2xl text-neutral-dark">
                    Enquiry Registered Successfully!
                  </h3>
                  <p className="text-sm text-neutral leading-relaxed max-w-md mx-auto">
                    Thank you! Our Baruasagar field coordinator has received your details and will call you within 2 working hours to confirm an on-site visit.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setSubmitted(false)}
                    className="mt-2"
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Customer / Owner Name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="e.g. Rameshwar Dayal Gupta"
                      required
                      error={errors.customer_name}
                    />

                    <Input
                      label="WhatsApp / Mobile Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      required
                      error={errors.phone}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Business / Firm Name"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="e.g. Gupta Wholesale Kirana"
                      required
                      error={errors.business_name}
                    />

                    <Input
                      label="Email Address (Optional)"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@guptakirana.com"
                      error={errors.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Business Category"
                      name="business_type"
                      value={formData.business_type}
                      onChange={handleChange}
                      options={businessTypes}
                      required
                      placeholder="Select business type"
                      error={errors.business_type}
                    />

                    <Select
                      label="Required Service"
                      name="service_id"
                      value={formData.service_id}
                      onChange={handleChange}
                      options={serviceOptions}
                      placeholder="Select a service"
                    />
                  </div>

                  <Textarea
                    label="What is your biggest manual hassle or goal?"
                    name="project_description"
                    value={formData.project_description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g. We want to start barcode billing for 3,000 items, reduce billing queue, and automate udhaar balance reminders on WhatsApp..."
                    required
                    error={errors.project_description}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      className="w-full sm:w-auto"
                      icon={Send}
                      iconPosition="right"
                    >
                      Submit Enquiry to Field Team
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
