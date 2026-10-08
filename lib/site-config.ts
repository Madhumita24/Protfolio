export const SITE_ORIGIN='https://protfolio1.madhumitakolukuluri24.workers.dev';
export function allowedOrigin(origin:string|null){return [SITE_ORIGIN,'http://localhost:5173','http://127.0.0.1:5173'].includes(origin||'')}
