# Kindora – Community for Good

Kindora is a social development events platform where people can discover community events, participate in meaningful activities, and create positive social impact.

## Live Website
https://YOUR-VERCEL-URL.vercel.app

## Key Features

1. Email and Password Authentication.
2. Google OAuth Login and Registration.
3. Browse upcoming community events.
4. Search events and filter by category.
5. Create, edit, and delete personal events.
6. Join events and prevent duplicate participation.
7. View joined events in chronological order.
8. View and update user profiles.
9. Responsive design for mobile, tablet, and desktop.
10. Light and Dark theme with persistence.
11. Loading skeletons for better user experience.
12. JWT-protected backend APIs.

## Technologies Used

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT
- next-themes

## Application Routes

| Route | Description |
|---|---|
| / | Homepage |
| /events | Upcoming Events |
| /events/[id] | Event Details |
| /create-event | Create Event |
| /manage-events | Manage Events |
| /joined-events | Joined Events |
| /profile | User Profile |
| /login | Login |
| /register | Registration |

## Installation

Clone the repository:

    git clone https://github.com/nibirshafuan/kindora-client.git

Enter the project directory:

    cd kindora-client

Install dependencies:

    npm install

Create a .env.local file:

    NEXT_PUBLIC_API_URL=http://localhost:5000

Run the development server:

    npm run dev

Open http://localhost:3000

## Production Build

    npm run build
    npm start

## Author

Nibir Shafuan  
Department of Computer Science and Engineering  
Daffodil International University

## License

Developed for academic purposes.
