# Notas del sitio (privado, no se publica)

## Imágenes
Los originales viven en `assets/` (NO se publican: están fuera de `public/`).
Las versiones ligeras YA están generadas en `public/img/` (incluidas en el zip). Para regenerarlas con los originales de `assets/`:

    cd scripts && npm install && node optimize-images.mjs

Esto crea `public/img/` (hero, logo, favicon, og). Hay que hacer commit de esa carpeta.

## Ajustes rápidos
- Enfoque de la foto: variable `--foco` en el CSS de `public/index.html` (por defecto `50% 18%`; primero horizontal, luego vertical).
- WhatsApp: reemplazar `{{WHATSAPP_52}}` en el bloque `CONFIG` (52 + 10 dígitos).
- Horarios, duración y ventana de días: bloque `CONFIG`.
- Pendientes: `grep -rn "{{" public/`

## Escritorio
Hoy usa la misma foto vertical en una columna lateral. Con una foto horizontal,
envolver el `<img class="foto">` en `<picture>` con un `<source media="(min-width:900px)">`.

## Demo
`noindex` en la página y `robots.txt` con `Disallow: /`. Quitar ambos al pasar a producción.
