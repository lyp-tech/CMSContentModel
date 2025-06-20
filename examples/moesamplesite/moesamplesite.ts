// Import SGDS Web Components (this will register them globally)
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';
import '../../src/components/Navigation';

import { renderPage } from '../shared/layout.js';
import { HeroRenderer } from '../../src/renderers/HeroRenderer.js';
import { PopularLinksRenderer } from '../../src/renderers/PopularLinksRenderer';
import {HighlightsRenderer} from "../../src/renderers/HighlightsRenderer";
import {NewsFeedRenderer} from "../../src/renderers/NewsFeedRenderer";
import {EncouragementCardRenderer} from "../../src/renderers/EncouragementCardRenderer";
import {HelpSectionRenderer} from "../../src/renderers/HelpSectionRenderer";
import {SchoolbagFeedRenderer} from "../../src/renderers/SchoolbagFeedRenderer";

async function fetchPosts(): Promise<any[]> {
    try {
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(`${CORS_PROXY}https://directus.pizza/items/posts`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

async function renderPosts() {
  const posts = await fetchPosts();
  const container = document.getElementById('posts-container');
  
  if (!container || posts.length === 0) return;

  const highlights = new HighlightsRenderer({
    title: 'Latest Posts',
    items: posts.map(post => ({
      title: post.title,
      description: post.description,
      imageUrl: `https://directus.pizza/assets/${post.image}`,
      url: `https://directus.pizza/posts/${post.slug}`
    })),
    cardClass: 'flex-shrink-0 w-80 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all',
    titleClass: 'text-3xl font-bold text-center mb-8'
  });

  container.appendChild(highlights.render());
}

async function initialize(){
  initializeHeroExample();
  initializePopularLinks();
  initializeHighlights();
  initializeNewsFeed();
  initializeEncouragementCard();
  initializeHelpSection();
  initializeFeed();
  await renderPosts();
}

function initializeHeroExample() {
    const hero = new HeroRenderer({
        logoUrl: '../img/img.png',
        logoAlt: 'MOE Logo',
        navItems: [
            {
                text: 'Education levels',
                url: '#',
                subItems: [
                    { text: 'Preschool', url: '/preschool' },
                    { text: 'Primary', url: '/primary' },
                    { text: 'Secondary', url: '/secondary' },
                    { text: 'Post-secondary', url: '/post-secondary' }
                ]
            },
            {
                text: 'Financial matters',
                url: '/financial-matters',
                subItems: [
                    { text: 'Awards and scholarships', url: '/financial-matters/awards-scholarships' },
                    { text: 'Edusave Account', url: '/financial-matters/edusave-account' },
                    { text: 'School fees', url: '/financial-matters/fees' },
                    { text: 'Financial assistance', url: '/financial-matters/financial-assistance' },
                    { text: 'Loan schemes', url: '/financial-matters/government-loan-schemes' },
                    { text: 'Post-Secondary Education Account', url: '/financial-matters/psea' },
                    { text: 'Tuition Grant Scheme', url: '/financial-matters/tuition-grant-scheme' }
                ]
            },
            {
                text: 'Education in SG',
                url: '/education-in-sg',
                subItems: [
                    { text: '21st Century Competencies', url: '/education-in-sg/21st-century-competencies' },
                    { text: 'Compulsory education', url: '/primary/compulsory-education' },
                    { text: 'Desired Outcomes of Education', url: '/education-in-sg/desired-outcomes' },
                    { text: 'Educational technology journey', url: '/education-in-sg/educational-technology-journey' },
                    { text: 'Our programmes', url: '/education-in-sg/our-programmes' },
                    { text: 'Our students', url: '/education-in-sg/our-students' },
                    { text: 'Our teachers', url: '/education-in-sg/our-teachers' },
                    { text: 'Our schools', url: '/education-in-sg/our-schools' },
                    { text: 'Private education', url: '/private-education' }
                ]
            },
            {
                text: 'Newsroom',
                url: '/newsroom',
                subItems: [
                    { text: 'EdTalks', url: '/newsroom/edtalks' },
                    { text: 'News', url: '/search?q=*&app=site_search&fq=content_type_s%3A(%22news%22)&sort=modified_dt%20desc' }
                ]
            },
            {
                text: 'Careers',
                url: '/careers'
            },
            {
                text: 'About MOE',
                url: '/about-us'
            }
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
            foregroundImage: '../img/hero-illustration.svg',
            foregroundImageSizeClass: 'w-full max-w-4xl' // Custom size
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
    <div id="highlights-container"></div>
    <div id="posts-container" class="py-12"></div>
    <div class="container max-w-6xl  mx-auto">
      <div class="grid grid-cols-12 gap-6">
        <div id="news-feed-container" class="col-span-12 md:col-span-7">
          <!-- News feed will be rendered here -->
        </div>
        <div id="encouragement-card-container" class="col-span-12 md:col-span-5">
          <!-- Encouragement card will be rendered here -->
        </div>
      </div>
    </div>
    <div class="container mx-auto">
    <div id="help-section-container">
      <!-- Help section will be rendered here -->
    </div>
  </div>
  <div class="container mx-auto">
    <div id="schoolbag-feed-container">
      <!-- Schoolbag feed will be rendered here -->
    </div>
  </div>
  </div>
  `;

    // Render the page with our content
    document.body.innerHTML += renderPage('MOE Site Example', content);

    // Add the hero section to the container
    const container = document.getElementById('hero-container');
    if (container) {
        container.insertBefore(hero.render(), container.firstChild);
    }
}

function initializeEncouragementCard() {
    const encouragementCard = new EncouragementCardRenderer({
        iconUrl: '../img/img_1.png?h=92&w=100',
        iconAlt: 'Heart icon',
        heading: 'Words of encouragement',
        description: 'Inspired by a teacher? Received exemplary service from an MOE staff? Share your experience with us. Our heartfelt thanks to all who have posted yours.',
        viewLinkText: 'View appreciation notes',
        viewLinkUrl: '/about-us/compliments',
        buttonText: 'LEAVE A COMPLIMENT',
        buttonUrl: 'https://form.gov.sg/67ce47ee1b64d111a4222cfa',
        // Optional custom classes
        containerClass: 'col-span-12 mb-8 md:col-span-5 md:px-6',
        cardClass: 'bg-gray-100 p-6 text-center rounded-lg',
        headingClass: 'text-2xl font-bold',
        descriptionClass: 'text-gray-700',
        viewLinkClass: 'text-blue-600 hover:underline',
        buttonClass: 'inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200'
    });

    // Add to DOM
    const container = document.getElementById('encouragement-card-container');
    if (container) {
        container.appendChild(encouragementCard.render());
    }
}

function initializeNewsFeed() {
    const newsFeed = new NewsFeedRenderer({
        title: 'News',
        items: [
            {
                title: 'Pre-University Seminar 2025 – Re-imagiNATION',
                url: '/news/press-releases/20250605-pre-university-seminar-2025-re-imagination',
                category: 'Press Releases',
                publishedDate: 'Thursday, June 5, 2025',
                target: '_blank',
                rel: 'noopener'
            },
            {
                title: "MOE Teachers' Conference and ExCEL Fest 2025",
                url: '/news/press-releases/20250603-moe-teachers-conference-and-excel-fest-2025',
                category: 'Press Releases',
                publishedDate: 'Tuesday, June 3, 2025',
                target: '_blank',
                rel: 'noopener'
            },
            {
                title: 'More than 650 Students Showcase News Reporting and Language Skills at Annual Competition',
                url: '/news/press-releases/20250530-more-than-650-students-showcase-news-reporting-and-language-skills-at-annual-competition',
                category: 'Press Releases',
                publishedDate: 'Friday, May 30, 2025',
                target: '_blank',
                rel: 'noopener'
            }
        ],
        readMoreUrl: '/search?q=*&fq=content_type_s:(%22news%22)',
        readMoreClass: 'border-solid border-0 more-news-link',
        containerClass: 'col-span-12 mb-8 md:col-span-7 md:px-4',
        titleClass: 'mb-12 text-5xl font-bold',
        titleTextColor: 'text-blue-600',
        itemClass: 'block h-full border-b border-gray-200 shadow-none hover:shadow-none hover:bg-gray-100'
    });

    // Add to DOM
    const container = document.getElementById('news-feed-container');
    if (container) {
        container.appendChild(newsFeed.render());
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

function initializeHelpSection() {
    const helpSection = new HelpSectionRenderer({
        iconUrl: '../img/chat.png',
        iconAlt: 'Chat and discussion icon',
        heading: "Can't find what you are looking for?",
        description: `
      Try using our <a href="/search" class="text-blue-600 hover:underline">site-wide search</a>,
      <a href="/" class="text-blue-600 hover:underline clickAJ">Ask MOE chatbot</a>, or
      <a href="https://www.moe.gov.sg/faq" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
        Frequently Asked Questions (FAQs)
      </a>
      to find answers to your queries.
    `,
        buttonText: 'Contact Us',
        buttonUrl: '/contact-us',
        // Optional custom classes
        containerClass: 'w-full mt-8',
        headingClass: 'text-4xl font-semibold mb-2',
        descriptionClass: 'text-gray-700',
        buttonClass: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
    });

    // Add to DOM
    const container = document.getElementById('help-section-container');
    if (container) {
        container.appendChild(helpSection.render());
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
        ],
        cardClass: 'flex-shrink-0 w-xs bg-white rounded-lg shadow-lg hover:shadow-xl transition-all',
        titleClass: 'text-3xl font-bold text-center mb-8'
    });

    // Add to DOM
    const container = document.getElementById('highlights-container');
    if (container) {
        container.appendChild(highlights.render());
    }
}

function initializeFeed() {
    {

        const sampleArticles = [
            {
                title: 'Why choosing the JC Arts stream was the best decision for me',
                url: 'https://www.schoolbag.edu.sg/story/why-i-chose-the-jc-arts-stream/',
                imageUrl: 'https://www.schoolbag.edu.sg/wp-content/uploads/2025/06/En-Xue_Schoolbag-Thumbnail.jpg',
                date: 'Jun 2025',
                altText: 'Student sharing JC Arts stream experience'
            },
            {
                title: 'Where sports meets syntax',
                url: 'https://www.schoolbag.edu.sg/story/where-sports-meets-syntax/',
                imageUrl: 'https://www.schoolbag.edu.sg/wp-content/uploads/2025/06/Where-sports-meets-syntax_thumbnail-scaled-e1748957710292.jpg',
                date: 'Jun 2025',
                altText: 'Sports and coding activities'
            },
            {
                title: 'Wayfinding through the secondary school years',
                url: 'https://www.schoolbag.edu.sg/story/wayfinding-through-the-secondary-school-years/',
                imageUrl: 'https://www.schoolbag.edu.sg/wp-content/uploads/2025/05/Hero-image-2.jpg',
                date: 'May 2025',
                altText: 'Secondary school students learning'
            },
            {
                title: 'A school and a tech start-up gamify the learning experience to bring sustainability lessons to life for students',
                url: 'https://www.schoolbag.edu.sg/story/a-school-and-a-tech-start-up-gamify-the-learning-experience-to-bring-sustainability-lessons-to-life-for-students/',
                imageUrl: 'https://www.schoolbag.edu.sg/wp-content/uploads/2025/05/Hero-image.jpg',
                date: 'May 2025',
                altText: 'Students participating in gamified learning'
            }
        ];

        const feed = new SchoolbagFeedRenderer({
            title: 'Schoolbag Stories',
            articles: sampleArticles,
            schoolbagUrl: 'https://www.schoolbag.edu.sg/',
            // Optional custom classes
            containerClass: 'w-full',
            gridClass: 'grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 -mt-4',
            articleClass: 'col-span-1 lg:px-4 mb-4 lg:mb-8',
            buttonClass: 'inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors'
        });

        // Add to DOM
        const container = document.getElementById('schoolbag-feed-container');
        if (container) {
            container.appendChild(feed.render());
        }
    }
}

// Initialize the example when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}