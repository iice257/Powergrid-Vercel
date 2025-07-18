-- PowerGrid Database Schema
-- PostgreSQL database setup for electricity tracking app

-- Create database (run this separately as superuser)
-- CREATE DATABASE powergrid;
-- CREATE DATABASE powergrid_test;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    hashed_password VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    oauth_provider VARCHAR(50), -- 'google', 'apple', etc.
    oauth_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Power logs table
CREATE TABLE power_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('on', 'off')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_name VARCHAR(255),
    confidence_score DECIMAL(3, 2) DEFAULT 1.0,
    is_verified BOOLEAN DEFAULT TRUE,
    sync_status VARCHAR(20) DEFAULT 'synced' CHECK (sync_status IN ('synced', 'pending', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outage reports table
CREATE TABLE outage_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved')),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_name VARCHAR(255),
    photo_url VARCHAR(500),
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User statistics table
CREATE TABLE user_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_logs INTEGER DEFAULT 0,
    total_credits INTEGER DEFAULT 0,
    reliability_score DECIMAL(5, 2) DEFAULT 0.0,
    last_log_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit transactions table
CREATE TABLE credit_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('log', 'report', 'bonus', 'redemption')),
    description VARCHAR(255),
    reference_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    criteria TEXT NOT NULL, -- JSON string with criteria
    credits_reward INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements table
CREATE TABLE user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Notification tokens table (for push notifications)
CREATE TABLE notification_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    platform VARCHAR(20) NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_power_logs_user_id ON power_logs(user_id);
CREATE INDEX idx_power_logs_timestamp ON power_logs(timestamp);
CREATE INDEX idx_power_logs_location ON power_logs(latitude, longitude);
CREATE INDEX idx_outage_reports_user_id ON outage_reports(user_id);
CREATE INDEX idx_outage_reports_location ON outage_reports(latitude, longitude);
CREATE INDEX idx_outage_reports_status ON outage_reports(status);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_outage_reports_updated_at BEFORE UPDATE ON outage_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default achievements
INSERT INTO achievements (name, title, description, criteria, credits_reward) VALUES
('first_logger', 'First Logger', 'Log your first power status', '{"logs_count": 1}', 10),
('week_warrior', 'Week Warrior', 'Log power status for 7 consecutive days', '{"streak_days": 7}', 50),
('month_master', 'Month Master', 'Maintain a 30-day logging streak', '{"streak_days": 30}', 200),
('community_helper', 'Community Helper', 'Submit 10 detailed outage reports', '{"reports_count": 10}', 100),
('reliable_reporter', 'Reliable Reporter', 'Have 95% of your reports verified', '{"verification_rate": 0.95, "min_reports": 20}', 150),
('streak_legend', 'Streak Legend', 'Achieve a 100-day logging streak', '{"streak_days": 100}', 500);

-- Create a view for user dashboard data
CREATE VIEW user_dashboard AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    us.current_streak,
    us.total_credits,
    us.reliability_score,
    us.last_log_date,
    COUNT(pl.id) as total_logs_count,
    COUNT(CASE WHEN pl.timestamp >= CURRENT_DATE THEN 1 END) as today_logs_count,
    COUNT(or_table.id) as total_reports_count
FROM users u
LEFT JOIN user_stats us ON u.id = us.user_id
LEFT JOIN power_logs pl ON u.id = pl.user_id
LEFT JOIN outage_reports or_table ON u.id = or_table.user_id
GROUP BY u.id, u.first_name, u.last_name, u.email, us.current_streak, 
         us.total_credits, us.reliability_score, us.last_log_date;

-- Create a function to calculate uptime percentage
CREATE OR REPLACE FUNCTION calculate_uptime_percentage(
    p_user_id INTEGER,
    p_days INTEGER DEFAULT 7
) RETURNS DECIMAL AS $$
DECLARE
    total_logs INTEGER;
    on_logs INTEGER;
    uptime_percentage DECIMAL;
BEGIN
    -- Get total logs in the specified period
    SELECT COUNT(*) INTO total_logs
    FROM power_logs
    WHERE user_id = p_user_id
    AND timestamp >= NOW() - INTERVAL '1 day' * p_days;
    
    -- Get 'on' logs in the specified period
    SELECT COUNT(*) INTO on_logs
    FROM power_logs
    WHERE user_id = p_user_id
    AND status = 'on'
    AND timestamp >= NOW() - INTERVAL '1 day' * p_days;
    
    -- Calculate percentage
    IF total_logs > 0 THEN
        uptime_percentage := (on_logs::DECIMAL / total_logs::DECIMAL) * 100;
    ELSE
        uptime_percentage := 0;
    END IF;
    
    RETURN ROUND(uptime_percentage, 2);
END;
$$ LANGUAGE plpgsql;

-- Create a function to update user streaks
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id INTEGER) RETURNS VOID AS $$
DECLARE
    last_log_date DATE;
    current_date_val DATE := CURRENT_DATE;
    streak_count INTEGER := 0;
    temp_date DATE;
BEGIN
    -- Get the most recent log date
    SELECT DATE(timestamp) INTO last_log_date
    FROM power_logs
    WHERE user_id = p_user_id
    ORDER BY timestamp DESC
    LIMIT 1;
    
    -- If no logs exist, set streak to 0
    IF last_log_date IS NULL THEN
        UPDATE user_stats SET current_streak = 0 WHERE user_id = p_user_id;
        RETURN;
    END IF;
    
    -- Calculate streak by checking consecutive days
    temp_date := current_date_val;
    WHILE temp_date >= last_log_date LOOP
        -- Check if there's a log for this date
        IF EXISTS (
            SELECT 1 FROM power_logs 
            WHERE user_id = p_user_id 
            AND DATE(timestamp) = temp_date
        ) THEN
            streak_count := streak_count + 1;
            temp_date := temp_date - INTERVAL '1 day';
        ELSE
            EXIT;
        END IF;
    END LOOP;
    
    -- Update user stats
    UPDATE user_stats 
    SET 
        current_streak = streak_count,
        longest_streak = GREATEST(longest_streak, streak_count),
        last_log_date = last_log_date
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE users IS 'User accounts with authentication and profile information';
COMMENT ON TABLE power_logs IS 'Individual power status logs from users';
COMMENT ON TABLE outage_reports IS 'Detailed outage reports with location and severity';
COMMENT ON TABLE user_stats IS 'Aggregated statistics for each user';
COMMENT ON TABLE credit_transactions IS 'Credit earning and spending history';
COMMENT ON TABLE achievements IS 'Available achievements and rewards';
COMMENT ON TABLE user_achievements IS 'Achievements earned by users';
COMMENT ON FUNCTION calculate_uptime_percentage IS 'Calculate uptime percentage for a user over specified days';
COMMENT ON FUNCTION update_user_streak IS 'Update user logging streak based on consecutive days';
