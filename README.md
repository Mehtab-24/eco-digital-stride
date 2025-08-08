🌿 Eco Digital Stride
Eco Digital Stride is a digital carbon footprint tracker that helps you understand the environmental impact of everyday online activities — streaming, cloud storage, device charging, laptop use, and emails.
The goal is simple: raise awareness and enable small, informed changes that add up to a greener digital life.

🌐 Live Demo
🔗 https://eco-digital-stride.vercel.app/

📂 Repository
🔗 https://github.com/Mehtab-24/eco-digital-stride.git

❓ Why Eco Digital Stride?
Our digital habits consume real-world energy. This app turns daily usage into clear CO₂e estimates so you can:

📊 See where your footprint comes from

📈 Make data-driven choices

🌱 Build sustainable digital habits

Note: Estimates are approximations intended to guide awareness and behavior — not exact measurements.

✨ Features
🔢 Carbon Footprint Calculator: Estimate emissions from streaming, cloud storage, device charging, laptop use, and emails

📊 Visual Insights: Category-wise breakdowns with bar and pie charts

🌙 Dark Mode: Readable in light and dark themes

⚡ Instant Feedback: Smooth UX with quick calculations

💡 Actionable Tips: Practical suggestions to reduce your impact

💾 Local Persistence: Results saved via localStorage for a seamless dashboard

📱 Responsive UI: Optimized for desktop and mobile

🛠 Tech Stack
Frontend: React + TypeScript + Vite

Styling: Tailwind CSS

Charts: Recharts

Icons: lucide-react

State/Storage: React state + localStorage

Deployment: Vercel

🚀 Getting Started
1️⃣ Clone the repository
bash
git clone https://github.com/eco-digital-stride/eco-digital-stride.git
Or fork and clone your own copy.

2️⃣ Navigate to the project
bash
cd eco-digital-stride

3️⃣ Install dependencies
bash
npm install

4️⃣ Start the development server
bash
npm run dev
The app will be available at: http://localhost:5173/

5️⃣ Build for production
bash
npm run build

6️⃣ Preview production build
bash
npm run preview

⚙️ How It Works
✏ Input your daily usage (hours, GB, counts)

🧮 Estimation logic applies research-based factors to calculate CO₂e

📊 Results summarize totals and category breakdowns

📈 Charts visualize your footprint

💡 Tips suggest practical reductions tailored to your inputs

💾 Data is stored in localStorage for a persistent dashboard

🗂 App Structure (High Level)
src/pages

🏠 Home: Overview and CTAs

🧮 Calculator: Form to input daily digital activity

📊 Dashboard: Charts, totals, and reduction tips

src/utils

⚙ carbonEstimator: Core estimation logic

src/components

🎨 UI components, theme toggle, cards, buttons

🔒 Data & Privacy
All data stays in your browser via localStorage.
No accounts, no servers, no tracking. ✅

🛣 Roadmap Ideas
🎮 More activity categories (video calls, gaming, smart TVs)

🌍 Regional energy mix adjustments

📅 Weekly/monthly trends and history

📄 Export/share reports (PDF/PNG)

📱 PWA support for offline use

🌐 i18n (multi-language)

🤝 Contributing
Contributions are welcome!

Fork the repo

Create a feature branch

Commit your changes

Open a pull request with a clear description (screenshots if UI-related)

💡 Suggested areas:

New categories

Improved factors

Accessibility

Performance

UI polish

Docs

📜 Scripts
Development: npm run dev

Build: npm run build

Preview: npm run preview

Lint: npm run lint (if configured)

🌱 Impact
Eco Digital Stride encourages:

Conscious streaming and storage habits

Reduced digital waste

A culture of sustainable technology use

Small optimizations, multiplied by many users, make a big difference.

📄 License
MIT License. Use, modify, and share responsibly.

🙏 Acknowledgments
📚 Emission factor inspiration from public research on data center energy use and device consumption

🛠 Built with React, Vite, Tailwind CSS, Recharts, and lucide-react

