# Docker Guide for Wild Oasis Project

## 🐳 Overview

This guide covers everything you need to know about using Docker with your Next.js Wild Oasis project, from basic concepts to production deployment.

## 📚 Docker Basics Recap

### What is Docker?

Docker is a containerization platform that packages your application and its dependencies into lightweight, portable containers that run consistently across different environments.

### Key Concepts

- **Image**: A template containing your application and dependencies
- **Container**: A running instance of an image
- **Dockerfile**: Instructions for building an image
- **Docker Compose**: Tool for defining multi-container applications

## 🏗️ Project Docker Setup

### Files Overview

```
project-root/
├── Dockerfile              # Production image definition
├── .dockerignore           # Files to exclude from build context
├── docker-compose.yml      # Development environment setup
└── docker/                 # Docker-related files (optional)
    ├── nginx.conf          # Nginx configuration
    └── docker-compose.prod.yml
```

## 🚀 Getting Started

### Prerequisites

```bash
# Install Docker Desktop
# Windows/Mac: https://www.docker.com/products/docker-desktop/
# Linux: https://docs.docker.com/engine/install/

# Verify installation
docker --version
docker-compose --version
```

### Environment Setup

Create `.env.local` file (never commit this):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://adczmndslhsvhgaxovxw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## 🔨 Building and Running

### 1. Development with Docker Compose

Start the entire development stack:

```bash
# Start all services in background
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build
```

### 2. Production Docker Image

Build production image:

```bash
# Build the image
docker build -t wild-oasis:latest .

# Build with build arguments
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
  -t wild-oasis:latest .

# Run production container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
  wild-oasis:latest
```

### 3. Multi-stage Build Explanation

Our Dockerfile uses 3 stages:

#### Stage 1: Dependencies

```dockerfile
FROM node:20-alpine AS deps
# Only installs production dependencies
# Cached layer - only rebuilds when package.json changes
```

#### Stage 2: Builder

```dockerfile
FROM node:20-alpine AS builder
# Copies source code and builds the application
# Includes dev dependencies for building
```

#### Stage 3: Runner

```dockerfile
FROM node:20-alpine AS runner
# Final lightweight image with only runtime files
# Runs as non-root user for security
```

**Benefits:**

- **Smaller final image**: Only runtime dependencies
- **Better caching**: Dependencies cached separately from source code
- **Security**: Non-root user, minimal attack surface
- **Performance**: Optimized for production

## 🛠️ Docker Commands Reference

### Image Management

```bash
# List images
docker images

# Remove image
docker rmi wild-oasis:latest

# Remove unused images
docker image prune

# Build image with no cache
docker build --no-cache -t wild-oasis:latest .
```

### Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop <container_id>

# Remove container
docker rm <container_id>

# Execute command in running container
docker exec -it <container_id> /bin/sh

# View container logs
docker logs <container_id>

# Follow logs in real-time
docker logs -f <container_id>
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild services
docker-compose up --build

# View logs for specific service
docker-compose logs app

# Execute command in service
docker-compose exec app npm run test

# Scale service (if supported)
docker-compose up --scale app=3
```

## 📊 Monitoring and Debugging

### Health Checks

Our Dockerfile includes health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

Check container health:

```bash
docker ps  # Shows health status
docker inspect <container_id> | grep -A 10 "Health"
```

### Debug Running Container

```bash
# Access container shell
docker exec -it <container_id> /bin/sh

# Check processes
docker exec <container_id> ps aux

# Check memory usage
docker stats <container_id>

# Inspect container configuration
docker inspect <container_id>
```

### Common Issues and Solutions

#### Issue: Build fails with "EACCES: permission denied"

```bash
# Solution: Check file permissions
ls -la
chmod +x <file>
```

#### Issue: Container exits immediately

```bash
# Check logs for errors
docker logs <container_id>

# Run interactively to debug
docker run -it wild-oasis:latest /bin/sh
```

#### Issue: Environment variables not working

```bash
# Verify environment variables in container
docker exec <container_id> env

# Check if .env file is properly excluded
cat .dockerignore
```

## 🌐 Production Deployment

### 1. Docker Hub Deployment

```bash
# Tag for Docker Hub
docker tag wild-oasis:latest yourusername/wild-oasis:latest

# Push to Docker Hub
docker push yourusername/wild-oasis:latest

# Pull and run on production server
docker pull yourusername/wild-oasis:latest
docker run -d -p 80:3000 --name wild-oasis-prod yourusername/wild-oasis:latest
```

### 2. GitHub Actions Integration

The CI/CD pipeline automatically:

1. Builds Docker images
2. Pushes to registry
3. Deploys to production

Required GitHub secrets:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

### 3. Container Registry Alternatives

#### AWS ECR

```bash
# Login to ECR
aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com

