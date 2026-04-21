# Sujo - Nigerian Ajo Platform

A modern web application for rotational savings groups (Ajo) built with Vue 3, featuring a culturally-inspired fintech design.

## 🌟 Features

- **Authentication System**: Login, Signup, and Forgot Password pages
- **Dashboard**: Complete overview with stats, groups, and activity feed
- **Savings Groups**: Track multiple Ajo groups with progress indicators
- **Real-time Chat**: Group messaging interface
- **Activity Feed**: Recent transactions and notifications
- **Responsive Design**: Mobile-friendly interface

## 🎨 Design

- Deep green sidebar (#0F3D2E)
- Warm beige background (#F5F1E8)
- Gold accents (#C8A96A)
- Custom African-inspired icons
- Clean, premium fintech aesthetic

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🛠️ Tech Stack

- **Vue 3** - Composition API
- **Vite** - Build tool
- **Pinia** - State management
- **Vue Router** - Routing
- **Tailwind CSS** - Styling

## 📁 Project Structure

```
src/
├── assets/          # Icons and images
├── components/      # Vue components
│   ├── auth/       # Authentication components
│   ├── dashboard/  # Dashboard components
│   ├── layout/     # Layout components (Sidebar, Header)
│   └── shared/     # Shared components
├── stores/         # Pinia stores
├── router/         # Vue Router configuration
├── views/          # Page views
└── utils/          # Utility functions
```

## 🔐 Authentication

The app includes a complete authentication flow with:
- Login page
- Signup page with validation
- Forgot password page
- Protected routes

## 💾 Mock Data

All data is currently mocked for demonstration purposes. The app uses:
- Mock user authentication
- Mock savings groups
- Mock activity feed
- Mock chat messages

## 📝 License

This is a demo project for educational purposes.
