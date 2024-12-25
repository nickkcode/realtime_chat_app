# Chatterbox

![Chatterbox Logo](https://via.placeholder.com/100x50?text=Chatterbox)

A real-time chat application built using **Next.js** and **Supabase**.
Chatterbox is designed for seamless, responsive communication with a focus on performance and simplicity.

---

## Features

- **Real-time messaging**: Experience instant communication powered by Supabase's real-time features.
- **Minimal UI**: Built with shadcn for a clean and accessible user interface.
- **Authentication**: Secure login and signup with Supabase authentication.
- **Responsive design**: Optimized for mobile, tablet, and desktop devices.
- **Scalable architecture**: Easily extendable to accommodate future growth.

---

## Tech Stack

- **Next.js**: React framework for server-rendered and static web applications.
- **shadcn**: Accessible and customizable components.
- **Supabase**: Backend as a service with real-time database and authentication.
- **Tailwind CSS**: Utility-first CSS framework for styling.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chatterbox.git
   cd chatterbox
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Project Structure

```
chatterbox/
├── components/     # Reusable UI components
├── pages/          # Application routes
├── styles/         # Global and component-specific styles
├── lib/            # Utility functions and configurations
├── public/         # Static assets
└── .env.example    # Environment variable example file
```

---

## Deployment

Chatterbox can be easily deployed using platforms like Vercel. Follow these steps:

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Set up the environment variables in the Vercel dashboard.
4. Deploy the project.

For detailed instructions, visit [Vercel Documentation](https://vercel.com/docs).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries or support, please contact [nickkcode@gmail.com](mailto:nickkcode@gmail.com).

---
