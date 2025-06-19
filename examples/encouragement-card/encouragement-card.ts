import { EncouragementCardRenderer } from '../../src/renderers/EncouragementCardRenderer';

// Initialize the encouragement card
document.addEventListener('DOMContentLoaded', () => {
  const encouragementCard = new EncouragementCardRenderer({
    iconUrl: '/-/media/moe/icons/favourite.svg?h=92&w=100',
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
});
