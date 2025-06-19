import { SchoolbagFeedRenderer } from '../../src/renderers/SchoolbagFeedRenderer';

// Sample data for the feed
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

// Initialize the feed
document.addEventListener('DOMContentLoaded', () => {

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
});
