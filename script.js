// Basic script to verify configuration
fetch('site.json')
  .then((response) => response.json())
  .then((config) => {
    console.log('Loaded site config:', config);
  })
  .catch((err) => {
    console.error('Failed to load config', err);
  });