# Tag and push
docker tag wild-oasis:latest aws_account_id.dkr.ecr.region.amazonaws.com/wild-oasis:latest
docker push aws_account_id.dkr.ecr.region.amazonaws.com/wild-oasis:latest
```

#### Google Container Registry

```bash
# Configure authentication
gcloud auth configure-docker

# Tag and push
docker tag wild-oasis:latest gcr.io/project-id/wild-oasis:latest
docker push gcr.io/project-id/wild-oasis:latest
```

## 🔧 Advanced Docker Configurations

### 1. Multi-environment Setup

Create environment-specific compose files:

**docker-compose.override.yml** (development):

```yaml
version: '3.8'
services:
  app:
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
```

**docker-compose.prod.yml** (production):

```yaml
version: '3.8'
services:
  app:
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

### 2. Nginx Reverse Proxy

Add Nginx service to docker-compose.yml:

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
```

### 3. Database Integration

If using local PostgreSQL instead of Supabase:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: wild_oasis
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

volumes:
  postgres_data:
```

### 4. Redis for Caching

```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

volumes:
  redis_data:
```

## 📈 Performance Optimization

### 1. Image Size Optimization

Current optimizations in our Dockerfile:

- **Alpine Linux**: Smaller base image (~5MB vs ~200MB)
- **Multi-stage build**: Removes build dependencies
- **Layer caching**: Optimized instruction order
- **.dockerignore**: Excludes unnecessary files

### 2. Build Performance

```bash
# Use BuildKit for faster builds
export DOCKER_BUILDKIT=1

# Use build cache
docker build --cache-from wild-oasis:latest -t wild-oasis:latest .

# Multi-platform builds (for deployment to ARM servers)
docker buildx build --platform linux/amd64,linux/arm64 -t wild-oasis:latest .
```

### 3. Resource Limits

In docker-compose.yml:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 🔒 Security Best Practices

### 1. Non-root User

Our Dockerfile creates and uses a non-root user:

```dockerfile
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs
```

### 2. Secrets Management

Never include secrets in Dockerfile:

```bash
# ❌ Wrong
ENV API_KEY=secret123

# ✅ Right
ENV API_KEY=""  # Set at runtime
```

### 3. Image Scanning

```bash
# Scan image for vulnerabilities
docker scan wild-oasis:latest

# Use specific versions
FROM node:20.11.0-alpine  # Instead of node:20-alpine
```

## 🚀 Deployment Strategies

### 1. Blue-Green Deployment

```bash
# Deploy new version (green)
docker run -d --name wild-oasis-green -p 3001:3000 wild-oasis:v2

# Test new version
curl http://localhost:3001/api/health

# Switch traffic (update load balancer to point to port 3001)
# Stop old version (blue)
docker stop wild-oasis-blue
docker rm wild-oasis-blue

# Rename green to blue for next deployment
docker rename wild-oasis-green wild-oasis-blue
```

### 2. Rolling Deployment

```bash
# Using docker-compose for zero-downtime updates
docker-compose up -d --scale app=2  # Scale to 2 instances
docker-compose up -d --no-deps app  # Update app service
docker-compose up -d --scale app=1  # Scale back to 1 instance
```

### 3. Canary Deployment

```bash
# Deploy canary version with limited traffic
docker run -d --name wild-oasis-canary -p 3002:3000 wild-oasis:canary

# Configure load balancer to send 10% traffic to canary
# Monitor metrics and gradually increase traffic
# Promote or rollback based on performance
```

## 🔄 Container Orchestration

### 1. Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Create service
docker service create \
  --name wild-oasis \
  --replicas 3 \
  --publish 3000:3000 \
  wild-oasis:latest

# Update service
docker service update --image wild-oasis:v2 wild-oasis

# Scale service
docker service scale wild-oasis=5
```

### 2. Kubernetes Deployment

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wild-oasis
spec:
  replicas: 3
  selector:
    matchLabels:
      app: wild-oasis
  template:
    metadata:
      labels:
        app: wild-oasis
    spec:
      containers:
        - name: wild-oasis
          image: wild-oasis:latest
          ports:
            - containerPort: 3000
          env:
            - name: NEXT_PUBLIC_SUPABASE_URL
              valueFrom:
                secretKeyRef:
                  name: wild-oasis-secrets
                  key: supabase-url
---
apiVersion: v1
kind: Service
metadata:
  name: wild-oasis-service
spec:
  selector:
    app: wild-oasis
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

## 📊 Monitoring and Logging

### 1. Container Logs

```bash
# View logs from all containers
docker-compose logs

