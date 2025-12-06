# backend/routes/music.py
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import crud.music as music_crud
from db import get_db
from schemas.music import Music, MusicCreate, MusicUpdate

router = APIRouter(prefix="/tracks", tags=["Music Tracks"])


# GET ALL TRACKS
@router.get("/", response_model=List[Music])
async def read_tracks(db: AsyncSession = Depends(get_db)):
    return await music_crud.get_tracks(db)


# GET SINGLE TRACK
@router.get("/{track_id}", response_model=Music)
async def read_track(track_id: int, db: AsyncSession = Depends(get_db)):
    track = await music_crud.get_track(db, track_id)
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    return track


# CREATE TRACK
@router.post("/", response_model=Music)
async def create_new_track(track: MusicCreate, db: AsyncSession = Depends(get_db)):
    return await music_crud.create_track(db, track)


# UPDATE TRACK
@router.put("/{track_id}", response_model=Music)
async def update_existing_track(
    track_id: int, track: MusicUpdate, db: AsyncSession = Depends(get_db)
):
    updated = await music_crud.update_track(db, track_id, track)
    if not updated:
        raise HTTPException(status_code=404, detail="Track not found")
    return updated


# DELETE TRACK
@router.delete("/{track_id}")
async def delete_track(track_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await music_crud.delete_track(db, track_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Track not found")
    return {"message": "Track deleted successfully"}
