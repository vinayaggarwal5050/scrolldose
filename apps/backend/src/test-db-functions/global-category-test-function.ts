import { getAllGloalCategories, createGlobalCategory } from "../db-functions/global-category-functions";


const data = [
  {
    "name": "Uncategorized",
    "slug": "Uncategorized"
  },
  {
    "name": "Electonics",
    "slug": "electronics"
  },
  {
    "name": "Automobile",
    "slug": "automobile"
  },
  {
    "name": "House Hold",
    "slug": "house-hold"
  },
  {
    "name": "Kitchen",
    "slug": "kitchen"
  },
  {
    "name": "Fashion",
    "slug": "fashion"
  },
  {
    "name": "Life Style",
    "slug": "life-style"
  }
]

const test = () => {

  // data.forEach(async(item) => {
  //   await createGlobalCategory(item);
  // })

  getAllGloalCategories().then(res => console.log(res));

}

test();


