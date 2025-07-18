"""
PowerGrid Backend Setup Script
This script sets up the FastAPI backend structure and database
"""

import os
import subprocess
import sys

def create_directory_structure():
    """Create the backend directory structure"""
    directories = [
        "backend",
        "backend/app",
        "backend/app/api",
        "backend/app/api/v1",
        "backend/app/api/v1/endpoints",
        "backend/app/core",
        "backend/app/models",
        "backend/app/schemas",
        "backend/app/services",
        "backend/app/db",
        "backend/app/utils",
        "backend/tests",
        "backend/alembic",
        "backend/alembic/versions"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        # Create __init__.py files for Python packages
        if directory.startswith("backend/app"):
            init_file = os.path.join(directory, "__init__.py")
            if not os.path.exists(init_file):
                open(init_file, 'a').close()
    
    print("✅ Directory structure created")

def create_requirements_file():
    """Create requirements.txt for the backend"""
    requirements = """fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
python-decouple==3.8
redis==5.0.1
celery==5.3.4
pydantic==2.5.0
pydantic-settings==2.1.0
httpx==0.25.2
pytest==7.4.3
pytest-asyncio==0.21.1
"""
    
    with open("backend/requirements.txt", "w") as f:
        f.write(requirements.strip())
    
    print("✅ Requirements file created")

def create_env_template():
    """Create environment template file"""
    env_content = """# Database
DATABASE_URL=postgresql://username:password@localhost:5432/powergrid
TEST_DATABASE_URL=postgresql://username:password@localhost:5432/powergrid_test

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis (for caching and background tasks)
REDIS_URL=redis://localhost:6379

# External APIs
GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret
APPLE_SIGNIN_CLIENT_ID=your-apple-client-id
APPLE_SIGNIN_CLIENT_SECRET=your-apple-client-secret

# SMS/OTP Service
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_BUCKET_NAME=powergrid-uploads

# Environment
ENVIRONMENT=development
DEBUG=True
"""
    
    with open("backend/.env.template", "w") as f:
        f.write(env_content.strip())
    
    print("✅ Environment template created")

def create_main_app():
    """Create the main FastAPI application"""
    main_content = '''from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.api.v1.api import api_router
from app.core.config import settings
from app.db.session import engine
from app.models import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PowerGrid API",
    description="API for tracking electricity availability",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "PowerGrid API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
'''
    
    with open("backend/app/main.py", "w") as f:
        f.write(main_content)
    
    print("✅ Main FastAPI app created")

def create_database_models():
    """Create SQLAlchemy models"""
    models_content = '''from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    oauth_provider = Column(String, nullable=True)  # google, apple, etc.
    oauth_id = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    power_logs = relationship("PowerLog", back_populates="user")
    reports = relationship("OutageReport", back_populates="user")
    user_stats = relationship("UserStats", back_populates="user", uselist=False)

class PowerLog(Base):
    __tablename__ = "power_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, nullable=False)  # 'on' or 'off'
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    location_name = Column(String, nullable=True)
    confidence_score = Column(Float, default=1.0)  # For smart suggestions
    is_verified = Column(Boolean, default=True)
    sync_status = Column(String, default="synced")  # synced, pending, failed
    
    # Relationships
    user = relationship("User", back_populates="power_logs")

class OutageReport(Base):
    __tablename__ = "outage_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    severity = Column(String, default="medium")  # low, medium, high, critical
    status = Column(String, default="open")  # open, investigating, resolved
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    location_name = Column(String, nullable=True)
    photo_url = Column(String, nullable=True)
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="reports")

class UserStats(Base):
    __tablename__ = "user_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    total_logs = Column(Integer, default=0)
    total_credits = Column(Integer, default=0)
    reliability_score = Column(Float, default=0.0)
    last_log_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="user_stats")

class CreditTransaction(Base):
    __tablename__ = "credit_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)  # Can be positive or negative
    transaction_type = Column(String, nullable=False)  # log, report, bonus, redemption
    description = Column(String, nullable=True)
    reference_id = Column(String, nullable=True)  # Reference to related log/report
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String, nullable=True)
    criteria = Column(Text, nullable=False)  # JSON string with criteria
    credits_reward = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class UserAchievement(Base):
    __tablename__ = "user_achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    achievement_id = Column(Integer, ForeignKey("achievements.id"), nullable=False)
    earned_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User")
    achievement = relationship("Achievement")
'''
    
    with open("backend/app/models/__init__.py", "w") as f:
        f.write(models_content)
    
    print("✅ Database models created")

def create_config():
    """Create configuration settings"""
    config_content = '''from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "PowerGrid API"
    
    # Database
    DATABASE_URL: str
    TEST_DATABASE_URL: Optional[str] = None
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "https://powergrid.app"
    ]
    
    # Allowed hosts
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # OAuth Settings
    GOOGLE_OAUTH_CLIENT_ID: Optional[str] = None
    GOOGLE_OAUTH_CLIENT_SECRET: Optional[str] = None
    APPLE_SIGNIN_CLIENT_ID: Optional[str] = None
    APPLE_SIGNIN_CLIENT_SECRET: Optional[str] = None
    
    # SMS/OTP
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_PHONE_NUMBER: Optional[str] = None
    
    # File Storage
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_BUCKET_NAME: Optional[str] = None
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
'''
    
    with open("backend/app/core/config.py", "w") as f:
        f.write(config_content)
    
    print("✅ Configuration created")

if __name__ == "__main__":
    print("🚀 Setting up PowerGrid Backend...")
    create_directory_structure()
    create_requirements_file()
    create_env_template()
    create_main_app()
    create_database_models()
    create_config()
    print("✅ Backend setup complete!")
    print("\nNext steps:")
    print("1. cd backend")
    print("2. python -m venv venv")
    print("3. source venv/bin/activate (or venv\\Scripts\\activate on Windows)")
    print("4. pip install -r requirements.txt")
    print("5. Copy .env.template to .env and fill in your values")
    print("6. uvicorn app.main:app --reload")
