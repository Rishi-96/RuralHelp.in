from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models import (
    User, Role, Service, ServiceCategory, Lead, LeadNote, 
    LeadActivity, Project, Testimonial, BlogPost, ContactMessage
)
from app.auth.security import get_password_hash
from app.routes import auth, public, admin_leads

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for RuralHelp Digital Transformation Platform (Baruasagar / Jhansi / Bundelkhand)",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(public.router)
app.include_router(auth.router)
app.include_router(admin_leads.router)

# Seed initial system data if not already present
@app.on_event("startup")
def seed_database():
    db = SessionLocal()
    try:
        # 1. Seed Roles
        admin_role = db.query(Role).filter(Role.name == "Super Admin").first()
        if not admin_role:
            admin_role = Role(
                name="Super Admin",
                description="Full operational and system control across Bundelkhand",
                permissions=["*"]
            )
            db.add(admin_role)
            db.commit()
            db.refresh(admin_role)

        # 2. Seed Default Admin User
        admin_user = db.query(User).filter(User.email == "admin@ruralhelp.in").first()
        if not admin_user:
            admin_user = User(
                email="admin@ruralhelp.in",
                full_name="Super Administrator",
                password_hash=get_password_hash("admin123"),
                role_id=admin_role.id,
                is_active=True
            )
            db.add(admin_user)
            db.commit()

        # 3. Seed Sample Services if table is empty
        if db.query(Service).count() == 0:
            services_data = [
                Service(
                    title="Billing & GST POS Systems",
                    slug="billing-inventory",
                    short_description="Lightning-fast barcode billing, GST compliant invoicing, and live stock tracking for retailers.",
                    full_description="Stop losing revenue to stock leakages and manual handwriting errors. Our point-of-sale systems run on standard desktop PCs or budget tablets, delivering 3-second billing speed.",
                    features_json=["2-second barcode billing", "Automatic WhatsApp bill with UPI QR", "GSTR-1 & 3B export", "Customer Udhaar ledger"],
                    is_active=True,
                    is_featured=True,
                    sort_order=1
                ),
                Service(
                    title="WhatsApp AI & Automation",
                    slug="whatsapp-automation",
                    short_description="Automate customer orders, reminders, balance dues, and payment links straight on WhatsApp.",
                    full_description="Your customers already live on WhatsApp. Turn it into your most profitable sales channel with automated PDF invoices and gentle credit reminders.",
                    features_json=["Udhaar balance alerts with UPI", "Official Meta green tick setup", "24/7 AI catalog reply", "Festival broadcast campaigns"],
                    is_active=True,
                    is_featured=True,
                    sort_order=2
                ),
                Service(
                    title="Custom Business Software",
                    slug="custom-software",
                    short_description="Tailored software built specifically for your regional business workflows, inventory, and staff management.",
                    full_description="We build grounded, high-speed custom software that fits exactly how you run your store, warehouse, or enterprise in Bundelkhand.",
                    features_json=["Offline-first architecture", "Multi-user role access", "Daily profit/loss ledgers", "Hindi & English UI"],
                    is_active=True,
                    is_featured=True,
                    sort_order=3
                ),
                Service(
                    title="Clinic & OPD Management",
                    slug="clinic-management",
                    short_description="Smart digital prescription, patient appointment queue, and lab test reporting for regional doctors.",
                    full_description="Designed with senior practitioners in Bundelkhand to eliminate chaotic waiting rooms and issue digital prescriptions in 45 seconds.",
                    features_json=["Token display TV software", "30-second prescription templates", "WhatsApp Rx delivery", "Patient record history"],
                    is_active=True,
                    is_featured=False,
                    sort_order=4
                ),
                Service(
                    title="Coaching Institute ERP",
                    slug="coaching-erp",
                    short_description="Biometric student attendance, fee installment collection, and parent SMS updates for academies.",
                    full_description="Streamline your academy administration with biometric gate attendance, fee installment reminders, and parent portals.",
                    features_json=["Biometric machine sync", "Automated fee dues alerts", "Parent WhatsApp notices", "Mark sheet generator"],
                    is_active=True,
                    is_featured=False,
                    sort_order=5
                ),
                Service(
                    title="Modern Website & App Development",
                    slug="website-development",
                    short_description="Ultra-fast, mobile-optimized business websites and customer ordering apps that rank #1 on Google.",
                    full_description="Put your business firmly on the digital map with local Maps SEO and high-speed mobile storefronts.",
                    features_json=["Ultra-fast load on 3G", "Google Maps SEO", "Click-to-Call & WhatsApp", "Product catalog gallery"],
                    is_active=True,
                    is_featured=True,
                    sort_order=6
                )
            ]
            db.add_all(services_data)
            db.commit()

        # 4. Seed Initial Leads if empty
        if db.query(Lead).count() == 0:
            initial_leads = [
                Lead(
                    customer_name="Rameshwar Dayal Gupta",
                    phone="9876543210",
                    email="guptakirana@gmail.com",
                    business_name="Gupta Wholesale Kirana",
                    business_type="retail_kirana",
                    service_name="Billing & GST POS Systems",
                    project_description="Need fast barcode machine for 2 billing counters before Diwali festival rush.",
                    status="Converted"
                ),
                Lead(
                    customer_name="Dr. Arvind Srivastav",
                    phone="9450012345",
                    email="dr.arvind@bundelkhandclinic.com",
                    business_name="Bundelkhand PolyClinic",
                    business_type="clinic_healthcare",
                    service_name="Clinic & OPD Management",
                    project_description="Want token queue management and digital prescription for OPD patients.",
                    status="Converted"
                ),
                Lead(
                    customer_name="Sunita Verma",
                    phone="9123456780",
                    business_name="Prerna Coaching Classes",
                    business_type="coaching_school",
                    service_name="Coaching Institute ERP",
                    project_description="Need biometric attendance and automated fee installment collection alerts.",
                    status="Converted"
                ),
                Lead(
                    customer_name="Vijay Prakash Pathak",
                    phone="9988776655",
                    business_name="Pathak Sanitary & Pipe Store",
                    business_type="hardware_sanitary",
                    service_name="Billing & GST POS Systems",
                    project_description="3-floor sanitary store inventory and vendor purchase order management.",
                    status="New"
                )
            ]
            db.add_all(initial_leads)
            db.commit()

    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
