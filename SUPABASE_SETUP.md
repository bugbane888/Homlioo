# Homlioo Supabase Backend Setup

This guide will help you connect the Homlioo frontend to your Supabase backend.

## Prerequisites

- A Supabase account ([supabase.com](https://supabase.com))
- An existing Supabase project

---

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## Step 2: Configure Environment Variables

Update the `.env` file in the project root:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 3: Run the Database Migration

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste it into the SQL Editor
6. Click **Run** to execute

This will create:
- `profiles` table (user data)
- `properties` table (PG listings)
- `enquiries` table (student leads)
- `favorites` table (saved properties)
- Row Level Security policies
- Auto-create profile trigger
- Seed data (4 sample properties)

---

## Step 4: Create an Admin User

1. Go to **Authentication** → **Users** in Supabase
2. Click **Add User** → **Create new user**
3. Enter email and password
4. After creation, go to **SQL Editor** and run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

---

## Step 5: Start the Application

```bash
npm start
```

The app will now connect to your Supabase backend!

---

## Features Implemented

### Authentication
- Email/password signup & login
- Session persistence
- Role-based access (user/admin)
- Auto-profile creation on signup

### Properties
- Full CRUD operations
- Real-time updates
- Filtering & search
- Admin-only write access

### Enquiries
- Create enquiries (public)
- Status management (admin)
- Real-time updates
- Delete functionality

### Favorites
- Sync with database for logged-in users
- LocalStorage fallback for guests
- Optimistic updates

---

## Troubleshooting

### "Missing Supabase credentials" error
- Ensure `.env` file has the correct values
- Restart the dev server after changing `.env`

### Properties not loading
- Check if the migration was run successfully
- Verify RLS policies are enabled
- Check browser console for errors

### Can't login as admin
- Ensure you've updated the profile role to 'admin'
- Check if the user exists in both `auth.users` and `profiles` tables

### Real-time not working
- Enable Realtime in Supabase: **Database** → **Replication** → Enable for tables

---

## Database Schema

```
profiles
├── id (UUID, PK, FK → auth.users)
├── name
├── email
├── phone
├── role (user/admin)
├── photo_url
└── timestamps

properties
├── id (BIGSERIAL, PK)
├── name, locality, college
├── price, total, gender, sharing
├── rating, reviews, verified, rooms_left
├── amenities[], tags[], rules[]
├── metro, hospital, map_url, description
├── created_by (FK → profiles)
└── timestamps

enquiries
├── id (BIGSERIAL, PK)
├── student_name, phone, email, message
├── property_id (FK → properties)
├── pg_name, status
└── timestamps

favorites
├── id (BIGSERIAL, PK)
├── user_id (FK → profiles)
├── property_id (FK → properties)
└── created_at
```

---

## Security

All tables have Row Level Security (RLS) enabled:

- **Properties**: Public read, admin-only write
- **Enquiries**: Public create, admin-only read/update/delete
- **Favorites**: Users can only access their own
- **Profiles**: Users can read/update their own, admins can read all
