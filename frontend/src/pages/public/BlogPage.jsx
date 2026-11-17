import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Clock } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { BLOG_POSTS_DATA } from '../../api/mockData';

export default function BlogPage() {
  return (
    <div className="py-12 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="primary" size="md">KNOWLEDGE LEDGER</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-dark tracking-tight leading-tight">
            Insights on Regional Business, Tax &amp; Technology
          </h1>
          <p className="text-base text-neutral-muted leading-relaxed font-sans">
            Plain-language guides written for store owners, entrepreneurs, and practitioners in Bundelkhand.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS_DATA.map((post) => (
            <article
              key={post.id}
              className="bg-surface-card rounded-lg border border-surface-border p-6 flex flex-col justify-between hover:shadow-tactile transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-muted mb-3">
                  <span className="uppercase tracking-wider text-primary">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h2 className="font-serif font-bold text-2xl text-neutral-dark hover:text-primary transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-neutral-muted leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs text-neutral-muted">
                <span className="flex items-center gap-1 font-medium">
                  <User className="w-3.5 h-3.5" />
                  {post.author}
                </span>
                <Link to={`/blog/${post.slug}`} className="font-bold text-primary hover:underline flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
