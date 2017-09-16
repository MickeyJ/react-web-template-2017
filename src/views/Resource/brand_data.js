
const BRAND_NAMES_1 = [
  /*1*/ 'Apples-R-Us',
  /*2*/ 'Macaroni & Cheese',
  /*3*/ 'Cookie Co',
  /*4*/ 'Ms. Pickles',
  /*5*/ 'Nice Good Chips',
  /*6*/ 'Larabar',
  /*7*/ 'Laxatif',
];

const PRODUCT_NAMES_1 = [
  [ 4, 'Dilly Willy' ],
  [ 4, 'Sweet-N-Sour' ],
  [ 4, 'Mini Pickles' ],
  [ 4, 'Deli Cut' ],
  [ 5, 'Sour Cream & Onion' ],
  [ 5, 'Sea Salt' ],
  [ 5, 'Sweet Potato' ],
  [ 5, 'Olive Oil' ],
  [ 1, 'Honey Crips' ],
  [ 1, 'Gala' ],
  [ 2, 'Aged Cheddar' ],
  [ 2, 'White Cheddar' ],
  [ 2, 'OG Mac' ],
  [ 3, 'Tasty Candy Carmel Stuff' ],
  [ 3, 'Salty Butter Nut Munchkin Monster Cookie (gluten free)' ],
  [ 3, 'Delicious Chunky Coconut' ],
  [ 6, 'Cashew Cookie' ],
  [ 6, 'Carrot Cake' ],
  [ 6, 'Blueberry Muffin' ],
  [ 6, 'Coconut Cream Pie' ],
  [ 7, 'Heavy Duty' ],
];

export const BRANDS = generateBrands(BRAND_NAMES_1);
export const PRODUCTS = generateBrandProducts(PRODUCT_NAMES_1);

function generateBrands(brandNames){
  const brands = {};
  brandNames.forEach((name, i) => {
    brands[i+1] = {
      brand_id: i+1,
      brand_name: name,
    }
  });
  return brands;
}

function generateBrandProducts(productNames){
  const products = {};
  productNames.forEach((product, product_id) => {
    products[product_id] = {
      brand_id: product[0],
      product_name: product[1],
      product_id,
    }
  });
  return products;
}