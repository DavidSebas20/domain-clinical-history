from pydantic import BaseModel
from datetime import date
from uuid import uuid4

class ClinicalRecord(BaseModel):
    record_id: str = None 
    patient_id: str
    height: float
    weight: float
    heart_rate: int
    blood_pressure: str
    notes: str
    date: date

    class Config:
        json_schema_extra = {
            "example": {
                "patient_id": "P001",
                "height": 170.5,
                "weight": 68.2,
                "heart_rate": 72,
                "blood_pressure": "120/80",
                "notes": "Paciente estable",
                "date": "2023-10-01"
            }
        }