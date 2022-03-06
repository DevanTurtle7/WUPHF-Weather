from fastapi import FastAPI

from .routers import auth, geo, preferences, weather

app = FastAPI()


app.include_router(auth.router, prefix="/auth")
app.include_router(geo.router, prefix="/geo")
app.include_router(preferences.router, prefix="/preferences")
app.include_router(weather.router, prefix="/weather")
