import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(new URL('../frontend/package.json', import.meta.url));
const XLSX = require('xlsx');
const source = resolve(process.argv[2] ?? 'docs/data/Sistema_de_Aprovacao_DATAPREV.xlsx');
const destination = resolve('frontend/src/data/dataprev-schedule.json');

if (!existsSync(source)) throw new Error(`Planilha DATAPREV nao encontrada: ${source}`);

const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const normalizedHeader = (value) => normalize(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const parseDate = (value) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  const text = normalize(value); const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) return `${match[3]}-${match[2].padStart(2,'0')}-${match[1].padStart(2,'0')}`;
  const parsed = new Date(text); return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0,10);
};
const activityType = (value) => { const text=normalize(value).toLowerCase(); if(text.includes('video'))return'Videoaula';if(text.includes('pdf'))return'PDF';if(text.includes('revis'))return'Revisao';if(text.includes('quest'))return'Questoes';if(text.includes('simulado'))return'Simulado';if(text.includes('leitura'))return'Leitura';return text?'Outro':''; };
const workbook = XLSX.read(readFileSync(source), { type: 'buffer', cellDates: true });
const sheetName = workbook.SheetNames.find((name) => normalizedHeader(name) === 'cronograma');
if (!sheetName) throw new Error('Aba Cronograma nao encontrada.');
const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '', raw: false });
const aliases = { plannedDate:['data planejada'], disciplineName:['disciplina'], title:['aula / conteudo','aula/conteudo','conteudo'], activityType:['tipo'], status:['status'], completedAt:['data de conclusao'], actualHours:['horas gastas'], priority:['prioridade'], scheduleSituation:['situacao'], importedDelayDays:['dias de atraso'], notes:['observacoes'] };
const find = (row, names) => { const entry=Object.entries(row).find(([key])=>names.includes(normalizedHeader(key))); return entry?.[1]; };
const seen = new Set();
const activities = rows.flatMap((row) => { const plannedDate=parseDate(find(row,aliases.plannedDate));const disciplineName=normalize(find(row,aliases.disciplineName));const title=normalize(find(row,aliases.title));if(!plannedDate||!disciplineName||!title)return[];const id=createHash('sha256').update(`${plannedDate}|${disciplineName}|${title}|${normalize(find(row,aliases.activityType))}`).digest('hex').slice(0,20);if(seen.has(id))return[];seen.add(id);const completedAt=parseDate(find(row,aliases.completedAt));const hours=Number(String(find(row,aliases.actualHours)).replace(',','.'));return[{id,plannedDate,disciplineName,title,activityType:activityType(find(row,aliases.activityType)),status:normalize(find(row,aliases.status))||'Nao iniciado',completedAt,actualMinutes:Number.isFinite(hours)?Math.round(hours*60):undefined,priority:normalize(find(row,aliases.priority)),scheduleSituation:normalize(find(row,aliases.scheduleSituation)),importedDelayDays:Number(find(row,aliases.importedDelayDays))||0,notes:normalize(find(row,aliases.notes)),outsideExamWindow:plannedDate>'2026-10-11',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}]; });
writeFileSync(destination, `${JSON.stringify(activities,null,2)}\n`);
console.log(JSON.stringify({ source, destination, sheet: sheetName, rows: rows.length, imported: activities.length, duplicates: rows.length-activities.length }, null, 2));
