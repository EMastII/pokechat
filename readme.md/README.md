# PokéChat - Team Communication Platform

PokéChat is a Pokémon-inspired messaging app built for friendly, modern team communication. It blends polished React UI, profile customization, and real-time chat interactions into a playful but professional collaboration experience.

## 🎯 Overview

This project is designed to feel both approachable and functional: users can create an account, choose a favorite Pokémon, personalize their profile, and join a shared team chat experience. It showcases a lightweight frontend stack, mock backend logic, and a clean dashboard-first interface suitable for portfolio work and concept demos.

## 🔗 GitHub Repository

- Repository: https://github.com/EMastII/pokechat
- Live demo: https://emastii.github.io/pokechat/
- Clone: `git clone https://github.com/EMastII/pokechat.git`
- Issues and project updates: https://github.com/EMastII/pokechat/issues

## ✨ Features

- **User Authentication**: Sign up and sign in with email and password
- **Pokémon Profile Integration**: Select a favorite Pokémon using the PokeAPI integration
- **Real-Time Messaging**: Send and receive messages instantly with other users
- **User Profiles**: Edit and manage user profile information
- **Persistent Storage**: User sessions saved to localStorage for continuous access
- **Responsive Design**: Mobile-friendly interface with smooth animations
- **Date & Time Formatting**: Messages organized by date with timestamps

## 🛠️ Tech Stack

### Frontend

- **React 18.2.0** - UI library
- **React Router DOM 6.16.0** - Client-side routing
- **Vite 5.0.0** - Build tool and dev server
- **CSS3** - Styling with custom designs

### Backend

- **Node.js** - JavaScript runtime
- **File-based Database** - JSON files for persistent storage

### APIs

- **PokeAPI** - Pokémon data and images

## 📁 Project Structure

```
pokechat/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx              # Landing page
│   │   ├── SignUpPage.jsx            # User registration
│   │   ├── SignInPage.jsx            # User login
│   │   ├── Dashboard.jsx             # Main chat interface
│   │   ├── EditProfileModal.jsx      # Profile editor
│   │   ├── AuthPages.css             # Auth page styles
│   │   ├── Dashboard.css             # Dashboard styles
│   │   └── HomePage.css              # Home page styles
│   ├── context/
│   │   └── UserContext.jsx           # User state management
│   ├── utils/
│   │   ├── api.js                    # API calls (sign up, sign in, messages)
│   │   └── pokeApi.js                # PokeAPI integration
│   ├── App.jsx                       # Main app component with routing
│   ├── App.css                       # App styles
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Global styles
├── data/                             # Mock database (created at runtime)
│   ├── users.json                    # User data
│   └── messages.json                 # Message data
├── disti/                            # Build output folder
├── readme.md/                        # Documentation folder
├── index.html                        # HTML template
├── package.json                      # Project dependencies
├── server.js                         # Mock Node.js server
├── vite.config.js                    # Vite configuration
└── .gitignore                        # Git ignore file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   cd pokechat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3001/` (or the next available port)

4. **Start the mock backend server** (in a separate terminal)
   ```bash
   npm run server
   ```

## 📝 Usage

### Home Page

- Landing page with Pokémon background imagery
- Options to sign in or sign up

### Sign Up

- Enter name, email, password
- Select favorite Pokémon (search or random selection)
- View Pokémon preview
- Create account

### Sign In

- Enter email and password
- Redirects to dashboard on successful login

### Dashboard

- View real-time team messages
- Send messages in the chat
- Display user profile with Pokémon avatar
- Edit profile information
- Sign out

## 🔄 Routing

The app uses React Router with the following routes:

- `/` - Home page (public)
- `/signup` - Sign up page (public)
- `/signin` - Sign in page (public)
- `/dashboard` - Chat dashboard (protected - requires login)

Protected routes automatically redirect unauthenticated users to the home page.

## 💾 Data Management

### User Context

- Manages global user state using React Context API
- Persists user data to localStorage
- Provides `login()`, `logout()`, and `updateUser()` functions

### Local Storage

- User data stored as `pokechat_user` in browser localStorage
- Survives page refreshes and browser sessions

### Mock Database

- Users and messages stored in JSON files (`data/users.json`, `data/messages.json`)
- Created automatically when server starts

## 🎨 UI/UX Features

- **Loading State**: Spinner displayed while checking authentication
- **Error Handling**: User-friendly error messages
- **Form Validation**: Ensures all required fields are filled
- **Auto-scroll**: Messages automatically scroll to latest message
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm preview

# Start mock backend server
npm run server
```

## 🔐 Authentication Flow

1. User fills sign up/sign in form
2. Form submitted to backend API
3. Backend validates credentials
4. On success: User data returned and stored in localStorage
5. App navigates to `/dashboard`
6. User remains logged in across sessions

## 🐛 Troubleshooting

### Port Already in Use

- Vite will automatically use the next available port (3001, 3002, etc.)

### Messages Not Loading

- Ensure server is running with `npm run server`
- Check browser console for API errors

### Can't Sign In

- Verify email and password are correct
- Check that mock server is running
- Clear browser localStorage and try again

## 🎯 Future Enhancements

- [ ] Direct messaging between users
- [ ] Message search functionality
- [ ] User presence indicators
- [ ] Message reactions/emojis
- [ ] File/image sharing in messages
- [ ] Real database integration (MongoDB)
- [ ] Backend API deployment

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**_*Built by English Mast*_**
