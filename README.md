# Green Deck

Dashboard responsive construido con React, Vinext y Vite.

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm ci
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Ejecutar con Docker

```bash
docker compose up -d --build
```

Para consultar el estado y los registros:

```bash
docker compose ps
docker compose logs -f app
```

Para detenerla:

```bash
docker compose down
```

## Despliegue en un VPS

Instala Git y Docker Engine con el complemento Docker Compose en el servidor. Luego clona el repositorio y levanta la aplicación:

```bash
git clone URL_DEL_REPOSITORIO.git green-deck
cd green-deck
docker compose up -d --build
```

La aplicación escucha en el puerto `3000`. Para un sitio público con HTTPS, coloca un proxy inverso como Caddy o Nginx delante del contenedor y permite únicamente los puertos 22, 80 y 443 en el firewall.

## Actualizar una instalación

```bash
git pull --ff-only
docker compose up -d --build
docker image prune -f
```
