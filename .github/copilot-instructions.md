# Vision Studio Website - AI Coding Instructions

## Project Overview

This is a single-page portfolio website for Vision Studio, a video production company. The site follows a modern, minimalist design approach with smooth animations and responsive layouts.

## Architecture

- Single HTML file containing embedded CSS and JavaScript
- No external dependencies or build process required
- Uses vanilla JavaScript for interactions

## Key Components

### Styling Conventions

- Color scheme uses gradient combinations:
  - Primary gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
  - Text gradients applied via `-webkit-background-clip: text`
- Responsive breakpoint at 768px
- CSS animations defined using `@keyframes`

### Layout Structure

1. Navigation (`nav`)
2. Hero section (`#home`)
3. Portfolio section (`#portfolio`)
4. Services section (`#services`)
5. Contact section (`#contact`)
6. Footer

### JavaScript Features

- Navbar scroll effect: Adds `.scrolled` class on scroll > 50px
- Smooth scrolling for anchor links
- Dynamic portfolio item background colors using HSL

## Common Tasks

### Adding New Portfolio Items

Add new items to the `.portfolio-grid` following this structure:

```html
<div class="portfolio-item">
  <div class="portfolio-info">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```

### Adding New Services

Add new cards to the `.services-grid` following this pattern:

```html
<div class="service-card">
  <div class="service-icon">emoji</div>
  <h3>Service Name</h3>
  <p>Service Description</p>
</div>
```

## Best Practices

- Maintain accessibility by using semantic HTML elements
- Keep animations subtle using the existing transition timing: `transition: all 0.3s`
- Follow established color patterns using provided gradients
- Ensure responsive design works at mobile breakpoint (768px)
