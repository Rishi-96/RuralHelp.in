import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Filter } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { SERVICES_DATA } from '../../api/mockData';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Software Development', 'Automation & AI', 'Retail Systems', 'Healthcare Tech', 'EdTech', 'Web & Mobile'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="md">SERVICE CATALOG</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            Pragmatic Digital Solutions for Every Small Enterprise
          </h1>
          <p className="text-base text-neutral-muted leading-relaxed font-sans">
            Every service we deliver is deployed with physical on-site installation, local operator training, and continuous support across Bundelkhand.
          </p>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-neutral uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold uppercase tracking-wide px-3.5 py-1.5 rounded transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary shadow-tactile-sm'
                  : 'bg-surface-card text-neutral-muted border-surface-border hover:bg-surface-subtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              hover
              header={service.category}
              headerRight={service.isFeatured ? <Badge variant="success" size="sm">POPULAR</Badge> : null}
              footer={
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-bold text-primary hover:text-primary-dark flex items-center justify-between w-full"
                >
                  <span>Explore Features &amp; Implementation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              }
            >
              <h3 className="font-serif font-bold text-2xl text-neutral-dark mb-2">
                {service.title}
              </h3>
              <p className="text-xs text-neutral-muted leading-relaxed mb-6">
                {service.shortDescription}
              </p>

              <div className="space-y-2 pt-4 border-t border-surface-border text-xs text-neutral">
                <p className="font-bold uppercase tracking-wider text-[10px] text-neutral-muted">
                  Key Capabilities:
                </p>
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary-dark shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-subtle p-8 rounded-lg border border-surface-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-neutral-dark">
              Need a Custom Solution Not Listed Here?
            </h3>
            <p className="text-xs text-neutral-muted mt-1">
              We design specialized workflows for grain mandis, cold storages, transport fleets, and regional factories.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="secondary" size="md">
              Discuss Custom Requirement
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
