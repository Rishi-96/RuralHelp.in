export const SERVICES_DATA = [
  {
    id: 1,
    title: "Custom Business Software",
    slug: "custom-software",
    category: "Software Development",
    shortDescription: "Tailored software built specifically for your regional business workflows, inventory, and staff management.",
    fullDescription: "Standard SaaS software is often too complex, too expensive, and built for metropolitan corporations. We build grounded, high-speed custom software that fits exactly how you run your store, warehouse, or enterprise in Bundelkhand.",
    features: [
      "Offline-first architecture for unreliable internet",
      "Multi-user role access (Cashier, Manager, Owner)",
      "Daily profit/loss ledgers and tax reconciliation",
      "Custom barcode scanning and thermal printer integration",
      "Hindi & English bilingual UI options"
    ],
    processSteps: [
      { step: "01", title: "On-site Workflow Audit", description: "We visit your shop or office in Baruasagar/Jhansi to understand your exact manual register processes." },
      { step: "02", title: "Rapid Prototype", description: "We deliver a working model within 7 days matching your local terminology." },
      { step: "03", title: "Staff Hands-On Training", description: "We train your operators and cashiers in person until they are 100% confident." },
      { step: "04", title: "Local Support & Updates", description: "Direct on-call and on-site support whenever hardware or tax rules change." }
    ],
    icon: "Code",
    isFeatured: true
  },
  {
    id: 2,
    title: "WhatsApp AI & Automation",
    slug: "whatsapp-automation",
    category: "Automation & AI",
    shortDescription: "Automate customer orders, reminders, balance dues, and payment links straight on WhatsApp.",
    fullDescription: "Your customers already live on WhatsApp. Turn it into your most profitable sales channel. Automatically dispatch invoice PDFs, send gentle payment reminders, and let customers place repeat orders through an AI assistant.",
    features: [
      "Automated udhaar/credit reminder alerts with UPI links",
      "Instant PDF invoice sending upon sale",
      "Auto-reply catalog for customer inquiries 24/7",
      "Official Meta WhatsApp Business API verification",
      "Bulk broadcast campaigns for festival promotions"
    ],
    processSteps: [
      { step: "01", title: "Number Setup & Meta Verification", description: "We register and verify your official green-tick business account." },
      { step: "02", title: "Template & Bot Configuration", description: "We script customer conversation flows in Hindi and English." },
      { step: "03", title: "Billing System Hookup", description: "Link automated messaging to your sales and POS software." }
    ],
    icon: "MessageSquare",
    isFeatured: true
  },
  {
    id: 3,
    title: "Billing & GST POS Systems",
    slug: "billing-inventory",
    category: "Retail Systems",
    shortDescription: "Lightning-fast barcode billing, GST compliant invoicing, and live stock tracking for retailers.",
    fullDescription: "Stop losing revenue to stock leakages and manual handwriting errors. Our point-of-sale systems run on standard desktop PCs or budget tablets, delivering 3-second billing speed even during peak festival rushes.",
    features: [
      "3-second barcode billing with thermal receipt generation",
      "Automated GSTR-1 and GSTR-3B tax export reports",
      "Low-stock SMS and WhatsApp alerts",
      "Batch, expiry, and MRP tracking for pharma and grocery",
      "Customer ledger (Udhaar khata) with automated reminders"
    ],
    processSteps: [
      { step: "01", title: "Inventory Catalog Digitization", description: "We scan and enter your entire stock inventory into the database." },
      { step: "02", title: "Hardware Hookup", description: "Setup barcode scanner, cash drawer, and thermal printer." },
      { step: "03", title: "Go-Live Assistance", description: "Our team stands beside your cashier on day one to handle customer flow." }
    ],
    icon: "Receipt",
    isFeatured: true
  },
  {
    id: 4,
    title: "Clinic & OPD Management",
    slug: "clinic-management",
    category: "Healthcare Tech",
    shortDescription: "Smart digital prescription, patient appointment queue, and lab test reporting for regional doctors.",
    fullDescription: "Designed with senior practitioners in Bundelkhand to eliminate chaotic waiting rooms, preserve clean medical history, and issue digital printed prescriptions in under 45 seconds.",
    features: [
      "Token display system for organized OPD waiting halls",
      "One-click prescription templates for common diagnoses",
      "Patient WhatsApp notifications for token status",
      "Integrated pathology lab reporting & WhatsApp sharing",
      "Comprehensive patient medical history at a glance"
    ],
    processSteps: [
      { step: "01", title: "Clinic Workflow Setup", description: "Configure OPD timings, doctor schedules, and custom prescription headers." },
      { step: "02", title: "Receptionist Training", description: "Teach staff how to issue tokens in 10 seconds." }
    ],
    icon: "Activity",
    isFeatured: false
  },
  {
    id: 5,
    title: "Coaching Institute ERP",
    slug: "coaching-erp",
    category: "EdTech",
    shortDescription: "Biometric student attendance, fee installment collection, and parent SMS updates for academies.",
    fullDescription: "Streamline your academy's administration. Eliminate manual fee registers, track overdue installments effortlessly, and notify parents the moment their child enters the classroom.",
    features: [
      "Biometric fingerprint / RFID card attendance",
      "Automated fee installment dues alerts with UPI QR codes",
      "Test score entry and rank card generation",
      "Parent mobile portal for homework and progress tracking",
      "Batch allocation and timetable management"
    ],
    processSteps: [
      { step: "01", title: "Batch & Student Migration", description: "Import all current students and fee schedules." },
      { step: "02", title: "Attendance Hardware Installation", description: "Mount and configure biometric turnstile/devices." }
    ],
    icon: "GraduationCap",
    isFeatured: false
  },
  {
    id: 6,
    title: "Modern Website & App Development",
    slug: "website-development",
    category: "Web & Mobile",
    shortDescription: "Ultra-fast, mobile-optimized business websites and customer ordering apps that rank #1 on Google.",
    fullDescription: "Put your business firmly on the digital map. When customers search for products in Jhansi, Baruasagar, or Gwalior, your verified website and Google Maps profile should stand out.",
    features: [
      "Blazing-fast load times on 3G and rural networks",
      "Google Business Profile & Local Maps SEO optimization",
      "Direct Click-to-Call and WhatsApp Inquiry widgets",
      "Integrated product gallery and quotation request forms",
      "Full ownership with zero hidden monthly lock-ins"
    ],
    processSteps: [
      { step: "01", title: "Photography & Content Capture", description: "We visit and take professional high-res photos of your store/facility." },
      { step: "02", title: "Design & Custom Development", description: "Built using modern React for instant page loads." },
      { step: "03", title: "Launch & Google Verification", description: "Verification on Google Maps and search engines." }
    ],
    icon: "Globe",
    isFeatured: true
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    clientName: "Rameshwar Dayal Gupta",
    clientRole: "Proprietor",
    companyName: "Gupta Wholesale Kirana, Baruasagar",
    content: "Pehle festival season me bill banane me 15 minute lagte the aur line bahar tak chali jaati thi. RuralHelp ne barcode billing lagayi, ab 20 second me bill nikalta hai aur WhatsApp par bhi chala jaata hai. Udhaar ka paisa bhi time par aane laga hai.",
    rating: 5,
    location: "Baruasagar, Jhansi",
    impact: "+35% Faster Checkout, 0 Billing Errors"
  },
  {
    id: 2,
    clientName: "Dr. Arvind Srivastav",
    clientRole: "Chief Medical Officer",
    companyName: "Bundelkhand PolyClinic, Jhansi",
    content: "Hamare clinic me patient ki bheed manage karna mushkil ho gaya tha. RuralHelp ke OPD token system aur digital prescription software ne pura mahaul badal diya. Patients respect ke saath wait karte hain aur purani report 1 click me mil jaati hai.",
    rating: 5,
    location: "Elite Crossing, Jhansi",
    impact: "60% Reduction in Patient Waiting Time"
  },
  {
    id: 3,
    clientName: "Sunita Verma",
    clientRole: "Founder & Director",
    companyName: "Prerna Coaching Classes, Baruasagar",
    content: "Fee collection register me likhte-likhte pareshan rehte the. RuralHelp ne biometric attendance lagaya aur parents ko automatic WhatsApp message jata hai. Fee collection ab 95% on-time ho gaya hai.",
    rating: 5,
    location: "Baruasagar",
    impact: "95% On-Time Fee Collection"
  }
];

