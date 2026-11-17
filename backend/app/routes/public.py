from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.lead import Lead, LeadActivity
from app.models.service import Service, ServiceCategory
from app.models.content import Testimonial, BlogPost, Project
from app.schemas.lead import LeadCreate, LeadOut

router = APIRouter(prefix="/api", tags=["Public Endpoints"])

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "RuralHelp Backend API",
        "territory": "Bundelkhand (Baruasagar & Jhansi)",
        "version": "1.0.0"
    }

@router.post("/enquiry", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
def submit_enquiry(lead_in: LeadCreate, db: Session = Depends(get_db)):
    # Create new lead in database
    new_lead = Lead(
        customer_name=lead_in.customer_name,
        email=lead_in.email,
        phone=lead_in.phone,
        business_name=lead_in.business_name,
        business_type=lead_in.business_type,
        service_name=lead_in.service_id,
        project_description=lead_in.project_description,
        status="New",
        source="website_enquiry"
    )
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)

    # Record activity log
    activity = LeadActivity(
        lead_id=new_lead.id,
        activity_type="enquiry_submitted",
        description=f"Enquiry submitted by {lead_in.customer_name} for firm '{lead_in.business_name}'"
    )
    db.add(activity)
    db.commit()

    return new_lead

@router.get("/services")
def list_services(db: Session = Depends(get_db)):
    services = db.query(Service).filter(Service.is_active == True).order_by(Service.sort_order).all()
    return services

@router.get("/services/{slug}")
def get_service(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug, Service.is_active == True).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service offering not found")
    return service

@router.get("/testimonials")
def list_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).filter(Testimonial.is_active == True).all()

@router.get("/blog")
def list_blog_posts(db: Session = Depends(get_db)):
    return db.query(BlogPost).filter(BlogPost.is_published == True).order_by(BlogPost.created_at.desc()).all()

@router.get("/portfolio")
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).filter(Project.is_active == True).all()
