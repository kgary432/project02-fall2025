"""
Simple FastAPI Starter - Favorite Music API
===========================================

This is a minimal FastAPI example, designed for beginners.
It shows the basic structure of a REST API with database access,
but now for music tracks instead of TODO items.
"""

# Step 1: Import what we need
import os
from datetime import datetime
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker

from models import Base, MusicTrack
from routes.music import router as music_router

# Step 2: Load environment variables
load_dotenv()

# Step 3: Connect to the database
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

app = FastAPI()

app.include_router(music_router)


# Step 4: Database session dependency
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


# --------------------------------------------------------------------
# MUSIC TRACK SCHEMAS
# --------------------------------------------------------------------


class TrackBase(BaseModel):
    """Shared fields for music tracks"""

    title: str
    artist: str
    album: Optional[str] = None
    genre: Optional[str] = None


class TrackCreate(TrackBase):
    """Schema for creating a new track"""

    pass


class TrackUpdate(BaseModel):
    """For PATCH requests—fields optional"""

    title: Optional[str] = None
    artist: Optional[str] = None
    album: Optional[str] = None
    genre: Optional[str] = None


class TrackResponse(TrackBase):
    """What a track looks like when returned to the client"""

    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# --------------------------------------------------------------------
# Create FastAPI app
# --------------------------------------------------------------------
app = FastAPI(
    title="Favorite Music API",
    description="CRUD API for tracking favorite songs and artists",
)


# --------------------------------------------------------------------
# Create DB tables on startup
# --------------------------------------------------------------------
@app.on_event("startup")
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables created.")


# --------------------------------------------------------------------
# CORS
# --------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------
# CRUD ENDPOINTS (REPLACING TODO ENDPOINTS)
# --------------------------------------------------------------------


# GET ALL TRACKS
@app.get("/tracks", response_model=List[TrackResponse])
async def get_all_tracks(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MusicTrack))
    tracks = result.scalars().all()
    return tracks


# GET A SINGLE TRACK
@app.get("/tracks/{track_id}", response_model=TrackResponse)
async def get_track(track_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MusicTrack).where(MusicTrack.id == track_id))
    track = result.scalar_one_or_none()

    if track is None:
        raise HTTPException(status_code=404, detail=f"Track {track_id} not found")

    return track


# CREATE TRACK
@app.post("/tracks", response_model=TrackResponse, status_code=201)
async def create_track(track: TrackCreate, db: AsyncSession = Depends(get_db)):
    db_track = MusicTrack(
        title=track.title,
        artist=track.artist,
        album=track.album,
        genre=track.genre,
    )

    db.add(db_track)
    await db.commit()
    await db.refresh(db_track)
    return db_track


# UPDATE TRACK (PATCH)
@app.patch("/tracks/{track_id}", response_model=TrackResponse)
async def patch_track(
    track_id: int, track_update: TrackUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(MusicTrack).where(MusicTrack.id == track_id))
    db_track = result.scalar_one_or_none()

    if db_track is None:
        raise HTTPException(status_code=404, detail=f"Track {track_id} not found")

    update_data = track_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_track, field, value)

    db_track.updated_at = datetime.utcnow()

    await db.commit()
    await db.refresh(db_track)

    return db_track


# DELETE TRACK
@app.delete("/tracks/{track_id}", status_code=204)
async def delete_track(track_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MusicTrack).where(MusicTrack.id == track_id))
    db_track = result.scalar_one_or_none()

    if db_track is None:
        raise HTTPException(status_code=404, detail=f"Track {track_id} not found")

    await db.delete(db_track)
    await db.commit()

    return None


# --------------------------------------------------------------------
# FRONTEND SPA STATIC SERVING (UNCHANGED)
# --------------------------------------------------------------------
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")

if os.path.exists(static_dir):
    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(static_dir, "assets")),
        name="assets",
    )

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        index_path = os.path.join(static_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        raise HTTPException(status_code=404, detail="Frontend not found")


# --------------------------------------------------------------------
# Run server directly
# --------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
