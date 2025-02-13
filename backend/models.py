import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
import os

DATABASE_URL = os.getenv("SUPABASE_URL")
engine = create_engine(DATABASE_URL)
Base = declarative_base()

class WebPage(Base):
    __tablename__ = "web_pages"

    id = Column(Integer, primary_key=True)
    url = Column(String(2048), unique=True, nullable=False)
    title = Column(String(1024))
    content = Column(Text)
    crawled_at = Column(DateTime)
    is_indexed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"WebPage(id={self.id}, url={self.url}, title={self.title})"
