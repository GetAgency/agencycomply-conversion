# Agency Comply - Static Website Conversion

Static HTML/CSS/JS conversion of [agencycomply.com](https://agencycomply.com).

## Overview

This repository contains a complete static conversion of the Agency Comply website. The original site was built with Webflow and has been converted to pure HTML, CSS, and JavaScript for static hosting.

## Features

- **100% Static**: No server-side processing required
- **All Pages Included**: 21 HTML pages covering all sections of the original site
- **Assets Bundled**: All images, fonts, CSS, and JavaScript included locally
- **Pixel-Perfect Fidelity**: Maintains the original design and functionality

## Pages

### Main Pages
- `index.html` - Homepage
- `about-us.html` - About Us
- `case-studies.html` - Case Studies listing
- `book-a-demo.html` - Contact/Demo request form

### Case Studies
- `case-studies/gorgias.html`
- `case-studies/pylon.html`
- `case-studies/coalesce.html`
- `case-studies/cloudcover.html`
- `case-studies/popp.html`

### Frameworks
- `framework/soc2.html`
- `framework/iso-27001.html`
- `framework/gdpr.html`
- `framework/hipaa.html`
- `framework/cmmc2.html`
- `framework/pci.html`

### Who We Serve
- `who-we-serve/b2b-saas.html`
- `who-we-serve/fintech.html`
- `who-we-serve/health-tech.html`
- `who-we-serve/gov-tech-defense.html`
- `who-we-serve/enterprise-saas.html`
- `who-we-serve/ai-tech.html`

## Usage

### Local Development
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve
```

Then open `http://localhost:8000` in your browser.

### Static Hosting
Upload all files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any web server

## Structure

```
├── index.html              # Homepage
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript (Webflow runtime + jQuery)
│   ├── fonts/             # Custom fonts (Gilroy, Poppins)
│   └── images/            # All images and SVGs
├── case-studies/          # Case study pages
├── framework/             # Framework-specific pages
├── who-we-serve/          # Industry-specific pages
└── README.md
```

## Notes

- Original site was built with Webflow
- External tracking scripts (reb2b) have been removed for privacy
- CSS animations that require JavaScript have been set to visible by default
- All CDN links have been converted to local paths
- Form submissions will not work without backend integration

## Conversion Date

February 8, 2026

---

*Converted by Sierra Bonita, Principal Software Engineer*
