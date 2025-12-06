from sqlalchemy.orm import Session

from models.music import MusicTrack
from schemas.music import MusicCreate, MusicUpdate


def get_tracks(db: Session):
    return db.query(MusicTrack).all()


def get_track(db: Session, track_id: int):
    return db.query(MusicTrack).filter(MusicTrack.id == track_id).first()


def create_track(db: Session, track: MusicCreate):
    db_track = MusicTrack(**track.dict())
    db.add(db_track)
    db.commit()
    db.refresh(db_track)
    return db_track


def update_track(db: Session, track_id: int, track: MusicUpdate):
    db_track = get_track(db, track_id)
    if not db_track:
        return None
    for field, value in track.dict(exclude_none=True).items():
        setattr(db_track, field, value)
    db.commit()
    db.refresh(db_track)
    return db_track


def delete_track(db: Session, track_id: int):
    db_track = get_track(db, track_id)
    if not db_track:
        return None
    db.delete(db_track)
    db.commit()
    return True
