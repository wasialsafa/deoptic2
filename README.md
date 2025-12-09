# 🎨 Doptic - Digital Agency Website

A visually captivating digital agency website with premium GSAP animations inspired by i-am-tiago.com and kitpro-emlyn.webflow.io.

---

## ⚙️ Tech Stack & Versions

| Package | Category | Version |
| :--- | :--- | :--- |
| **React** | Framework | `^18.3.1` |
| **Vite** | Build Tool | `^5.4.10` |
| **Tailwind CSS** | Styling | `^3.4.14` |
| **GSAP** | Animation Library | `^3.12.5` |
| **@gsap/react** | GSAP React Integration | `^2.1.1` |
| **React Icons** | Icon Library | `^5.3.0` |

---

## ✨ Key Features

* **Custom Magnetic Cursor:** Smooth following cursor with magnetic hover effects
* **Animated Preloader:** Counter animation with text reveal transition
* **Hero Section:** Text split animations, parallax effects, rotating circular badge
* **Full-Screen Navigation:** Overlay menu with staggered reveal animations
* **About Section:** Diagonal infinite marquee banners with scroll animations
* **Interactive Services:** Hover states with dynamic image transitions
* **ScrollTrigger Animations:** Scroll-based reveals and parallax throughout
* **Magnetic Buttons:** Elastic hover effects on all interactive elements
* **Fully Responsive:** Optimized for all screen sizes with mobile-first design

---

## 🏃 Quick Start

### Prerequisites

You need **Node.js** (v16 or higher) and **npm** installed on your system.

### Installation & Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/wasialsafa/doptic.git
    cd doptic
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The project will open in your browser at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

5.  **Preview production build:**
    ```bash
    npm run preview
    ```

---

## 📁 Project Structure

```
doptic/
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx      # Magnetic cursor component
│   │   ├── Preloader.jsx         # Loading screen animation
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── NavMenu.jsx           # Full-screen menu overlay
│   │   ├── Hero.jsx              # Hero section
│   │   ├── About.jsx             # About section with marquees
│   │   ├── Services.jsx          # Services section
│   │   └── MagneticButton.jsx    # Reusable magnetic button
│   ├── hooks/
│   │   └── useGsapAnimations.js  # Custom GSAP animation hook
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## 🎨 Design Features

### Color Palette
- **Primary Orange:** #FF4920
- **Background Light:** #DFDFF0
- **Text Dark:** #1a1a1a

### Typography
- **Sans-serif:** Inter (simulating General Sans)
- **Serif:** Libre Caslon Text (for italic accents)

---

## 🚀 Animation Highlights

- **Custom Cursor:** Magnetic effect with blend modes
- **Text Reveals:** Split text animations with stagger
- **Parallax Scrolling:** Smooth depth effects
- **Diagonal Marquees:** Infinite scrolling text banners
- **Hover Interactions:** Elastic magnetic button effects
- **Menu Transitions:** Smooth overlay with staggered reveals

---

## 📝 License

This project is open source and available for educational purposes.
