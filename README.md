
# 🚀 Internship WithPutul (IWP) 2.0 - AI-Powered Portal (Frontend)

**Live Demo:** [https://iwp-pearl.vercel.app/](https://iwp-pearl.vercel.app/)

This is the frontend for **Internship WithPutul (Version 2.0)**, a modern, fully automated internship and job aggregator built with React and Vite. 

Unlike traditional job boards that require manual data entry, this frontend connects to a sophisticated **Spring Boot + Selenium + Gemini AI backend**. The backend autonomously scrapes the web for new tech opportunities, uses AI to parse the messy data into clean JSON, and serves it directly to this beautiful, responsive React user interface in real-time.

### ✨ Key Features

* 🤖 **Autonomous Data Feed:** Displays freshly scraped and AI-parsed internships and jobs without requiring any manual admin uploads.
* ⚡ **Lightning Fast UI:** Built on Vite for instant hot-module replacement and rapid production builds.
* 🛡️ **Secure Admin Dashboard:** A JWT-protected admin panel to monitor the AI's automated postings, manage user accounts, and handle contact queries.
* 📱 **Fully Responsive Design:** Optimized for seamless viewing on desktops, tablets, and mobile devices.
* 🌓 **Modern UI/UX:** Smooth scrolling, clean component architecture, and an intuitive navigation flow.
* 📊 **Live Analytics:** Real-time visitor tracking and database monitoring displayed directly in the admin navbar.

### 🛠️ Technologies Used

* **Framework:** React.js (with Vite)
* **Routing:** React Router DOM
* **API Communication:** Axios (Interfacing with Spring Boot REST APIs)
* **Icons:** React Icons
* **Styling:** Modern CSS / Tailwind CSS (with CSS variables for theming)

### 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Hero, Footer, InternshipCards)
├── pages/            # Public-facing pages (Home, Internships, Jobs, Auth)
├── pages/admin/      # Protected Admin Dashboard pages 
├── services/         # Axios API interceptors (apiPublic.js, apiAdmin.js)
├── context/          # Global state management (AuthContext)
└── styles/           # Global stylesheets and theme configurations
```

### ⚙️ Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd your-repo-name
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a new file in the root of the project named `.env` (or `.env.local`). Add the URL of your running backend server. 
   *(Note: Do not add a trailing slash `/` to the URL)*
   ```env
   # For Local Testing
   # VITE_API_URL=http://localhost:8080

   # For Production / Live Backend
   VITE_API_URL=https://internshipwithputul-6kvg.onrender.com
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. The application will now be available at `http://localhost:5173`.

### 🔐 Environment Variables

This frontend requires a live connection to the backend API to function. The following environment variable must be set in your `.env` file for local development, or in your hosting provider's (e.g., Vercel, Netlify) settings for production:

* `VITE_API_URL`: The base URL of the Spring Boot backend API.

---
*Built with ❤️ by Siddhant Kumar*
