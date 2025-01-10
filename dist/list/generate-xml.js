const fs = require('fs');
const path = require('path');

// Define the base URL for the sitemap
const BASE_URL = 'https://www.scrolldose.com';

// Read the products.json file
const productsFilePath = path.join(__dirname, 'products.json');

fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading products.json:', err);
        return;
    }

    try {
        const products = JSON.parse(data);

        // Generate the XML content
        const sitemapEntries = products.map(product => `
            <url>
                <loc>${BASE_URL}/product.html?slug=${product.slug}</loc>
                <lastmod>${product.lastMod || new Date().toISOString().split('T')[0]}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        `);

        const sitemapContent = `
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>${BASE_URL}</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
                ${sitemapEntries.join('\n')}
            </urlset>
        `.trim();

        // Save the sitemap to a file
        const sitemapFilePath = path.join(__dirname, 'sitemap.xml');
        fs.writeFile(sitemapFilePath, sitemapContent, 'utf8', err => {
            if (err) {
                console.error('Error writing sitemap.xml:', err);
                return;
            }
            console.log('Sitemap successfully generated at sitemap.xml');
        });
    } catch (parseErr) {
        console.error('Error parsing products.json:', parseErr);
    }
});
