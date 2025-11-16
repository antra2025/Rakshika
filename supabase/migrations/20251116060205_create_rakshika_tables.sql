/*
  # Rakshika Women's Safety Platform Database Schema

  1. New Tables
    - `emergency_contacts`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - for future auth integration
      - `name` (text) - contact person's name
      - `phone` (text) - contact phone number
      - `relationship` (text) - relationship to user
      - `created_at` (timestamp)
    
    - `safety_tips`
      - `id` (uuid, primary key)
      - `title` (text) - tip title
      - `content` (text) - tip content
      - `category` (text) - tip category (general, travel, digital, etc)
      - `is_active` (boolean) - whether tip is currently active
      - `created_at` (timestamp)
    
    - `emergency_alerts`
      - `id` (uuid, primary key)
      - `latitude` (numeric) - location latitude
      - `longitude` (numeric) - location longitude
      - `message` (text) - emergency message
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (auth can be added later)
    - Current setup allows public access for MVP functionality
*/

CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  phone text NOT NULL,
  relationship text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS safety_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'general',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS emergency_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  latitude numeric,
  longitude numeric,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to safety tips"
  ON safety_tips FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow public insert to emergency contacts"
  ON emergency_contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read own contacts"
  ON emergency_contacts FOR SELECT
  USING (true);

CREATE POLICY "Allow public delete own contacts"
  ON emergency_contacts FOR DELETE
  USING (true);

CREATE POLICY "Allow public insert to emergency alerts"
  ON emergency_alerts FOR INSERT
  WITH CHECK (true);

INSERT INTO safety_tips (title, content, category) VALUES
('Stay Alert in Public Spaces', 'Always be aware of your surroundings. Avoid using headphones in both ears when walking alone.', 'general'),
('Share Your Location', 'Let trusted contacts know where you are going and when you expect to arrive.', 'travel'),
('Trust Your Instincts', 'If something feels wrong, it probably is. Do not hesitate to leave uncomfortable situations.', 'general'),
('Keep Emergency Numbers Handy', 'Save emergency contacts and local police numbers in your phone for quick access.', 'general'),
('Use Well-Lit Routes', 'When walking at night, stick to well-lit and populated areas. Avoid shortcuts through dark alleys.', 'travel'),
('Digital Safety', 'Do not share personal information or live location on social media. Review privacy settings regularly.', 'digital'),
('Public Transport Safety', 'Sit near the driver or in crowded areas. Keep your phone charged and accessible.', 'travel');