# Follow logs from specific service
docker-compose logs -f app

# View last 100 lines
docker logs --tail 100 <container_id>

# View logs with timestamps
docker logs -t <container_id>
```

### 2. Resource Monitoring

```bash
# Real-time resource usage
docker stats

# Resource usage for specific container
docker stats <container_id>

# System-wide Docker resource usage
docker system df

# Clean up unused resources
docker system prune -a
```

### 3. Health Monitoring

```bash
# Check health status
docker inspect <container_id> | jq '.[0].State.Health'

# Custom health check script
#!/bin/bash
HEALTH_URL="http://localhost:3000/api/health"
if curl -f $HEALTH_URL > /dev/null 2>&1; then
    echo "Service is healthy"
    exit 0
else
    echo "Service is unhealthy"
    exit 1
fi
```

## 🔧 Troubleshooting Guide

### Common Docker Issues

#### 1. Port Already in Use

```bash
# Find process using port
lsof -i :3000
netstat -tulpn | grep 3000

# Kill process
kill -9 <pid>

# Or use different port
docker run -p 3001:3000 wild-oasis:latest
```

#### 2. Out of Disk Space

```bash
# Check Docker disk usage
docker system df

# Clean up everything
docker system prune -a --volumes

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

#### 3. Memory Issues

```bash
# Check memory usage
docker stats --no-stream

# Limit container memory
docker run -m 512m wild-oasis:latest

# In docker-compose.yml
services:
  app:
    mem_limit: 512m
```

#### 4. Build Context Too Large

```bash
# Check build context size
du -sh .

# Improve .dockerignore
echo "node_modules
.git
.next
coverage
*.log" >> .dockerignore
```

### Performance Troubleshooting

#### 1. Slow Build Times

```bash
# Use multi-stage builds
# Cache dependencies separately
# Use .dockerignore effectively
# Use smaller base images

# Enable BuildKit
export DOCKER_BUILDKIT=1
```

#### 2. Container Startup Issues

```bash
# Check initialization order
# Use health checks
# Implement graceful shutdown
# Check dependency services
```

## 🔄 Backup and Recovery

### 1. Container Data Backup

```bash
# Backup volume data
docker run --rm -v wild_oasis_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/backup.tar.gz /data

# Restore volume data
docker run --rm -v wild_oasis_data:/data -v $(pwd):/backup alpine \
  tar xzf /backup/backup.tar.gz -C /
```

### 2. Database Backup (if using local DB)

```bash
# Backup PostgreSQL
docker exec postgres_container pg_dump -U postgres wild_oasis > backup.sql

# Restore PostgreSQL
docker exec -i postgres_container psql -U postgres wild_oasis < backup.sql
```

### 3. Image Backup

```bash
# Save image to tar file
docker save wild-oasis:latest > wild-oasis.tar

# Load image from tar file
docker load < wild-oasis.tar
```

## 📚 Best Practices Summary

### Development

- ✅ Use docker-compose for local development
- ✅ Mount source code as volumes for hot reload
- ✅ Use .dockerignore to exclude unnecessary files
- ✅ Tag images with meaningful versions
- ✅ Use health checks for all services

### Production

- ✅ Use multi-stage builds for smaller images
- ✅ Run containers as non-root users
- ✅ Set resource limits
- ✅ Use specific image tags (not `latest`)
- ✅ Implement proper logging and monitoring

### Security

- ✅ Scan images for vulnerabilities
- ✅ Use secrets management
- ✅ Keep base images updated
- ✅ Minimize attack surface
- ✅ Use read-only filesystems when possible

### CI/CD

- ✅ Build images in CI pipeline
- ✅ Push to secure registries
- ✅ Implement automated testing
- ✅ Use staged deployments
- ✅ Monitor deployment health

## 🎯 Next Steps

1. **Implement monitoring**: Add Prometheus and Grafana
2. **Set up logging**: Centralized logging with ELK stack
3. **Security scanning**: Integrate Snyk or Twistlock
4. **Service mesh**: Consider Istio for microservices
5. **Backup strategy**: Implement automated backups

## 📞 Support and Resources

- **Docker Documentation**: https://docs.docker.com/
- **Docker Compose Reference**: https://docs.docker.com/compose/
- **Next.js Docker Guide**: https://nextjs.org/docs/deployment#docker-image
- **Container Security**: https://docs.docker.com/engine/security/

---

This Docker guide provides comprehensive coverage for developing, deploying, and maintaining your Wild Oasis application using containers. Start with the basic commands and gradually implement advanced features as your project grows.

Happy containerizing! 🐳
