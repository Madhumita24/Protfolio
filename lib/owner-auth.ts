import {database,OWNER_EMAIL} from './inbox';
export const SESSION_COOKIE='__Host-portfolio_owner';
export async function digest(value:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return Array.from(new Uint8Array(bytes)).map(b=>b.toString(16).padStart(2,'0')).join('')}
export function randomToken(){return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b=>b.toString(16).padStart(2,'0')).join('')}
export async function ownerFromCookie(cookie:string){const token=cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith(SESSION_COOKIE+'='))?.slice(SESSION_COOKIE.length+1);if(!token||!/^[a-f0-9]{64}$/.test(token))return null;const row=await database().prepare('SELECT token_hash FROM owner_sessions WHERE token_hash=? AND expires_at>?').bind(await digest(token),Date.now()).first();return row?{userId:'portfolio-owner',displayName:'Madhumita',email:OWNER_EMAIL,fullName:'Madhumita'}:null}
