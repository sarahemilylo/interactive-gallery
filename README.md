# Interactive Gallery Experience

An immersive virtual art gallery built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

Visitors can walk through a digital exhibition space, interact with artworks, view detailed analyses, and explore supporting resources related to Indigenous culture, identity, storytelling, and artistic expression.

<img width="2864" height="1509" alt="image" src="https://github.com/user-attachments/assets/c26d19b0-b52f-43c1-a724-689ebfef5c33" />
---

## Features

### 🎨 Interactive Gallery Navigation
- Move through the gallery using:
  - **A / D**
  - **← / →**
- Approach artworks and interact using:
  - **W**
  - **Enter**
  - Mouse click

### 🖼 Artwork Detail Pages
Each artwork includes:
- Title
- Year
- Medium
- Description
- High-resolution artwork image

### 📖 Extended Analysis Pages
Selected artworks contain:
- Main ideas and key messages
- Themes and connections
- Literary analysis
- Visual and audio techniques
- Cultural significance
- Documentary connections
- Contributor profiles

### 🔍 Searchable Gallery Menu
Visitors can:
- Search artworks by title
- Jump directly to a selected artwork
- Return to the home screen

### 🏛 Museum-Inspired Design
- Minimalist gallery environment
- Smooth animations
- Framed artwork displays
- Section dividers
- Responsive layouts
- Side-by-side analysis columns

---

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons

---

## Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/interactive-gallery.git
cd interactive-gallery
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Project Structure

```text
interactive-gallery/
│
├── public/
│   ├── florent-vollant-XL.jpg
│   ├── earth-story-poem.png
│   ├── christi-belcourt-mirror-2.jpg
│   ├── podcast-image.png
│   ├── works-cited.png
│   ├── pierre.png
│   └── nicholas.png
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## Artwork Collection

### 1. *Florent Vollant: I Dream in Innu*
Documentary exploring the relationship between language, culture, identity, and land within Innu communities.

### 2. *Earth Story*
Poem by Nicolas Bonin exploring Indigenous identity, storytelling, and connection to nature.

### 3. *This Painting is a Mirror*
Artwork by Christi Belcourt celebrating interconnected ecosystems and Indigenous knowledge.

### 4. *All My Relations Podcast*
Podcast episode discussing Indigenous artists, creativity, identity, and cultural preservation.

### 5. Resources
Reference materials and works cited used throughout the exhibition.

---

## Controls

| Action | Key |
|----------|----------|
| Move Left | A / ← |
| Move Right | D / → |
| View Artwork | W / Enter |
| Open Menu | Esc |
| Select Artwork | Mouse Click |

---

## Images

All artwork and contributor images are stored inside:

```text
public/
```

and referenced using root-relative paths:

```ts
image: "/florent-vollant-XL.jpg"
```

Example:

```ts
{
  id: 1,
  title: "Florent Vollant: I Dream in Innu",
  image: "/florent-vollant-XL.jpg"
}
```

---

## Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Educational Purpose

This project was created as an interactive educational gallery exploring Indigenous perspectives, storytelling, language preservation, artistic expression, and cultural identity through multiple forms of media.

---

## Author

**Sarah Lo**

Created as part of an educational gallery exhibition project.

---
