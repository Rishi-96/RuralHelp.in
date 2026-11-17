import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowUpRight } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { BLOG_POSTS_DATA } from '../../api/mockData';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="py-12 space-y-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Knowledge Ledger</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 pb-8 border-b border-surface-border">
          <Badge variant="primary" size="md">{post.category}</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-muted pt-2 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4 text-primary" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-8 prose prose-neutral max-w-none text-neutral leading-relaxed space-y-6">
          <p className="text-lg font-serif italic text-neutral leading-relaxed bg-surface-subtle p-5 rounded border-l-4 border-primary">
            "{post.excerpt}"
          </p>

          <h2 className="font-serif text-2xl font-bold text-neutral-dark pt-4">
            1. The Problem with Traditional Paper Khatas
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            In most regional markets, shopkeepers rely on traditional bahi-khatas or spiral notebooks to track credit extended to regular customers. Over weeks and months, pages get soiled, amounts are miscalculated, and reminding a respected neighborhood customer over the phone can feel awkward.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            On average, an active wholesale or kirana store in Bundelkhand carries ₹2.5 to ₹6 Lakhs in untracked or delayed credit at any given time. This directly chokes working capital required to buy inventory from distributors.
          </p>

          <h2 className="font-serif text-2xl font-bold text-neutral-dark pt-4">
            2. How WhatsApp Automated Links Solve This Respectfully
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Modern POS software does not replace the human warmth of regional relationships—it supports it. When a bill is completed, a polite, automated WhatsApp summary is dispatched immediately with an itemized breakdown and a 1-click UPI QR code.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            Every Sunday evening, the system gently notifies customers with outstanding balances, showing their exact bill dates. Because the message is clearly automated from the store's verified business number, it removes personal embarrassment while dramatically boosting timely recovery.
          </p>

          <div className="my-8 p-6 bg-surface-card border-2 border-primary/20 rounded-lg shadow-tactile-sm">
            <h3 className="font-serif font-bold text-xl text-primary mb-2">
              Ready to implement this in your store?
            </h3>
            <p className="text-xs text-neutral-muted mb-4">
              RuralHelp installs the complete WhatsApp invoicing hardware and software on-site in Baruasagar or Jhansi.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="md" icon={ArrowUpRight} iconPosition="right">
                Schedule a Store Visit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
