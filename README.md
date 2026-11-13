# Tecno Oro

Tienda de celulares, accesorios y servicios.

- `frontend`: Angular
- `backend`: API Spring Boot

## Cómo está hecho en AWS

No es un solo servidor. En AWS hay cinco recursos separados. Cada uno hace una sola cosa y el siguiente no arranca dentro del anterior.

1. **CloudFront del sitio** — `https://d1gigpsaw84ri0.cloudfront.net`
   El navegador entra por aquí. CloudFront entrega el HTML, el CSS y el JavaScript del Angular. La respuesta trae `Server: AmazonS3` y `X-Cache: Hit from cloudfront`, así que este CloudFront no está sirviendo la API.
2. **Amazon S3** — guarda el build del frontend. El bucket no es público: CloudFront es quien lee los archivos y los entrega al usuario.
3. **CloudFront de la API** — `https://d3pkjm4hxbrw89.cloudfront.net`
   Es otra distribución, distinta de la del sitio. El Angular de producción llama a `https://d3pkjm4hxbrw89.cloudfront.net/api`. `GET /api/salud` responde `{"ok":true,"servicio":"Tecno Oro"}`.
4. **EC2** — servidor de la API. Ahí corre el contenedor de `backend/Dockerfile` con `SPRING_PROFILES_ACTIVE=prod`. Escucha el puerto que le pasa la variable `PORT`.
5. **RDS PostgreSQL** — servidor de la base, aparte de la EC2. La API no tiene la base en el mismo disco: en producción Spring arma la URL con `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER` y `PGPASSWORD`.

El recorrido de una visita es este:

```text
navegador
  -> CloudFront del sitio
  -> S3 (Angular)

Angular
  -> CloudFront de la API
  -> EC2 (Spring Boot)
  -> RDS PostgreSQL
```

En la máquina local el backend usa H2 y el frontend apunta a `http://localhost:8080/api`. Ese modo no se publica. Al compilar para producción, Angular cambia `environment.ts` por `environment.production.ts` y a partir de ahí todas las peticiones salen hacia el CloudFront de la API.

Dónde se ve cada pieza en el código:

| Pieza | Archivo |
| --- | --- |
| URL del sitio y de la API | este README |
| URL que usa el Angular publicado | `frontend/src/environments/environment.production.ts` |
| URL local | `frontend/src/environments/environment.ts` |
| Cambio de una URL por la otra al compilar | `frontend/angular.json` |
| Llamadas del front a esa URL | `frontend/src/app/servicios/catalogo.service.ts` y `auth.service.ts` |
| Puerto de la EC2 y orígenes de CloudFront permitidos | `backend/src/main/resources/application.properties` |
| Conexión a RDS | `backend/src/main/resources/application-prod.properties` |
| Imagen que corre en la EC2 | `backend/Dockerfile` |
| CORS aplicado en la API | `backend/src/main/java/com/tecnooro/config/SeguridadConfig.java` |

Cuentas de prueba: `admin@tecnooro.com` / `admin123` y `maria.paredes@correo.com` / `cliente123`.

El correo de Gmail no va en el repositorio. En local se pone en `backend/config/correo.local.properties`.
