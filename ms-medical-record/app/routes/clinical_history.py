from fastapi import APIRouter, HTTPException
from app.database import table
from app.models import ClinicalRecord
from app.schemas import ClinicalHistoryResponse
from datetime import datetime
from uuid import uuid4

router = APIRouter()

@router.post("/record/")
def add_clinical_record(record: ClinicalRecord):
    try:
        # Generate a record_id
        record_id = str(uuid4())

        # Create a new record in the database
        record_dict = record.dict()
        record_dict["record_id"] = record_id
        record_dict["date"] = record.date.isoformat()  
        table.put_item(Item=record_dict)

        return {"message": "Clinical record added successfully", "record_id": record_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{patient_id}", response_model=ClinicalHistoryResponse)
def get_clinical_records_by_patient(patient_id: str):
    try:
        # Search for records in the database
        response = table.scan(
            FilterExpression="patient_id = :pid",
            ExpressionAttributeValues={":pid": patient_id}
        )
        records = response.get("Items", [])

        # Return the records
        return {"records": records}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))