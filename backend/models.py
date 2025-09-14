from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from .db import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    college = Column(String, nullable=True)
    course = Column(String, nullable=True)
    year = Column(String, nullable=True)
    cgpa = Column(String, nullable=True)
    skills = Column(Text, nullable=True)
    interests = Column(Text, nullable=True)
    experience = Column(Text, nullable=True)
    resume_path = Column(String, nullable=True)
    internship_id = Column(Integer, ForeignKey("internships.id"), nullable=True)

    internship = relationship("Internship", back_populates="students")


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    website = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)

    internships = relationship("Internship", back_populates="company")


class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    required_skills = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    stipend = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    is_filled = Column(Boolean, default=False)

    company = relationship("Company", back_populates="internships")
    students = relationship("Student", back_populates="internship")
