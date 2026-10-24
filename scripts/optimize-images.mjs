// Genera las imágenes ligeras para la web a partir de los originales en assets/.
// Uso:  cd scripts && npm install && node optimize-images.mjs
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = join(raiz, "assets/indetity/LOGO_CR-removebg.png");
const FOTO = join(raiz, "assets/images/IMG_6250.JPG.jpeg");
const OUT = join(raiz, "public/img");

for (const f of [LOGO, FOTO]) {
  if (!existsSync(f)) { console.error("No existe: " + f); process.exit(1); }
}
mkdirSync(OUT, { recursive: true });

const foto = () => sharp(FOTO).rotate(); // respeta la orientación EXIF del celular
const logo = () => sharp(LOGO);
const mono = () => sharp(LOGO).extract({ left: 60, top: 45, width: 350, height: 350 });
const sinFondo = { r: 0, g: 0, b: 0, alpha: 0 };

await Promise.all([
  foto().resize({ width: 800 }).webp({ quality: 78 }).toFile(join(OUT, "hero-800.webp")),
  foto().resize({ width: 1200 }).webp({ quality: 76 }).toFile(join(OUT, "hero-1200.webp")),
  foto().resize(1200, 630, { fit: "cover", position: sharp.strategy.attention }) // recorte automático hacia la cara
        .jpeg({ quality: 82 }).toFile(join(OUT, "og.jpg")),
  logo().resize(96).webp({ quality: 90 }).toFile(join(OUT, "logo-96.webp")),
  logo().resize(320).webp({ quality: 90 }).toFile(join(OUT, "logo-320.webp")),
  // Monograma (CR + hoja) para encabezado y favicon
  mono().resize(112).webp({ quality: 90 }).toFile(join(OUT, "logo-mono-112.webp")),
  mono().resize(64, 64).png().toFile(join(OUT, "favicon-64.png")),
  mono().resize(140, 140).extend({ top: 20, bottom: 20, left: 20, right: 20, background: sinFondo })
        .flatten({ background: "#FFFBEF" }).png().toFile(join(OUT, "apple-touch-icon.png")),
]);
console.log("Listo: imágenes en public/img/");
