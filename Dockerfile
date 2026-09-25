# =========================
# Stage 1: Build React App
# =========================

FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first
# This improves Docker layer caching.
COPY package*.json ./

# Install dependencies
RUN npm ci

# Frontend configuration
ARG VITE_API_URL=/api
ARG VITE_CLOUDINARY_CLOUD_NAME
ARG VITE_CLOUDINARY_UPLOAD_PRESET

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME
ENV VITE_CLOUDINARY_UPLOAD_PRESET=$VITE_CLOUDINARY_UPLOAD_PRESET

# Copy application source
COPY . .

# Build production frontend
RUN npm run build


# =========================
# Stage 2: Production Nginx
# =========================

FROM nginx:1.29-alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx HTTP port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]