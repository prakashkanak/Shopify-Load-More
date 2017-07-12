# Shopify-Load-More


$("#list").kp_load_more({
  elements: 'li',
  per_page: 3,
  json_url: 'https://{shopname}/products.json',
  shopify: true
});
