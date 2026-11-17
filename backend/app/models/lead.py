from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(120), nullable=False)
    email = Column(String(120), nullable=True)
    phone = Column(String(20), nullable=False, index=True)
    business_name = Column(String(150), nullable=False)
    business_type = Column(String(80), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=True)
    service_name = Column(String(120), nullable=True)
    project_description = Column(Text, nullable=False)
    status = Column(String(50), default="New", index=True)  # New, Contacted, Qualified, Proposal Sent, Converted, Lost
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    follow_up_date = Column(String(30), nullable=True)
    source = Column(String(50), default="website_enquiry")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    service = relationship("Service", back_populates="leads")
    notes = relationship("LeadNote", back_populates="lead", cascade="all, delete-orphan")
    activities = relationship("LeadActivity", back_populates="lead", cascade="all, delete-orphan")

class LeadNote(Base):
    __tablename__ = "lead_notes"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    author_name = Column(String(100), default="Staff Member")
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    lead = relationship("Lead", back_populates="notes")
    author = relationship("User", back_populates="notes")

class LeadActivity(Base):
    __tablename__ = "lead_activities"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    activity_type = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    metadata_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    lead = relationship("Lead", back_populates="activities")
