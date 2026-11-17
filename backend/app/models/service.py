from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class ServiceCategory(Base):
    __tablename__ = "service_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    services = relationship("Service", back_populates="category")

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("service_categories.id"), nullable=True)
    title = Column(String(150), nullable=False)
    slug = Column(String(150), unique=True, index=True, nullable=False)
    short_description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=True)
    features_json = Column(JSON, nullable=True)
    process_steps_json = Column(JSON, nullable=True)
    icon = Column(String(50), nullable=True)
    image_url = Column(String(255), nullable=True)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    category = relationship("ServiceCategory", back_populates="services")
    leads = relationship("Lead", back_populates="service")
