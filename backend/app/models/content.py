from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    client_name = Column(String(150), nullable=False)
    location = Column(String(100), default="Baruasagar / Jhansi")
    category = Column(String(80), nullable=False)
    summary = Column(Text, nullable=False)
    metrics = Column(String(150), nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(120), nullable=False)
    client_role = Column(String(100), nullable=False)
    company_name = Column(String(150), nullable=False)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    location = Column(String(100), default="Baruasagar, Jhansi")
    impact = Column(String(150), nullable=True)
    is_featured = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(80), nullable=False)
    author = Column(String(100), default="RuralHelp Team")
    read_time = Column(String(30), default="5 min read")
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(120), nullable=True)
    phone = Column(String(20), nullable=True)
    subject = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
