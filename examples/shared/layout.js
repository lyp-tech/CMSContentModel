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
        <main>
          ${content}
        </main>
      </body>
    </html>
  `;
}
