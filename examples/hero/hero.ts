// Import SGDS Web Components (this will register them globally)
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

import { renderPage } from '../shared/layout.js';
import { HeroRenderer } from '../../src/renderers/HeroRenderer.js';
import { PopularLinksRenderer } from '../../src/renderers/PopularLinksRenderer';

function initialize(){
    initializeHeroExample();
    initializePopularLinks();
}

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

      </main>
    </div>
    <div id="popular-links-container"></div>
  `;

    // Render the page with our content
    document.body.innerHTML = renderPage('Hero Section Example', content);

    // Add the hero section to the container
    const container = document.getElementById('hero-container');
    if (container) {
        container.insertBefore(hero.render(), container.firstChild);
    }
}

function initializePopularLinks() {
    const popularLinks = new PopularLinksRenderer({
        sections: [
            {
                id: 'academic-calendar',
                title: 'Academic calendar',
                icon: 'calendar',
                links: [
                    { text: 'Calendar', url: '/calendar' },
                    { text: 'National examinations dates', url: '/national-exams-dates' }
                ]
            },
            {
                id: 'admissions',
                title: 'Admissions',
                icon: 'file',
                links: [
                    {
                        text: 'Joint Admissions Exercise (JAE)',
                        url: '/post-secondary/admissions/jae'
                    },
                    {
                        text: 'MOE Kindergarten registration',
                        url: 'https://www.moe.gov.sg/preschool/moe-kindergarten/register',
                        target: '_blank',
                        rel: 'noopener'
                    },
                    {
                        text: 'Primary 1 registration',
                        url: 'https://www.moe.gov.sg/primary/p1-registration',
                        target: '_blank',
                        rel: 'noopener'
                    },
                    {
                        text: 'Direct School Admission (DSA-Sec)',
                        url: 'https://www.moe.gov.sg/secondary/dsa',
                        target: '_blank',
                        rel: 'noopener'
                    },
                    {
                        text: 'Returning Singaporeans',
                        url: '/returning-singaporeans'
                    },
                    {
                        text: 'International students',
                        url: '/international-students'
                    },
                    {
                        text: 'Secondary 1 posting',
                        url: 'https://www.moe.gov.sg/secondary/s1-posting',
                        target: '_blank',
                        rel: 'noopener'
                    }
                ]
            },
            {
                id: 'careers',
                title: 'Careers',
                icon: 'linkedin',
                links: [
                    { text: 'Teaching careers', url: '/careers/become-teachers' },
                    {
                        text: 'Teaching scholarships and sponsorships',
                        url: '/careers/teaching-scholarships-sponsorships'
                    },
                    {
                        text: 'Non-teaching careers',
                        url: '/careers/non-teaching-careers'
                    },
                    {
                        text: 'Adjunct and Relief Schemes',
                        url: '/careers/adjunct-and-relief-schemes'
                    }
                ]
            },
            {
                id: 'self-help-tools',
                title: 'Self-help tools',
                icon: 'gear',
                links: [
                    { text: 'SchoolFinder', url: '/schoolfinder' },
                    { text: 'CourseFinder', url: '/coursefinder' },
                    {
                        text: 'Request examination entry proofs and education records',
                        url: 'https://www.moe.gov.sg/examination-entry-proofs-and-education-records',
                        target: '_blank',
                        rel: 'noopener'
                    },
                    {
                        text: 'Singapore Student Learning Space (SLS)',
                        url: '/education-in-sg/student-learning-space'
                    },
                    {
                        text: 'MySkillsFuture',
                        url: 'https://go.gov.sg/mysfsec',
                        target: '_blank',
                        rel: 'noopener'
                    },
                    { text: 'FAQ', url: '/faq' },
                    {
                        text: 'Financial assistance',
                        url: '/financial-matters/financial-assistance'
                    }
                ]
            }
        ]
    });

    // Add to DOM
    const container = document.getElementById('popular-links-container');
    if (container) {
        container.appendChild(popularLinks.render());
    }
}

// Initialize the example when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}