# backend/db.py
import os

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Async engine
engine = create_async_engine(DATABASE_URL, echo=False)

# Async session factory
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# Dependency
async def get_db():
    """
    Provide a transactional scope around a series of operations.
    Yields an AsyncSession, automatically closing after request.
    """
    async with AsyncSessionLocal() as session:
        yield session
