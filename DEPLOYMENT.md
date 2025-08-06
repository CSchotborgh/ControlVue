# Deployment Guide - EDGERACK Cooling Unit Control System

This guide provides comprehensive instructions for deploying the EDGERACK Cooling Unit Control System across different environments.

## 🚀 Quick Deploy on Replit

### Automatic Deployment
The project is pre-configured for Replit deployment:

1. **Import to Replit**
   - Fork this repository or import directly to Replit
   - Dependencies install automatically
   - Application starts with `npm run dev`

2. **Access Your Application**
   - Application runs on port 5000
   - Access via your Replit URL: `https://your-repl-name.your-username.repl.co`

3. **Environment Configuration**
   - Uses in-memory storage by default
   - No additional configuration required for development

### Replit Production Deployment

1. **Enable Always On** (for continuous operation)
2. **Configure Database** (optional)
   ```bash
   # Set environment variables in Replit Secrets
   DATABASE_URL=your_postgresql_url
   NODE_ENV=production
   ```

3. **Custom Domain** (optional)
   - Configure custom domain in Replit settings
   - Update CORS settings if needed

## 🐳 Docker Deployment

### Docker Configuration

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/edgerack
    depends_on:
      - db
    
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=edgerack
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy with Docker

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ Cloud Platform Deployment

### Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create edgerack-cooling-system
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Configure Build**
   Add to `package.json`:
   ```json
   {
     "scripts": {
       "start": "npm run dev",
       "heroku-postbuild": "npm run build"
     }
   }
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Configure `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       },
       {
         "src": "client/**/*",
         "use": "@vercel/static-build"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/server/index.ts"
       },
       {
         "src": "/(.*)",
         "dest": "/client/$1"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Railway Deployment

1. **Connect GitHub Repository**
   - Link your GitHub repository to Railway
   - Railway auto-detects Node.js application

2. **Add Database**
   - Add PostgreSQL plugin in Railway dashboard
   - Environment variables are automatically configured

3. **Configure Build**
   ```json
   {
     "scripts": {
       "build": "npm run build",
       "start": "npm run dev"
     }
   }
   ```

## 🗄️ Database Configuration

### PostgreSQL Setup

#### Local Development
```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt install postgresql  # Ubuntu

# Create database
createdb edgerack_dev

# Set environment variable
export DATABASE_URL="postgresql://username:password@localhost:5432/edgerack_dev"
```

#### Production Database

**Neon (Recommended)**
```bash
# Sign up at neon.tech
# Create database
# Copy connection string to environment variables
DATABASE_URL="postgresql://user:password@ep-example.us-east-2.aws.neon.tech/dbname?sslmode=require"
```

**Amazon RDS**
```bash
# Create PostgreSQL instance in AWS RDS
# Configure security groups
# Set connection string
DATABASE_URL="postgresql://user:password@db.region.rds.amazonaws.com:5432/edgerack"
```

### Database Migrations

```bash
# Generate migration
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (if applicable)
npm run db:seed
```

## 🔧 Environment Configuration

### Environment Variables

Create `.env` file:
```env
# Application
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=your_postgresql_connection_string

# Session Secret
SESSION_SECRET=your_random_session_secret

# CORS Origins (if needed)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Production Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` |
| `SESSION_SECRET` | Session encryption key | Random string |
| `ALLOWED_ORIGINS` | CORS allowed origins | `https://yourdomain.com` |

## 🔒 Security Configuration

### HTTPS Setup

**With Reverse Proxy (Nginx)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Security Headers

Add to server configuration:
```typescript
// server/index.ts
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

## 📊 Monitoring and Logging

### Application Monitoring

**PM2 Process Manager**
```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'edgerack-cooling',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
EOF

# Start application
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Logs
pm2 logs
```

### Health Checks

Add health check endpoint:
```typescript
// server/routes.ts
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

## 🚀 Performance Optimization

### Build Optimization

```bash
# Production build with optimizations
NODE_ENV=production npm run build

# Analyze bundle size
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/stats.json
```

### Caching Strategy

**HTTP Caching**
```typescript
// Static assets caching
app.use(express.static('client/dist', {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// API response caching
app.use('/api', (req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  }
  next();
});
```

### Database Performance

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_cooling_data_timestamp ON cooling_unit_data(timestamp);
CREATE INDEX idx_cooling_data_unit_id ON cooling_unit_data(unit_id);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM cooling_unit_data WHERE timestamp > NOW() - INTERVAL '1 hour';
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to production
      run: |
        # Add deployment commands here
        echo "Deploying to production..."
```

## 🆘 Troubleshooting

### Common Deployment Issues

**Port Issues**
```bash
# Check if port is in use
lsof -i :5000

# Kill process using port
kill -9 $(lsof -t -i:5000)
```

**Database Connection**
```bash
# Test database connection
psql $DATABASE_URL

# Check database logs
tail -f /var/log/postgresql/postgresql-*.log
```

**Memory Issues**
```bash
# Check memory usage
free -h
htop

# Increase Node.js memory limit
node --max-old-space-size=4096 server/index.js
```

### Log Analysis

```bash
# Application logs
tail -f logs/app.log

# System logs
journalctl -u edgerack-cooling -f

# Database logs
tail -f /var/log/postgresql/postgresql-*.log
```

## 📞 Support

For deployment support:

- **Documentation Issues**: Create GitHub issue
- **Platform-Specific Problems**: Refer to platform documentation
- **Database Issues**: Check database provider documentation
- **Performance Problems**: Review monitoring and logging sections

---

**Successful deployment ensures reliable industrial monitoring and control system operation.**