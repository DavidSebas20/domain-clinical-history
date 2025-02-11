from pydantic import BaseModel
from typing import List
from app.models import ClinicalRecord

class ClinicalHistoryResponse(BaseModel):
    records: List[ClinicalRecord]