from fastapi import FastAPI
from app.routes.clinical_history import router as clinical_history_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Middleware para CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(clinical_history_router, prefix="/clinical-history", tags=["Clinical History"])

@app.get("/")
def root():
    return {"message": "Microservice for managing clinical records"}