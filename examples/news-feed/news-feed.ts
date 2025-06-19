import { NewsFeedRenderer } from '../../src/renderers/NewsFeedRenderer';

// Initialize the news feed
document.addEventListener('DOMContentLoaded', () => {
  const newsFeed = new NewsFeedRenderer({
    title: 'Latest News',
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
    titleClass: 'mb-12 font-bold',
    itemClass: 'block h-full border-b border-gray-200 shadow-none hover:shadow-none hover:bg-gray-100'
  });

  // Add to DOM
  const container = document.getElementById('news-feed-container');
  if (container) {
    container.appendChild(newsFeed.render());
  }
});
