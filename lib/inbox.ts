import { env } from "cloudflare:workers";
export function database(): D1Database {
 const db = (env as unknown as {DB?:D1Database}).DB;
 if (!db) throw new Error("Storage unavailable");
 return db;
}
export const OWNER_EMAIL = "kolukuluri.m@northeastern.edu";
type MailEnvironment = { RESEND_API_KEY?: string; RESEND_FROM?: string };
export async function notify(id: string, body: string, replyTo: string) {
 const config = env as unknown as MailEnvironment;
 if (!config.RESEND_API_KEY || !config.RESEND_FROM) return "not_configured";
 try {
  const response = await fetch("https://api.resend.com/emails", {method:"POST",headers:{"Authorization":"Bearer "+config.RESEND_API_KEY,"Content-Type":"application/json","Idempotency-Key":"portfolio-question-"+id},body:JSON.stringify({from:config.RESEND_FROM,to:["madhumitakolukuluri24@gmail.com"],subject:"New question for Madhumita from your portfolio",text:body,...(replyTo?{reply_to:replyTo}:{})}),signal:AbortSignal.timeout(10000)});
  return response.ok ? "sent" : "failed";
 } catch { return "failed"; }
}
