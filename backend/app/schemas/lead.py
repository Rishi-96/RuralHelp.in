from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class LeadCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=120)
    email: Optional[str] = None
    phone: str = Field(..., min_length=10, max_length=15)
    business_name: str = Field(..., min_length=2, max_length=150)
    business_type: str = Field(..., min_length=2, max_length=80)
    service_id: Optional[str] = None
    project_description: str = Field(..., min_length=5)

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    follow_up_date: Optional[str] = None
    assigned_to: Optional[int] = None

class NoteCreate(BaseModel):
    content: str = Field(..., min_length=2)

class NoteOut(BaseModel):
    id: int
    content: str
    author_name: str
    created_at: datetime

    class Config:
        from_attributes = True

class LeadOut(BaseModel):
    id: int
    customer_name: str
    email: Optional[str] = None
    phone: str
    business_name: str
    business_type: str
    service_name: Optional[str] = None
    project_description: str
    status: str
    follow_up_date: Optional[str] = None
    created_at: datetime
    notes: List[NoteOut] = []

    class Config:
        from_attributes = True
