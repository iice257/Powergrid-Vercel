# PowerGrid - Electricity Availability Tracker

PowerGrid is a comprehensive mobile-first web application that allows users to track, log, and report electricity availability in their homes or neighborhoods with minimal friction. Built with Next.js and designed for offline-first functionality with seamless sync capabilities.

## 🚀 Features

### Core Functionality
- **One-tap Power Logging**: Quick ON/OFF status logging with timestamps
- **Offline-First Architecture**: Works without internet, syncs when connected
- **Community Mapping**: View power status reports from your area
- **Smart Notifications**: AI-powered suggestions based on device patterns
- **Rewards System**: Earn credits for consistent logging and quality reports

### User Experience
- **Multi-Option Authentication**: Email/Password, Google OAuth, Apple Sign-In, Phone OTP
- **Bottom Tab Navigation**: Ergonomic mobile-first design
- **Dark Mode Support**: System-aware theme switching
- **Progressive Web App**: Install on home screen for native-like experience
- **Accessibility**: Screen reader support and high-contrast options

### Analytics & Insights
- **Personal Stats**: Track uptime percentages, streaks, and reliability scores
- **Interactive Charts**: Visualize power availability trends over time
- **Achievement System**: Unlock rewards for consistent participation
- **Community Insights**: See area-wide power reliability data

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Radix UI** for accessible components

### Backend (Planned)
- **FastAPI** with Python
- **PostgreSQL** for data storage
- **Redis** for caching and background tasks
- **JWT** for authentication
- **Alembic** for database migrations

### Mobile Adaptation
- **Progressive Web App** (PWA) capabilities
- **Service Worker** for offline functionality
- **Web Push API** for notifications
- **Responsive Design** optimized for mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for backend)
- Redis (for caching)

### Frontend Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/powergrid.git
   cd powergrid
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to backend directory**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Create virtual environment**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. **Install Python dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Set up environment variables**
   \`\`\`bash
   cp .env.template .env
   # Edit .env with your database and API credentials
   \`\`\`

5. **Run database migrations**
   \`\`\`bash
   alembic upgrade head
   \`\`\`

6. **Start the API server**
   \`\`\`bash
   uvicorn app.main:app --reload
   \`\`\`

## 📱 Mobile Development

### React Native Adaptation
This web version serves as a foundation for React Native development:

1. **Shared Components**: UI components can be adapted to React Native
2. **State Management**: Redux/Context patterns transfer directly
3. **API Integration**: HTTP clients work across platforms
4. **Offline Logic**: AsyncStorage replaces localStorage

### Key Adaptations Needed
- Replace Next.js routing with React Navigation
- Swap web components for React Native equivalents
- Implement native push notifications
- Add device-specific features (camera, location)

## 🏗 Architecture

### Frontend Structure
\`\`\`
app/
├── (auth)/          # Authentication pages
├── api/             # API routes (if using Next.js API)
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── styles/          # Global styles
└── types/           # TypeScript type definitions
\`\`\`

### Backend Structure
\`\`\`
backend/
├── app/
│   ├── api/         # API endpoints
│   ├── core/        # Configuration and security
│   ├── models/      # Database models
│   ├── schemas/     # Pydantic schemas
│   ├── services/    # Business logic
│   └── utils/       # Helper functions
├── alembic/         # Database migrations
└── tests/           # Test files
\`\`\`

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_APPLE_CLIENT_ID=your_apple_client_id
\`\`\`

#### Backend (.env)
\`\`\`env
DATABASE_URL=postgresql://user:password@localhost:5432/powergrid
SECRET_KEY=your-secret-key-here
GOOGLE_OAUTH_CLIENT_SECRET=your_google_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
\`\`\`

## 🧪 Testing

### Frontend Tests
\`\`\`bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run type-check    # TypeScript type checking
\`\`\`

### Backend Tests
\`\`\`bash
cd backend
pytest                # Run all tests
pytest --cov         # Run with coverage
\`\`\`

## 📦 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Set up PostgreSQL and Redis instances
2. Configure environment variables
3. Deploy using Docker or buildpacks

### Mobile App Deployment
1. **iOS**: Use Xcode and App Store Connect
2. **Android**: Use Android Studio and Google Play Console
3. **PWA**: Deploy web version with manifest.json

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure mobile responsiveness
- Test offline functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Recharts** for beautiful data visualization
- **FastAPI** for modern Python web framework

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Basic power logging functionality
- [x] User authentication system
- [x] Responsive web interface
- [x] Offline-first architecture
- [ ] Push notifications

### Phase 2 (Next)
- [ ] React Native mobile apps
- [ ] Advanced analytics dashboard
- [ ] Community features and social aspects
- [ ] Integration with utility company APIs
- [ ] Machine learning for outage prediction

### Phase 3 (Future)
- [ ] IoT device integration
- [ ] Satellite data integration
- [ ] Government partnership features
- [ ] Enterprise dashboard
- [ ] API for third-party developers

## 📞 Support

For support, email support@powergrid.app or join our Discord community.

---

**PowerGrid** - Empowering communities through transparent electricity tracking ⚡
