from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class InternshipBase(BaseModel):
    title: str
    description: str

class InternshipCreate(InternshipBase):
    pass

class InternshipRead(InternshipBase):
    id: int
    company_id: int

    class Config:
        orm_mode = True

class Message(BaseModel):
    message: str

class ResumeAnalysis(BaseModel):
    score: int
    suggestions: list[str]
