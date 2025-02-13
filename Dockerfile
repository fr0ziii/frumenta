# syntax=docker/dockerfile:1

# Use a multi-stage build to reduce the final image size
FROM node:20 as frontend-build

WORKDIR /app/frontend

# Copy the frontend source code
COPY frontend/package*.json ./
RUN npm install

COPY frontend ./

# Build the frontend
RUN npm run build

FROM python:3.9 as backend-build

WORKDIR /app/backend

# Copy the backend source code
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

COPY backend ./

# --- Final image ---
FROM nginx:alpine

# Copy the built frontend from the frontend-build stage
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy the backend from the backend-build stage
COPY --from=backend-build /app/backend /app/backend

# Add backend startup script
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
