from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.lead import Lead, LeadNote, LeadActivity
from app.models.user import User
from app.schemas.lead import LeadOut, LeadUpdate, NoteCreate, NoteOut
from app.auth.security import get_current_user

router = APIRouter(prefix="/api/admin", tags=["Admin Lead Management"])

@router.get("/dashboard/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    total_leads = db.query(Lead).count()
    new_leads = db.query(Lead).filter(Lead.status == "New").count()
    contacted_leads = db.query(Lead).filter(Lead.status == "Contacted").count()
    qualified_leads = db.query(Lead).filter(Lead.status == "Qualified").count()
    converted_leads = db.query(Lead).filter(Lead.status == "Converted").count()
    
    return {
        "total_leads": total_leads,
        "new_leads": new_leads,
        "contacted_leads": contacted_leads,
        "qualified_leads": qualified_leads,
        "converted_leads": converted_leads,
        "conversion_rate": f"{(converted_leads / total_leads * 100):.1f}%" if total_leads > 0 else "0%",
        "territory": "Baruasagar / Jhansi / Bundelkhand",
        "last_updated": datetime.utcnow().isoformat()
    }

@router.get("/leads", response_model=List[LeadOut])
def get_all_leads(
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Lead)
    if status and status != "All":
        query = query.filter(Lead.status == status)
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (Lead.customer_name.ilike(search_filter)) |
            (Lead.phone.ilike(search_filter)) |
            (Lead.business_name.ilike(search_filter))
        )
    return query.order_by(Lead.created_at.desc()).all()

@router.get("/leads/{id}", response_model=LeadOut)
def get_lead_detail(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    lead = db.query(Lead).filter(Lead.id == id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead enquiry not found")
    return lead

@router.patch("/leads/{id}", response_model=LeadOut)
def update_lead(
    id: int,
    update_data: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    lead = db.query(Lead).filter(Lead.id == id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    old_status = lead.status
    if update_data.status is not None:
        lead.status = update_data.status
        # Log activity
        activity = LeadActivity(
            lead_id=lead.id,
            activity_type="status_change",
            description=f"Status changed from {old_status} to {update_data.status} by {current_user.full_name}"
        )
        db.add(activity)

    if update_data.follow_up_date is not None:
        lead.follow_up_date = update_data.follow_up_date
        activity = LeadActivity(
            lead_id=lead.id,
            activity_type="follow_up_scheduled",
            description=f"Follow-up scheduled for {update_data.follow_up_date} by {current_user.full_name}"
        )
        db.add(activity)

    if update_data.assigned_to is not None:
        lead.assigned_to = update_data.assigned_to

    db.commit()
    db.refresh(lead)
    return lead

@router.post("/leads/{id}/notes", response_model=NoteOut)
def add_lead_note(
    id: int,
    note_in: NoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    lead = db.query(Lead).filter(Lead.id == id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    note = LeadNote(
        lead_id=lead.id,
        user_id=current_user.id,
        author_name=current_user.full_name,
        content=note_in.content
    )
    db.add(note)

    # Activity log
    activity = LeadActivity(
        lead_id=lead.id,
        activity_type="note_added",
        description=f"Note added by {current_user.full_name}: {note_in.content[:40]}..."
    )
    db.add(activity)

    db.commit()
    db.refresh(note)
    return note
