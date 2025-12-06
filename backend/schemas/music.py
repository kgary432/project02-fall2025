from datetime import datetime

from pydantic import BaseModel


class MusicBase(BaseModel):
    title: str
    artist: str
    album: str | None = None
    genre: str | None = None


class MusicCreate(MusicBase):
    pass


class MusicUpdate(BaseModel):
    title: str | None = None
    artist: str | None = None
    album: str | None = None
    genre: str | None = None


class Music(MusicBase):
    id: int
    created_at: datetime
    updated_at: datetime


class Config:
    orm_mode = True
