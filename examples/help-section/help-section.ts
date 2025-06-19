import { HelpSectionRenderer } from '../../src/renderers/HelpSectionRenderer';

// Initialize the help section
document.addEventListener('DOMContentLoaded', () => {
  const helpSection = new HelpSectionRenderer({
    iconUrl: '/-/media/moe/icons/people-chat.svg',
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
    headingClass: 'text-xl font-semibold mb-2',
    descriptionClass: 'text-gray-700',
    buttonClass: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
  });

  // Add to DOM
  const container = document.getElementById('help-section-container');
  if (container) {
    container.appendChild(helpSection.render());
  }
});
