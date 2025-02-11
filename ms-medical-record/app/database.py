import boto3
from app.config import settings

# DynamoDB
dynamodb = boto3.resource(
    "dynamodb",
    region_name=settings.aws_region,
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    aws_session_token=settings.aws_session_token,
)
table = dynamodb.Table(settings.dynamodb_table_records)

