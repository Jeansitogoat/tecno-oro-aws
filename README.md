# Tecno Oro

Tienda de celulares, accesorios y servicios.

- `frontend`: Angular
- `backend`: API Spring Boot

Publicado en:

- https://d1gigpsaw84ri0.cloudfront.net
- https://d3pkjm4hxbrw89.cloudfront.net

En la Mac el backend usa H2 y el frontend apunta a `http://localhost:8080/api`. En AWS el front queda en S3 con CloudFront, la API corre en EC2 y la base es RDS PostgreSQL.

Cuentas de prueba: `admin@tecnooro.com` / `admin123` y `maria.paredes@correo.com` / `cliente123`.

El correo de Gmail no va en el repositorio. En local se pone en `backend/config/correo.local.properties`.
