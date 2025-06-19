import { PopularLinksRenderer } from '../../src/renderers/PopularLinksRenderer';

function initializePopularLinks() {
  const popularLinks = new PopularLinksRenderer({
    sections: [
      {
        id: 'academic-calendar',
        title: 'Academic calendar',
        icon: '/-/media/moe/widgets/popularpages/icon-clrd-calendar-1.svg',
        links: [
          { text: 'Calendar', url: '/calendar' },
          { text: 'National examinations dates', url: '/national-exams-dates' }
        ]
      },
      {
        id: 'admissions',
        title: 'Admissions',
        icon: '/-/media/moe/widgets/popularpages/icon-clrd-book.svg',
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
        icon: '/-/media/moe/widgets/popularpages/pathway.svg',
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
        icon: '/-/media/moe/widgets/popularpages/icon-clrd-tools.svg',
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

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePopularLinks);
} else {
  initializePopularLinks();
}
