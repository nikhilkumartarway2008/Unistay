-- UniStay Production Schema (PostgreSQL / Google Cloud SQL)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  security_question TEXT,
  security_answer_hash TEXT,
  role VARCHAR(50) NOT NULL DEFAULT 'STUDENT',
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  profile_photo_url TEXT,
  university_id VARCHAR(100),
  city_id VARCHAR(100),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profiles_user ON profiles(user_id);

CREATE TABLE IF NOT EXISTS student_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  budget_min INTEGER DEFAULT 0,
  budget_max INTEGER DEFAULT 50000,
  preferred_city_id VARCHAR(100),
  preferred_area_id VARCHAR(100),
  university_id VARCHAR(100),
  room_type VARCHAR(50),
  food_preference VARCHAR(50),
  distance_preference VARCHAR(50),
  study_environment VARCHAR(50),
  privacy_preference VARCHAR(50),
  noise_preference VARCHAR(50),
  cleanliness_preference VARCHAR(50),
  wifi_required BOOLEAN DEFAULT TRUE,
  food_required BOOLEAN DEFAULT TRUE,
  attached_bathroom_required BOOLEAN DEFAULT FALSE,
  furnished_required BOOLEAN DEFAULT TRUE,
  move_in_date VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_props_user ON saved_properties(user_id);

CREATE TABLE IF NOT EXISTS property_comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id VARCHAR(100) NOT NULL,
  comparison_group VARCHAR(100) DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comparisons_user ON property_comparisons(user_id);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id VARCHAR(100) NOT NULL,
  room_id VARCHAR(100),
  booking_status VARCHAR(50) DEFAULT 'REQUESTED',
  move_in_date VARCHAR(50),
  move_out_date VARCHAR(50),
  amount NUMERIC(10, 2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'INR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_student ON bookings(student_id);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id VARCHAR(100) NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  status VARCHAR(50) DEFAULT 'PUBLISHED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_prop ON reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

CREATE TABLE IF NOT EXISTS roommate_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  sleep_schedule VARCHAR(50),
  study_schedule VARCHAR(50),
  noise_preference VARCHAR(50),
  cleanliness_preference VARCHAR(50),
  guest_preference VARCHAR(50),
  cooking_preference VARCHAR(50),
  privacy_preference VARCHAR(50),
  budget INTEGER DEFAULT 15000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_cost_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  food_budget INTEGER DEFAULT 4500,
  transport_budget INTEGER DEFAULT 1500,
  laundry_budget INTEGER DEFAULT 500,
  internet_budget INTEGER DEFAULT 800,
  other_monthly_budget INTEGER DEFAULT 2000,
  currency VARCHAR(10) DEFAULT 'INR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_conv_user ON ai_conversations(user_id);

CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_msg_conv ON ai_messages(conversation_id);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notif_user ON notifications(user_id);

CREATE TABLE IF NOT EXISTS owner_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255),
  description TEXT,
  contact_preferences VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Properties published by owners
CREATE TABLE IF NOT EXISTS owner_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_name VARCHAR(255) NOT NULL,
  property_type VARCHAR(50) NOT NULL, -- PG, Hostel, Flat, Private Room
  address TEXT NOT NULL,
  area VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  university_id VARCHAR(100),
  description TEXT,
  property_rules TEXT,
  amenities TEXT[],
  room_types TEXT[],
  rent NUMERIC(10,2) NOT NULL DEFAULT 0,
  security_deposit NUMERIC(10,2) DEFAULT 0,
  maintenance NUMERIC(10,2) DEFAULT 0,
  electricity_included BOOLEAN DEFAULT FALSE,
  food_available BOOLEAN DEFAULT FALSE,
  internet_included BOOLEAN DEFAULT TRUE,
  status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, PENDING_VERIFICATION, PUBLISHED, PAUSED, FULL, ARCHIVED
  completeness_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_owner_props_owner ON owner_properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_owner_props_status ON owner_properties(status);

-- Property Media Model (Cloud Storage metadata)
CREATE TABLE IF NOT EXISTS property_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES owner_properties(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  storage_path TEXT NOT NULL,
  media_type VARCHAR(50) DEFAULT 'IMAGE',
  category VARCHAR(50) NOT NULL, -- EXTERIOR, ENTRANCE, ROOM, BED, BATHROOM, KITCHEN, COMMON_AREA, STUDY_AREA, BALCONY, PARKING, LAUNDRY, GYM, OTHER
  is_cover BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  verification_status VARCHAR(50) DEFAULT 'OWNER_UPLOADED', -- OWNER_UPLOADED, VERIFIED, REPORTED, UNDER_REVIEW
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_prop_media_prop ON property_media(property_id);

CREATE TABLE IF NOT EXISTS property_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES owner_properties(id) ON DELETE CASCADE,
  changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  change_summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS property_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES owner_properties(id) ON DELETE CASCADE,
  reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
  reason VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
