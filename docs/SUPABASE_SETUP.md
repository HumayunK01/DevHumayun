# Supabase Visitor Counter Setup Guide

This guide will help you set up the visitor counter with Supabase for your portfolio.

## 📋 Prerequisites

- A Supabase account (free tier is sufficient)
- Your portfolio project

## 🚀 Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Create a new project:
   - **Organization**: Create new or select existing
   - **Project Name**: `devhumayun-portfolio` (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
   - **Pricing Plan**: Free tier is perfect for this

## 🗄️ Step 2: Create the Database Table

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create the visitor_stats table
CREATE TABLE visitor_stats (
  id INTEGER PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert initial row with starting count
INSERT INTO visitor_stats (id, count) VALUES (1, 0);

-- Enable Row Level Security (RLS)
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access"
  ON visitor_stats
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow anyone to update
CREATE POLICY "Allow public update access"
  ON visitor_stats
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create policy to allow anyone to insert
CREATE POLICY "Allow public insert access"
  ON visitor_stats
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function
CREATE TRIGGER update_visitor_stats_updated_at
  BEFORE UPDATE ON visitor_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run** or press `Ctrl+Enter`
5. You should see "Success. No rows returned"

## 🔑 Step 3: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll see two important values:
   - **Project URL**: Something like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`

## 📝 Step 4: Configure Your Project

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the values with your actual credentials from Step 3

## 🔒 Step 5: Update .gitignore

Make sure your `.env` file is in `.gitignore`:

```
# Environment variables
.env
.env.local
.env.production
```

## ✅ Step 6: Test Locally

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:8080`
3. You should see the visitor counter in the navbar!
4. Refresh the page - the count should increment

## 🚀 Step 7: Deploy to Production

### For Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add both variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
4. Redeploy your site

### For Netlify:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add both variables
4. Redeploy

## 🎨 Customization

### Change Starting Count

To change the initial visitor count, run this in Supabase SQL Editor:

```sql
UPDATE visitor_stats SET count = 1000 WHERE id = 1;
```

### View Current Count

To check the current count:

```sql
SELECT * FROM visitor_stats WHERE id = 1;
```

### Reset Count

To reset to zero:

```sql
UPDATE visitor_stats SET count = 0 WHERE id = 1;
```

## 🔍 Monitoring

You can monitor your visitor count in real-time:

1. Go to Supabase Dashboard → **Table Editor**
2. Select `visitor_stats` table
3. You'll see the count update as visitors come to your site

## 🐛 Troubleshooting

### Counter not showing?

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Make sure Supabase URL and key are correct
4. Check that the table was created successfully

### Counter not incrementing?

1. Check RLS policies are enabled
2. Verify the SQL policies were created
3. Check browser console for API errors

### "Failed to fetch" error?

1. Check your internet connection
2. Verify Supabase project is active
3. Check if you've exceeded free tier limits (unlikely)

## 📊 Free Tier Limits

Supabase free tier includes:
- ✅ 500MB database space (plenty for this)
- ✅ 2GB bandwidth per month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

Your visitor counter will use minimal resources!

## 🎉 You're Done!

Your visitor counter is now live and will persist across all visitors! Every time someone visits your portfolio, the count will increment and be stored in Supabase.

---

**Need help?** Check the [Supabase Documentation](https://supabase.com/docs) or open an issue in your repository.
