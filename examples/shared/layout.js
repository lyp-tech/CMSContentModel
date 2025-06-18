/**
 * Renders a consistent page layout with header, navigation, and main content.
 * @param {string} title - Page title to display in the header and tab
 * @param {string} content - HTML content to render inside the main tag
 * @returns {string} - Complete HTML document as a string
 */
export function renderPage(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} | CMS Content Model</title>
        <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.5/themes/day.css' rel='stylesheet' />
        <link href='../global.css' rel='stylesheet' />
        <script type="module" src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.5"></script>
      </head>
      <body class="bg-gray-50 min-h-screen">
        <header class="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 mb-8">
          <div class="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <h1 class="text-2xl font-bold text-primary">${title}</h1>
            <nav>
              <a href="../index.html" class="text-gray-600 hover:text-primary font-medium transition-colors px-3 py-2 rounded">Home</a>
            </nav>
          </div>
        </header>
        <main class="max-w-5xl mx-auto px-4 py-8">
          ${content}
        </main>
      </body>
    </html>
  `;
}
