# 📸 Анна - Фотограф | Professional Photography Portfolio

A beautiful, responsive photography portfolio website built with React, TypeScript, and Tailwind CSS. Features an elegant design with interactive galleries, booking system, and customer testimonials.

## ✨ Features

- **Responsive Design** - Beautiful on all devices
- **Interactive Gallery** - Full-screen image viewer with navigation
- **Booking Calendar** - Interactive appointment scheduling
- **Customer Testimonials** - Auto-rotating reviews carousel
- **Contact Form** - Professional contact and inquiry system
- **Smooth Animations** - Elegant transitions and hover effects
- **Mobile Menu** - Touch-friendly navigation

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: esbuild
- **Routing**: React Router
- **Icons**: Lucide React
- **Animations**: CSS animations + Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MM-photo1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:8001
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
MM-photo1/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ImageModal.tsx   # Full-screen image viewer
│   │   ├── BookingCalendar.tsx # Appointment scheduler
│   │   └── TestimonialsSection.tsx # Customer reviews
│   ├── pages/
│   │   └── Home.tsx         # Main page component
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # App root component
│   ├── main.tsx             # Entry point
│   └── shadcn.css           # Global styles
├── scripts/
│   └── build.mjs            # Build configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
└── tailwind.config.js       # Tailwind configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Amber/Yellow gradients (#f59e0b to #d97706)
- **Background**: Warm stone and amber tones
- **Text**: Dark gray (#1f2937) with serif typography

### Typography
- **Font Family**: Serif (classic, professional look)
- **Headings**: Large, bold with wide letter spacing
- **Body**: Relaxed line height for readability

### Components
- **Cards**: Elegant shadows with amber borders
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with amber focus states

## 📱 Sections

1. **Hero** - Introduction with photographer's photo and stats
2. **About** - Professional background and philosophy
3. **Portfolio** - Interactive gallery with sample images
4. **Services** - 4 main service packages with pricing
5. **Testimonials** - Customer reviews with auto-rotation
6. **Contact** - Contact form and booking calendar
7. **Footer** - Professional branding

## 🎯 Services Offered

- **Семейная фотосессия** (Family Photography) - from 12,000₽
- **Венчание** (Wedding Ceremony) - from 18,000₽
- **Беременность** (Maternity) - from 9,000₽
- **Индивидуальная** (Individual) - from 7,000₽

## 🔧 Customization

### Adding New Images
Update the `galleryImages` array in `src/pages/Home.tsx`:

```typescript
const galleryImages = [
  { src: "path/to/image.jpg", alt: "Description" },
  // ... more images
];
```

### Modifying Services
Edit the services array in the Services section of `src/pages/Home.tsx`.

### Updating Content
All text content is in Russian and can be found in `src/pages/Home.tsx`.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for professional photographers** 