import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = new URL('../dist/', import.meta.url);
const indexHtml = await readFile(new URL('index.html', dist), 'utf8');
const entryMatch = indexHtml.match(/<script[^>]+src="([^"]+\.js)"/);

if (!entryMatch) throw new Error('Nao foi possivel localizar o JavaScript inicial em dist/index.html.');

const assetsDirectory = new URL('assets/', dist);
const assetsDirectoryPath = fileURLToPath(assetsDirectory);
const assetNames = await readdir(assetsDirectory);
const javascriptAssets = assetNames.filter((name) => name.endsWith('.js'));
const sizes = await Promise.all(javascriptAssets.map(async (name) => ({
  bytes: (await stat(join(assetsDirectoryPath, name))).size,
  name,
})));
const entryName = entryMatch[1].split('/').pop();
const entry = sizes.find(({ name }) => name === entryName);

if (!entry) throw new Error(`Chunk inicial ${entryName} nao encontrado.`);

const kib = (bytes) => Math.round(bytes / 1024 * 100) / 100;
const oversized = sizes.filter(({ bytes }) => bytes > 500 * 1024);

if (entry.bytes > 220 * 1024) {
  throw new Error(`Chunk inicial excedeu 220 KiB: ${entry.name} (${kib(entry.bytes)} KiB).`);
}
if (oversized.length) {
  throw new Error(`Chunks acima de 500 KiB: ${oversized.map(({ bytes, name }) => `${name} (${kib(bytes)} KiB)`).join(', ')}`);
}
if (!sizes.some(({ name }) => name.startsWith('DashboardPage-'))) {
  throw new Error('O chunk lazy da Evolucao/Dashboard nao foi encontrado; verifique o code splitting do Recharts.');
}
if (!sizes.some(({ name }) => name.startsWith('dataprev-schedule-'))) {
  throw new Error('O cronograma DATAPREV nao esta sendo emitido como chunk sob demanda.');
}

console.log(`Bundle aprovado: entrada ${entry.name} (${kib(entry.bytes)} KiB), ${sizes.length} chunks JS, maior ${kib(Math.max(...sizes.map(({ bytes }) => bytes)))} KiB.`);
