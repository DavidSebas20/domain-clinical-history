from pydantic import BaseModel
from datetime import date
from uuid import UUID

class ClinicalRecord(BaseModel):
    record_id: UUID 
    patient_id: str
    height: float
    weight: float
    heart_rate: int
    blood_pressure: str
    notes: str
    date: date