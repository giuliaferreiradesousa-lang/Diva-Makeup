import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);

test("landing mantém os estilos globais e inicializa o novo carrossel", async function() {
  var html = await readFile(new URL("src/feature/home/pages/home.html", projectRoot), "utf8");
  var homeJs = await readFile(new URL("src/feature/home/home.js", projectRoot), "utf8");

  assert.match(html, /shared\/styles\/global\.css/);
  assert.match(html, /styles\/home\.css/);
  assert.match(homeJs, /productCarouselComponent\(categoriasFixas, todosProdutos\)/);
  assert.match(homeJs, /iniciarCarrosselProdutos\(todosProdutos\)/);
  assert.doesNotMatch(homeJs, /localStorage\.setItem\(['"]produtos/);
});

test("CSS do carrossel reutiliza a paleta e os componentes visuais existentes", async function() {
  var css = await readFile(new URL("src/feature/home/styles/home.css", projectRoot), "utf8");

  assert.match(css, /\.vitrine-card/);
  assert.match(css, /\.btn-secondary/);
  assert.match(css, /\.product-filter\.active[\s\S]*var\(--color-primary\)/);
  assert.match(css, /\.products-carousel-track[\s\S]*scroll-snap-type: x mandatory/);
  assert.doesNotMatch(css, /tailwind/i);
});
