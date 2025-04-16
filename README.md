# MangaVerse

![MangaVerse Logo](public/logo.png)

A modern, responsive manga reading platform built with Next.js, TypeScript, and Tailwind CSS. MangaVerse offers a seamless reading experience with features like bookmarking, different reading modes, and a comprehensive manga library.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Reading Modes](#reading-modes)
  - [Bookmarking](#bookmarking)
  - [User Authentication](#user-authentication)
- [API Integration](#api-integration)
  - [MangaDex API](#mangadex-api)
  - [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## ✨ Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Multiple Reading Modes**: 
  - Standard page-by-page reading
  - Infinite scroll reading
  - Double-page spread mode
- **User Features**:
  - User authentication (login/register)
  - Bookmarking favorite manga
  - Reading history tracking
- **Manga Library**:
  - Browse by popularity, recent updates, new releases, and trending
  - Filter by genres
  - Search functionality
- **Chapter Navigation**:
  - Easy chapter selection
  - Page navigation with keyboard shortcuts
  - Zoom controls
- **Dark/Light Mode**: Toggle between dark and light themes

## 🛠️ Tech Stack

- **Frontend**:
  - [Next.js 14](https://nextjs.org/) - React framework
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Tailwind CSS](https://tailwindcss.com/) - Styling
  - [Shadcn UI](https://ui.shadcn.com/) - UI components
  - [Lucide React](https://lucide.dev/) - Icons
- **State Management**:
  - React Context API
  - Local Storage for persistence
- **API Integration**:
  - [MangaDex API](https://api.mangadex.org/docs/) - Manga data source

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/mangaverse.git
   cd mangaverse
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# MangaDex API
NEXT_PUBLIC_MANGADEX_API_URL=https://api.mangadex.org
MANGADEX_CLIENT_ID=your_client_id
MANGADEX_CLIENT_SECRET=your_client_secret
MANGADEX_USERNAME=your_username
MANGADEX_PASSWORD=your_password
MANGADEX_API_KEY=your_api_key

# Site Configuration
NEXT_PUBLIC_SITE_NAME=MangaVerse
NEXT_PUBLIC_ITEMS_PER_PAGE=24
NEXT_PUBLIC_ENABLE_ANALYTICS=false
\`\`\`

## 📖 Usage

### Reading Modes

MangaVerse offers two primary reading modes:

1. **Standard Reader**: Navigate through pages one by one with left/right controls.
   - Access via `/chapter/[manga]/[number]`
   - Toggle double-page mode for a more authentic manga experience
   - Zoom controls for adjusting page size

2. **Infinite Scroll Reader**: Scroll through all pages continuously.
   - Access via `/chapter/[manga]/[number]/infinite`
   - Automatically loads the next chapter when you reach the end

### Bookmarking

- Click the heart icon on any manga card or manga detail page to bookmark
- Access your bookmarks via the bookmarks page or dropdown menu
- Bookmarks are stored locally and persist between sessions when logged in

### User Authentication

- Register a new account or log in with existing credentials
- Profile management for updating user information
- Secure password reset functionality

## 🔌 API Integration

### MangaDex API

MangaVerse integrates with the MangaDex API to fetch manga data, chapters, and images. The integration is handled through server-side API routes to protect API credentials.

### API Endpoints

The application includes the following API routes:

- `/api/manga/popular` - Get popular manga
- `/api/manga/[id]` - Get manga details
- `/api/manga/[id]/chapters` - Get chapters for a manga
- `/api/chapter/[id]` - Get chapter details
- `/api/chapter/[id]/pages` - Get pages for a chapter
- `/api/search` - Search for manga

## 📁 Project Structure

\`\`\`
mangaverse/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── bookmarks/        # Bookmarks page
│   ├── chapter/          # Chapter reading pages
│   ├── explore/          # Explore/browse pages
│   ├── genres/           # Genre pages
│   ├── manga/            # Manga detail pages
│   ├── profile/          # User profile pages
│   ├── search/           # Search page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable components
│   ├── ui/               # UI components (shadcn)
│   ├── manga-card.tsx    # Manga card component
│   ├── reader-controls.tsx # Reader controls
│   ├── site-header.tsx   # Site header
│   └── ...
├── context/              # React Context providers
├── lib/                  # Utility functions
├── public/               # Static assets
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
\`\`\`

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MangaDex](https://mangadex.org/) for providing the API
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) team for the amazing framework
- All the open-source libraries used in this project

---

Built with ❤️ for manga lovers