export const STATS_DATA = [
  { label: "Regional Businesses Empowered", value: "140+", change: "+45 this year" },
  { label: "Daily Transactions Processed", value: "₹38 Lakhs+", change: "Zero downtime" },
  { label: "Bundelkhand Towns Active", value: "12", change: "Baruasagar, Jhansi, Mauranipur..." },
  { label: "Client Retention Rate", value: "98.4%", change: "Local in-person support" }
];

export const BLOG_POSTS_DATA = [
  {
    id: 1,
    title: "How Small Shopkeepers in Baruasagar Are Recovering ₹2+ Lakhs in Udhaar Using WhatsApp Automation",
    slug: "recovering-udhaar-whatsapp-automation",
    excerpt: "Manual telephone calls to remind customers of pending ledger balances often lead to awkward relations. Here is how polite automated WhatsApp reminders are delivering 85% collection rates.",
    date: "November 12, 2026",
    readTime: "4 min read",
    category: "Retail Tech",
    author: "Rishi & Tech Team"
  },
  {
    id: 2,
    title: "GST 2026 Mandates for Tier-3 Retailers: What Bundelkhand MSMEs Must Know",
    slug: "gst-2026-mandates-tier-3-retailers",
    excerpt: "A simple, non-legal guide for shop owners on upcoming electronic invoice regulations and how modern POS software keeps you fully compliant without heavy accountant fees.",
    date: "October 28, 2026",
    readTime: "6 min read",
    category: "Compliance & Tax",
    author: "CA Advisory Group"
  },
  {
    id: 3,
    title: "Why Generic SaaS Tools Fail Regional Businesses: The Case for Offline-First Architecture",
    slug: "why-generic-saas-fails-regional-businesses",
    excerpt: "When power cuts or fiber cuts happen in regional towns, cloud-only POS systems shut down. Here is how our dual-cache local database guarantees continuous billing.",
    date: "October 14, 2026",
    readTime: "5 min read",
    category: "Engineering Insights",
    author: "RuralHelp Engineering"
  }
];

