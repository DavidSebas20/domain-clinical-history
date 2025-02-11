from decimal import Decimal
from fastapi import APIRouter, HTTPException
from app.database import table
from app.models import ClinicalRecord
from app.schemas import ClinicalHistoryResponse
from datetime import datetime
from uuid import uuid4

router = APIRouter()

@router.post("/")
def add_clinical_record(record: ClinicalRecord):
    try:
        # Generar un record_id único
        record_id = str(uuid4())

        # Convertir valores flotantes a Decimal
        record_dict = record.dict()
        record_dict["record_id"] = record_id
        record_dict["date"] = record.date.isoformat()  # Convertir fecha a string
        record_dict["height"] = Decimal(str(record.height))  # Convertir height a Decimal
        record_dict["weight"] = Decimal(str(record.weight))  # Convertir weight a Decimal

        # Guardar el registro en DynamoDB
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