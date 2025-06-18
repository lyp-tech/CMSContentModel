import { renderPage } from '../shared/layout.js';
import { HeroRenderer } from '../../src/renderers/HeroRenderer.js';

function initializeHeroExample() {
    const hero = new HeroRenderer({
        logoUrl: '../img/img.png',
        logoAlt: 'MOE Logo',
        navItems: [
            { text: 'Academic calendar', url: '/academic-calendar' },
            { text: 'Admissions', url: '/admissions' },
            { text: 'Careers', url: '/careers' }
        ],
        hero: {
            title: 'Ministry of Education',
            subtitle: 'Moulding the future of our nation.',
            searchPlaceholder: 'What are you searching for?',
            popularSearches: [
                'P1 registration',
                'DSA-Sec',
                'DSA-JC',
                'School terms and holidays'
            ],
            backgroundImage: '../img/curve-header.svg',
            foregroundImage: '../img/hero-illustration.svg'
        },
        searchPlaceholder: 'Search MOE',
        searchAction: '/search',
        highlights: [
            {
                type: 'warning',
                text: 'Words of encouragement:',
                link: {
                    text: 'Share your experience',
                    url: '/about-us/publications/teacher-stories-educator-voices'
                }
            },
            {
                type: 'info',
                text: 'News: See latest updates'
            }
        ]
    });

    const content = `
    <div id="hero-container">
      <!-- Hero section will be inserted here -->
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-6">Hero Section Example</h1>
        <p class="mb-4">This page demonstrates the HeroRenderer component.</p>
        <p>Scroll down to see the sticky header in action.</p>
        <div class="h-[200vh]"></div> <!-- Extra space to demonstrate sticky header -->
      </main>
    </div>
  `;

    // Render the page with our content
    document.body.innerHTML = renderPage('Hero Section Example', content);

    // Add the hero section to the container
    const container = document.getElementById('hero-container');
    if (container) {
        container.insertBefore(hero.render(), container.firstChild);
    }
}

// Initialize the example when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeroExample);
} else {
    initializeHeroExample();
}