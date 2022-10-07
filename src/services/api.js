export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getProductById(productId) {
  const endpoint = `https://api.mercadolibre.com/items/${productId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
