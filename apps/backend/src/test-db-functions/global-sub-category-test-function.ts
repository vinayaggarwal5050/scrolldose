import { createGlobalSubCategory , getAllGlobalSubCategories } from "../db-functions/global-subcategory-functions";

const data = [
  {
    globalCategoryId: 6,
    subCatData: {
      "name": "Mobile Phone",
      "slug": "mobile-phone"
    }
  },
  {
    globalCategoryId: 6,
    subCatData: {
      "name": "Smart Watch",
      "slug": "smart-watch"
    }
  },
  {
    globalCategoryId: 6,
    subCatData: {
      "name": "Tablet",
      "slug": "tablet"
    }
  },
  {
    globalCategoryId: 6,
    subCatData: {
      "name": "Laptops",
      "slug": "laptops"
    }
  },
  {
    globalCategoryId: 8,
    subCatData: {
      "name": "Car Accessories",
      "slug": "car-accessories"
    }
  },
  {
    globalCategoryId: 8,
    subCatData: {
      "name": "Bike Accessories",
      "slug": "Bike-accessories"
    }
  },
  {
    globalCategoryId: 9,
    subCatData: {
      "name": "Makeup Accessories",
      "slug": "makeup-accessories"
    }
  },
  {
    globalCategoryId: 9,
    subCatData: {
      "name": "Watches",
      "slug": "watches"
    }
  },
  {
    globalCategoryId: 7,
    subCatData: {
      "name": "Home Decor",
      "slug": "home-decor"
    }
  },
  {
    globalCategoryId: 7,
    subCatData: {
      "name": "Cleaning Supplies",
      "slug": "cleaning-supplies"
    }
  },
  {
    globalCategoryId: 7,
    subCatData: {
      "name": "Furniture",
      "slug": "furtinure"
    }
  },
  {
    globalCategoryId: 7,
    subCatData: {
      "name": "Lights",
      "slug": "lights"
    }
  },
  {
    globalCategoryId: 11,
    subCatData: {
      "name": "Utensil & Crockrey",
      "slug": "utensil-crockrey"
    }
  },
  {
    globalCategoryId: 11,
    subCatData: {
      "name": "Bakery Tools",
      "slug": "bakery-tools"
    }
  },
  {
    globalCategoryId: 10,
    subCatData: {
      "name": "Shoes",
      "slug": "shoes"
    }
  },
  {
    globalCategoryId: 10,
    subCatData: {
      "name": "Wallet & Purses",
      "slug": "wallet-purses"
    }
  },
  {
    globalCategoryId: 10,
    subCatData: {
      "name": "Kid's Clothes",
      "slug": "kids-clothes"
    }
  },
  {
    globalCategoryId: 10,
    subCatData: {
      "name": "Male's Clothes",
      "slug": "ales-clothes"
    }
  },
  {
    globalCategoryId: 10,
    subCatData: {
      "name": "Female's Clothes",
      "slug": "female-clothes"
    }
  }


]

const test = () => {

  data.forEach(async(item) => {
    const res = await createGlobalSubCategory(item["subCatData"], item["globalCategoryId"]);
    console.log(res);
  })

  // getAllGlobalSubCategories().then(res => console.log(res));

}

test();


