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
