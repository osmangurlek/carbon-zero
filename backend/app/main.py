from fastapi import FastAPI, Depends, HTTPException
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm domainlerden gelen isteklere izin vermek için
    allow_credentials=True,
    allow_methods=["*"],  # Tüm HTTP metodlarına izin vermek için
    allow_headers=["*"],  # Tüm başlıklara izin vermek için
)


class CreateRole(BaseModel):
    name: str


class CreateWorkspace(BaseModel):
    name: str


class CreateUser(BaseModel):
    workspace_id: int
    role_id: int
    email: str
    hashed_password: str


class CreateEmission(BaseModel):
    workspace_id: int
    water_consumption: float
    fuel_consumption: float
    oil_consumption: float
    co2_consumption: float


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


models.Base.metadata.create_all(bind=engine)

db_dependency = Annotated[Session, Depends(get_db)]


@app.get('/')
async def read_root():
    return {"message": "Osman"}


@app.post('/roles/')
async def create_role(role: CreateRole, db: db_dependency):
    existing_role = db.query(models.Role).filter(models.Role.name == role.name).first()
    if existing_role:
        return HTTPException(status_code=400, detail="A role with this name already exists.")
    try:
        db_role = models.Role(name=role.name)
        db.add(db_role)
        db.commit()
        db.refresh(db_role)
        return db_role
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.post('/workspaces/')
async def create_workspace(workspace: CreateWorkspace, db: db_dependency):
    db_workspace = models.Workspace(name=workspace.name)
    db.add(db_workspace)
    db.commit()
    db.refresh(db_workspace)
    return db_workspace


@app.post('/users/')
async def create_user(user: CreateUser, db: db_dependency):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post('/emissions/')
async def create_emission(emission: CreateEmission, db: db_dependency):
    db_emission = models.Emission(**emission.dict())
    db.add(db_emission)
    db.commit()
    db.refresh(db_emission)
    return db_emission
