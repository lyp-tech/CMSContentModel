import { PostCollectionRenderer } from '../src/renderers/PostCollectionRenderer';
import { Post } from '../src/models/Post';

// Sample data
const samplePosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Content Modeling',
    slug: 'getting-started-content-modeling',
    excerpt: 'Learn the basics of content modeling and how it can improve your content management workflow.',
    content: 'Full article content would go here...',
    publishedAt: '2025-06-01T10:00:00Z',
    author: {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40'
    },
    tags: ['content modeling', 'cms', 'tutorial'],
    featuredImage: 'https://via.placeholder.com/800x400'
  },
  {
    id: '2',
    title: 'Advanced Content Relationships',
    slug: 'advanced-content-relationships',
    excerpt: 'Explore how to model complex relationships between different content types.',
    content: 'Full article content would go here...',
    publishedAt: '2025-06-05T14:30:00Z',
    author: {
      name: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40'
    },
    tags: ['content modeling', 'relationships', 'advanced']
  }
];

/**
 * Initialize the post collection renderer
 * This would typically be called when your page loads
 */
function initPostCollection() {
  const container = document.getElementById('posts-container');
  
  if (!container) {
    console.error('Container element not found');
    return;
  }

  // Create a new renderer instance with our sample data
  const renderer = new PostCollectionRenderer(samplePosts, {
    container,
    layout: 'grid',
    limit: 5,
    showExcerpt: true,
    showAuthor: true,
    showDate: true,
    showTags: true
  });

  // Render the posts
  renderer.render();

  // Example of updating posts dynamically
  // This could be used with an API call or other data source
  // setTimeout(() => {
  //   const newPosts = [...samplePosts, /* new posts */];
  //   renderer.updatePosts(newPosts);
  // }, 5000);
}

// Export the initialization function for manual invocation
export function init() {
  initPostCollection();
}

// Initialize when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPostCollection);
} else {
  // Small delay to ensure all custom elements are defined
  setTimeout(initPostCollection, 100);
}
