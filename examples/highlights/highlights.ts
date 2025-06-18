import { HighlightsRenderer } from '../../src/renderers/HighlightsRenderer';

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

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHighlights);
} else {
  initializeHighlights();
}
