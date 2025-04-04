# Gain Street Capital

A luxurious website for Gain Street Capital proprietary trading firm featuring TradingView integration and option chain data.

## Deploying to Vercel

Follow these steps to deploy this project to Vercel:

### Prerequisites

1. **GitHub Account**: You need a GitHub account to push your code.
2. **Vercel Account**: Create an account on [Vercel](https://vercel.com) if you don't have one already.
3. **PostgreSQL Database**: You need a PostgreSQL database. You can use services like [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app) to host your database.

### Steps to Deploy

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Other
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Set up Environment Variables**:
   In the Vercel project settings, add the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `PGHOST`: PostgreSQL host
   - `PGPORT`: PostgreSQL port
   - `PGUSER`: PostgreSQL username
   - `PGPASSWORD`: PostgreSQL password
   - `PGDATABASE`: PostgreSQL database name
   - `NODE_ENV`: Set to `production`

4. **Deploy**:
   - Click "Deploy" and wait for the deployment to complete
   - Vercel will provide you with a URL where your site is available

### Database Migration

After deployment, you need to run the database migration to create tables:

1. **Local Method**:
   ```bash
   # Set your Vercel PostgreSQL connection details in .env
   npm run db:push
   ```

2. **Vercel CLI Method**:
   ```bash
   npm install -g vercel
   vercel login
   vercel env pull .env.production
   # Update .env.production with your database connection details
   source .env.production
   npm run db:push
   ```

## Features

- Luxurious dark theme with gold accents
- Real-time market data visualization
- Options chain analysis
- TradingView integration
- Responsive design
- Blog section
- Contact information

## Technologies Used

- React.js
- TypeScript
- Express.js
- PostgreSQL with Drizzle ORM
- TailwindCSS
- TradingView Widget API