from pydantic import BaseModel


class UserLogin(BaseModel):
    email: str
    password: str


class StudentCreate(BaseModel):
    name: str
    phone: str
    email: str
    password: str


class StudentRead(BaseModel):
    id: int
    name: str
    phone: str
    email: str

    class Config:
        orm_mode = True


class CompanyCreate(BaseModel):
    companyName: str
    phone: str
    email: str
    website: str | None = None
    password: str


class CompanyRead(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    website: str | None = None

    class Config:
        orm_mode = True

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
