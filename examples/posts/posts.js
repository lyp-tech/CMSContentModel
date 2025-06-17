import { PostCollectionRenderer } from '../../src/renderers/PostCollectionRenderer.js';

// Sample posts data
const samplePosts = [
  {
    id: '1',
    title: 'Welcome to the CMS!',
    slug: 'welcome-to-cms',
    excerpt: 'This is the very first post in your CMS demo.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.',
    publishedAt: '2025-06-01T10:00:00Z',
    author: {
      name: 'Alice Example',
      avatar: 'https://i.pravatar.cc/40?img=5'
    },
    tags: ['welcome', 'cms'],
    featuredImage: 'https://picsum.photos/600/300?random=10',
  },
  {
    id: '2',
    title: 'Second Post: SGDS Cards',
    slug: 'sgds-cards-demo',
    excerpt: 'Demonstrating SGDS card integration with the PostCollectionRenderer.',
    content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod.',
    publishedAt: '2025-06-05T15:30:00Z',
    author: {
      name: 'Bob Example',
      avatar: 'https://i.pravatar.cc/40?img=6'
    },
    tags: ['sgds', 'demo'],
    featuredImage: 'https://picsum.photos/600/300?random=11',
  },
  {
    id: '3',
    title: 'No Featured Image Example',
    slug: 'no-featured-image',
    excerpt: 'This post does not have a featured image.',
    content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
    publishedAt: '2025-06-10T09:00:00Z',
    author: {
      name: 'Charlie Example',
      avatar: 'https://i.pravatar.cc/40?img=7'
    },
    tags: ['minimal'],
  }
];

const container = document.getElementById('posts-gallery');

if (container) {
  new PostCollectionRenderer(samplePosts, {
    container,
    layout: 'grid',
    limit: 10,
    showExcerpt: true,
    showAuthor: true,
    showDate: true,
    showTags: true
  }).render();
}