export const PORTFOLIO_DATA = [
  {
    id: 1,
    title: "Complete Digitization of 3-Floor Hardware & Sanitary Showroom",
    slug: "jhansi-hardware-digitization",
    client: "Shri Balaji Sanitary & Pipe Store",
    location: "Jhansi Bypass",
    category: "Retail Systems",
    summary: "Implemented 4-counter networked POS, 18,000 SKU barcode cataloging, and vendor purchase order automation.",
    metrics: "Reduced inventory discrepancy from 14% to 0.4%"
  },
  {
    id: 2,
    title: "Smart OPD & Pathology Lab Sync for 50-Bed Maternity Hospital",
    slug: "maternity-hospital-opd-sync",
    client: "Vatsalya Hospital & Research Center",
    location: "Baruasagar",
    category: "Healthcare Tech",
    summary: "Integrated patient registration, doctor prescription tablets, sonography report generation, and automated WhatsApp patient updates.",
    metrics: "Issued over 25,000 digital records with zero paper loss"
  },
  {
    id: 3,
    title: "Omnichannel Ordering App for Organic Bundelkhand Jaggery Producers",
    slug: "bundelkhand-jaggery-app",
    client: "Bhoomi Krishi FPO",
    location: "Mauranipur / Jhansi",
    category: "E-Commerce",
    summary: "Built farmer-direct marketplace connecting regional producers with bulk buyers across Uttar Pradesh and Delhi-NCR.",
    metrics: "₹42 Lakhs direct farmer transactions in first season"
  }
];
