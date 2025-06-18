// Import SGDS Web Components (this will register them globally)
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

import { renderPage } from '../shared/layout.js';
import { HeroRenderer } from '../../src/renderers/HeroRenderer.js';
import { PopularLinksRenderer } from '../../src/renderers/PopularLinksRenderer';
import {HighlightsRenderer} from "../../src/renderers/HighlightsRenderer";

function initialize(){
    initializeHeroExample();
    initializePopularLinks();
    initializeHighlights();
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
    <div id="highlights-container" class="min-h-screen p-4"></div>
  `;

    // Render the page with our content
    document.body.innerHTML = renderPage('MOE Site Example', content);

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


function initializeHighlights() {
    const highlights = new HighlightsRenderer({
        title: 'Highlights',
        items: [
            {
                title: '4th Young Reporter News Challenge 2025',
                url: '/news/press-releases/20250530-more-than-650-students-showcase-news-reporting-and-language-skills-at-annual-competition',
                imageUrl: '/-/media/images/highlights/20250530---yrnc.jpg',
                description: '652 students from 60 secondary schools participated in the competition, which aims to develop their interest and ability to communicate and present in Mandarin.'
            },
            {
                title: 'Regeneron International Science and Engineering Fair (ISEF) 2025',
                url: '/news/press-releases/20250529-singapore-students-clinch-record-11-awards-at-international-science-and-engineering-competition',
                imageUrl: '/-/media/images/highlights/isef.jpg',
                description: 'The Singapore delegation clinched 11 awards at this year\'s ISEF, the most since Singapore\'s first participation in 2001.'
            },
            {
                title: 'Our Schools, Our Stories Photo and Video Contest 2025 is back!',
                url: '/our-schools-our-stories/contest',
                imageUrl: '/-/media/images/highlights/osos2025_560x280.png',
                description: 'Contest runs from 9 April to 31 July 2025. Click here to find out more.'
            },
            {
                title: '2025 Primary One Registration Exercise to Start From 1 July 2025',
                url: '/news/press-releases/20250514-2025-primary-one-registration-exercise-to-start-from-1-july-2025',
                imageUrl: '/-/media/images/highlights/20250514---2025-p1-reg-exercise.jpg',
                description: 'The 2025 P1 Registration Exercise will open from 1 Jul to 31 Oct 2025. There will be new and relocating primary schools to meet shifting enrolment demands.'
            },
            {
                title: 'Pre-University Seminar 2025',
                url: '/news/press-releases/20250605-pre-university-seminar-2025-re-imagination',
                imageUrl: '/-/media/images/highlights/pre-university-seminar.jpg',
                description: '552 students from 30 pre-university institutions participated in this year\'s Pre-University Seminar under the theme, "Re-imagiNATION".'
            },
            {
                title: '2025 Direct School Admission Exercise',
                url: '/news/press-releases/20250506-start-of-2025-direct-school-admission-exercise-and-early-admissions-exercises-for-ite-and-polytechnic',
                imageUrl: '/-/media/images/highlights/pr-dsa-6may2025.jpg',
                description: 'DSA for Secondary schools & JCs (2026 intake) opens 7 May 2025. Early admission to ITE starts 20 May 2025, polytechnic early admission from 2 June 2025.'
            }
        ]
    });

    // Add to DOM
    const container = document.getElementById('highlights-container');
    if (container) {
        container.appendChild(highlights.render());
    }
}

// Initialize the example when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}