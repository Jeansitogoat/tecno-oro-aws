// Publicación en AWS. Esta URL es el CloudFront de la API, no el del sitio.
// El sitio Angular sale por otra distribución, que lee los archivos desde S3.
// La EC2 y RDS quedan detrás de esta URL: el navegador no los llama directo.
export const environment = {
  production: true,
  apiUrl: 'https://d3pkjm4hxbrw89.cloudfront.net/api',
};
