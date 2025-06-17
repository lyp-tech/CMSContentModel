// Import SGDS Web Components (this will register them globally)
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

// Import the MediaGalleryRenderer
import { MediaGalleryRenderer } from '../../src/renderers/MediaGalleryRenderer';

// Sample media items
const sampleMedia = [
  {
    id: '1',
    title: 'Beautiful Landscape',
    description: 'A beautiful landscape photo with mountains and a lake',
    type: 'image',
    url: 'https://picsum.photos/1200/800?random=1',
    thumbnailUrl: 'https://picsum.photos/300/200?random=1',
    publishedAt: '2025-06-01T10:00:00Z',
    tags: ['nature', 'landscape', 'photography'],
    author: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/40?img=1'
    }
  },
  {
    id: '2',
    title: 'Product Demo Video',
    description: 'Demonstration of our new product features',
    type: 'video',
    url: 'https://example.com/videos/product-demo.mp4',
    thumbnailUrl: 'https://picsum.photos/300/200?random=2',
    publishedAt: '2025-06-05T14:30:00Z',
    tags: ['video', 'product', 'demo'],
    author: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/40?img=2'
    }
  },
  {
    id: '3',
    title: 'User Manual',
    description: 'Complete user manual for our product',
    type: 'document',
    url: 'https://example.com/documents/user-manual.pdf',
    publishedAt: '2025-06-10T09:15:00Z',
    tags: ['documentation', 'guide', 'pdf'],
    author: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/40?img=3'
    }
  }
];

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('media-gallery');
  
  if (container) {
    const gallery = new MediaGalleryRenderer(sampleMedia, {
      container,
      layout: 'grid',
      showFilter: true,
      showSearch: true,
      showAuthor: true,
      showDate: true,
      showTags: true
    });
    
    gallery.render();
  }
});
