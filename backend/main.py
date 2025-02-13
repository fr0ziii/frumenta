from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Web Crawler API",
             description="API endpoints for web crawling and content processing",
             version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    url: str
    extract_schema: Optional[dict] = None

class CrawlRequest(BaseModel):
    url: str
    depth: int = 2

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Web Crawler API - Root Endpoint"}

@app.post("/scrape", tags=["Scrape"])
async def scrape(request: ScrapeRequest):
    """
    Scrape a single URL and extract content based on the provided schema.
    """
    try:
        return {"message": f"Scraping {request.url}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/crawl", tags=["Crawl"])
async def crawl(request: CrawlRequest):
    """
    Crawl a website up to a specified depth and extract content.
    """
    try:
        return {"message": f"Crawling {request.url} with depth {request.depth}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/status", tags=["Status"])
async def status():
    """
    Get the current status of the web crawler.
    """
    return {"status": "idle"}
