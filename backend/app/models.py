from database import Base
from sqlalchemy import Column, ForeignKey, Integer, String, TIMESTAMP, text, DECIMAL
from sqlalchemy.orm import relationship


class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)


class Workspace(Base):
    __tablename__ = 'workspaces'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=text("(NOW() AT TIME ZONE 'utc')"))


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    workspace_id = Column(Integer, ForeignKey('workspaces.id'))
    role_id = Column(Integer, ForeignKey('roles.id'))
    email = Column(String(50), nullable=False, unique=False)
    hashed_password = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP, server_default=text("(NOW() AT TIME ZONE 'utc')"))

    workspace = relationship("Workspace")
    role = relationship("Role")


class Emission(Base):
    __tablename__ = 'emissions'

    id = Column(Integer, primary_key=True)
    workspace_id = Column(Integer, ForeignKey('workspaces.id'))
    water_consumption = Column(DECIMAL, nullable=False)
    fuel_consumption = Column(DECIMAL, nullable=False)
    oil_consumption = Column(DECIMAL, nullable=False)
    co2_consumption = Column(DECIMAL, nullable=False)
    created_at = Column(TIMESTAMP, server_default=text("(NOW() AT TIME ZONE 'utc')"))

    workspace = relationship("Workspace")