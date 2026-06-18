# RIANIC Production — Portfolio Website

A premium, cinematic portfolio website for RIANIC Production by Riya Singh.

## Tech Stack
- HTML5 + Tailwind CSS (CDN) + Vanilla JavaScript
- No backend, no paid services — 100% static
- Optimised for GitHub Pages

---

## Getting Started

### 1. Clone or Download
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### 2. Open Locally
Simply open `index.html` in any browser. No build step needed.

---

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `rianicproduction.github.io` or any name)
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## Customising Your Content

### Replace Videos (Portfolio Section)
In `index.html`, find every `VIDEO_ID` placeholder and replace with your actual YouTube video ID.

```html
<!-- Before -->
src="https://www.youtube.com/embed/VIDEO_ID?rel=0"

<!-- After (example) -->
src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
```

### Add Your Photo (About Section)
Replace the founder placeholder div with an `<img>` tag:
```html
<img src="assets/images/riya-singh.jpg" alt="Riya Singh" class="rounded-xl w-full h-auto object-cover" />
```

### Add Brand Logos
In the Brands section, replace the `.brand-placeholder` divs with:
```html
<img src="assets/images/brand-logo.png" alt="Brand Name" class="max-h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
```

### Add Proof Screenshots
In the Proof section, replace each `.proof-img-placeholder` with:
```html
<img src="assets/images/proof-instagram.jpg" alt="Instagram Insights" class="rounded-lg w-full h-auto object-cover" />
```

### Update Contact Details
Search for and replace:
- `hello@rianicproduction.com` → your email
- `@rianicproduction` → your Instagram handle
- `+91XXXXXXXXXX` → your WhatsApp number
- LinkedIn URL → your profile

### Enable Contact Form
The form uses [Formspree](https://formspree.io) (free tier available).
1. Sign up at formspree.io
2. Create a form and copy your Form ID
3. Replace `YOUR_FORM_ID` in the form action:
```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

### Update Open Graph Image
Replace `assets/images/og-cover.jpg` with a 1200×630px image of your work for social sharing previews.

---

## File Structure
```
rianic/
├── index.html          ← Main HTML (all sections)
├── style.css           ← All custom styles
├── script.js           ← Interactions & animations
├── assets/
│   ├── images/         ← Your photos, screenshots, og-cover.jpg
│   ├── icons/          ← favicon.svg
│   └── videos/         ← (optional local video files)
└── README.md
```

---

## Features
- ✅ Custom animated cursor
- ✅ Scroll progress bar
- ✅ Sticky glass navbar
- ✅ Cinematic hero with particle canvas + film grain
- ✅ Scroll reveal animations
- ✅ Animated number counters
- ✅ Portfolio filter tabs
- ✅ FAQ accordion
- ✅ Glassmorphism cards
- ✅ Mobile-responsive
- ✅ SEO + Open Graph ready
- ✅ Zero dependencies (except Tailwind CDN)
- ✅ GitHub Pages ready

---

Built with intention. © RIANIC Production.
