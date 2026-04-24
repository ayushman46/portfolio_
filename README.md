# Engineering Portfolio | Ayushman Chakraborty

A high-performance, agency-grade digital experience engineered for a Machine Learning perspective. This project leverages physics-based animation and architectural design principles to present technical expertise in a cinematic, editorial format.

## Core Philosophy

The objective was to transcend the standard technical portfolio by implementing high-end design patterns found in top-tier Awwwards-winning websites. The interface prioritizes precision, motion, and hardware-accelerated performance to reflect a meticulous engineering approach.

## Technical Architecture

The application is built on a modern stack focused on rendering efficiency and interactive depth:

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS with custom Design Tokens
- **Motion Engine**: GSAP (ScrollTrigger) and Framer Motion
- **Scroll Physics**: Lenis Smooth Scroll for momentum-based interaction
- **Typography**: Variable Inter (UI) and Playfair Display (Editorial Serif)

## Key Implementation Details

### Performance and Optimization
- **Hardware Acceleration**: Global animations utilize `will-change` properties and `translate3d` transforms to offload rendering to the GPU, maintaining a consistent 60fps.
- **Adaptive Scrolling**: A hybrid scroll architecture that utilizes GSAP pinning for desktop mouse-wheel interactions and native CSS snap-scrolling for mobile touch physics.
- **Optimized Filters**: Visual depth is achieved through high-contrast radial gradients and subtle backdrop blurs, engineered to minimize paint invalidation.

### Interactive Components
- **Magnetic UI**: Interaction design using magnetic button physics for enhanced user engagement.
- **Scroll Progress HUD**: A razor-thin, gradient-based scroll indicator with a real-time percentage tracker.
- **Cinematic Navigation**: A text-masking reveal system and horizontal project track that bleeding off-canvas for an expansive, architectural feel.

## Local Development

To initialize the project in a local environment:

1. Clone the repository:
   ```bash
   git clone https://github.com/ayushman46/portfolio_.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Execute the development server:
   ```bash
   npm run dev
   ```

4. Generate production build:
   ```bash
   npm run build
   ```

## Deployment

The project is optimized for Vercel deployment. It includes specific configurations for Next.js middleware and edge caching to ensure low-latency delivery across global regions.
