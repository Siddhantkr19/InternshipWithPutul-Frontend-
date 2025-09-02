# InternshipWithPutul

This is the frontend for a modern, full-stack internship portal built with React and Vite, for discovering and managing tech internships, featuring user authentication and an admin dashboard.

It features a public-facing, single-page website for viewing internships and a secure, protected admin dashboard for managing all site content.

**Live Demo**  - https://internshipwithputul.netlify.app/

 ## Features

**HomePage**:  A single, smooth-scrolling homepage  Includes Hero, About, Internships, Contact, and Footer components for a complete landing experience.

**InternshipsPage**: Displays a list of available internships.

**LoginPage**: User authentication with API integration.

**Admin Dashboard**: 
   Manage Internships: Add, edit, and delete internship postings.
   
   Manage Messages: View and respond to user queries.
   
   Manage Users: Add and remove users with role-based access.
  
**Responsive Design**: Optimized for desktop and mobile devices.

**Custom Styles**: Styled components for Navbar, Sidebar, Footer, and more.

**Secure Admin Panel**: A token-based login system that leads to a protected, multi-page admin dashboard built with React Router.
 
**Full CRUD Functionality:** Admins can Create, Read, Update, and Delete (CRUD) internship listings.

**User & Message Management**: Admins can view and delete user-submitted messages and manage user accounts (add/delete).

**Modern UI/UX:** A fully responsive design that looks great on all devices, complete with a switchable Light/Dark theme.

**Visitor Counter:** A live visitor counter is displayed in the admin navbar.

 **Vite Configuration**: Fast development and build setup.


## Technologies Used
Framework: React.js (with Vite)

Routing: React Router DOM

API Communication: Axios

Icons: React Icons

Styling: CSS with CSS Variables for theming



## Project Structure

src/component/: Reusable UI components (Navbar, Sidebar, Hero, Footer, etc.)

src/pages/: Page-level components (HomePage, InternshipsPage, LoginPage, AdminDashboard, etc.)

src/styleComponents/: CSS files for component styling

public/: Static assets and redirects

vite.config.js: Vite configuration

## Setup and Installation

To run this project locally, follow these steps:

1) Clone the repository : git clone <your-repository-url>

2) Navigate to the project directory: cd <your-project-directory>

3) Install dependencies: npm install

4) Set up environment variables: Create a new file in the root of the project named .env.local and add the URL of your running backend server.

VITE_API_URL=http://localhost:8080

5) Run the development server: npm run dev

The application will be available at http://localhost:5173.

Environment Variables

This project requires a connection to the backend API to function. The following environment variable must be set in a .env.local file for local development or in your hosting provider's (e.g., Netlify) settings for production.


VITE_API_URL: The base URL of the Spring Boot backend API.
