import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PORTFOLIO_DATA } from '../../api/mockData';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Retail Systems', 'Healthcare Tech', 'E-Commerce'];

  const filtered = selectedCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="md">GROUND DEPLOYMENTS</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            Client Success Stories &amp; Case Studies
          </h1>
          <p className="text-base text-neutral-muted leading-relaxed font-sans">
            Real deployments in Baruasagar, Jhansi, Mauranipur and across Bundelkhand with verified business results.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold uppercase tracking-wide px-3.5 py-1.5 rounded transition-all border ${
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

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <Card
              key={item.id}
              hover
              header={item.category}
              headerRight={
                <span className="flex items-center gap-1 text-[11px] font-bold text-neutral-muted">
                  <MapPin className="w-3 h-3 text-primary" />
                  {item.location}
                </span>
              }
              footer={
                <Link to="/contact" className="text-xs font-bold text-primary hover:underline flex items-center justify-between w-full">
                  <span>Replicate this for your business</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              }
            >
              <h3 className="font-serif font-bold text-xl text-neutral-dark mb-2">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-primary mb-3">
                Client: {item.client}
              </p>
              <p className="text-xs text-neutral-muted leading-relaxed mb-4">
                {item.summary}
              </p>
              <div className="p-3 bg-secondary/15 rounded border border-secondary/30 text-xs font-bold text-secondary-dark flex items-center gap-2">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span>Impact: {item.metrics}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
