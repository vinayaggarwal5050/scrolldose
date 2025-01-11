const fs = require("fs");
const path = require("path");

// Read products.json file
const productsFilePath = path.join(__dirname, "products.json");
const outputDir = path.join(__dirname, "products");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to generate product HTML files
function generateProductPages() {
    fs.readFile(productsFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading products.json:", err);
            return;
        }

        const products = JSON.parse(data);

        products.forEach((product) => {
            const tags = product.tag ? product.tag.join(", ") : "";
            const productHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - ${tags || "Scroll Dose"}</title>
    
    <!-- Meta Tags -->
    <meta name="description" content="${product.description}">
    <meta name="keywords" content="${tags}">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${product.name}">
    <meta property="og:description" content="${product.description}">
    <meta property="og:image" content="${product.image}">
    <meta property="og:type" content="product">
    <meta property="product:tag" content="${tags}">
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="top-bar">
        <a href="../index.html">
            <img src="../images/scrolldose_logo_clear.png" alt="Scroll Dose Logo">
        </a>
    </div>
    <div class="container">
        <img src="${product.image}" alt="${tags}" class="product-image">
        <div class="product-details">
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <div class="price">Price: ${product.price}</div>
          <div class="button-container"> 
            <a href="${product.link}" target="_blank">Buy Now</a>
          </div>
        </div>

        <!-- Video -->
        ${
            product.video
                ? `<div class="product-video">
                <iframe 
                    src="https://www.youtube.com/embed/${
                        new URL(product.video).searchParams.get("v") || product.video.split("/shorts/")[1]
                    }" 
                    allowfullscreen 
                    style="width:100%; height:315px; border:none; border-radius:8px;">
                </iframe>
            </div>`
                : ""
        }
    </div>
</body>
</html>
            `;

            // Write the HTML file for the product
            const filePath = path.join(outputDir, `${product.slug}.html`);
            fs.writeFile(filePath, productHtml.trim(), (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing ${product.slug}.html:`, writeErr);
                } else {
                    console.log(`Generated: ${product.slug}.html`);
                }
            });
        });
    });
}

// Run the function to generate pages
generateProductPages();
