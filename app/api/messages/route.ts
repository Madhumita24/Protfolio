import {allowedOrigin} from "@/lib/site-config";
import { database, notify } from "@/lib/inbox";
export async function POST(request:Request) {
 const origin = request.headers.get("origin");
 if(!allowedOrigin(origin)) return Response.json({error:"Please submit from the portfolio."},{status:403});
 if(!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({error:"Unsupported request."},{status:415});
 try {
  const raw=await request.text();
  if(raw.length>8000) return Response.json({error:"Your message is too long."},{status:413});
  const data=JSON.parse(raw);
  const body=typeof data.body==="string"?data.body.trim():"";
  const email=typeof data.email==="string"?data.email.trim():"";
  const name=typeof data.name==="string"?data.name.trim():"";
  if(data.website) return Response.json({error:"Unable to accept this submission."},{status:400});
  if(!["note","question"].includes(data.kind)||body.length<5||body.length>2000||name.length>80||email.length>254||(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return Response.json({error:"Please check your message and email address."},{status:400});
  const db=database();
  const ip=request.headers.get("cf-connecting-ip")||"unknown";
  const bytes=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(ip+"|"+new Date().toISOString().slice(0,13)));
  const key=Array.from(new Uint8Array(bytes)).map(x=>x.toString(16).padStart(2,"0")).join("");
  const limit=await db.prepare("INSERT INTO submission_limits (key,count) VALUES (?,1) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(key).first<{count:number}>();
  if(!limit || limit.count>5) return Response.json({error:"Please try again in an hour."},{status:429});
  const id=crypto.randomUUID();
  await db.prepare("INSERT INTO messages (id,kind,name,email,body,created_at,email_status) VALUES (?,?,?,?,?,?,?)").bind(id,data.kind,name,email,body,new Date().toISOString(),"pending").run();
  const status=await notify(id,"From: "+(name||"A portfolio visitor")+"\nReply email: "+(email||"Not provided")+"\n\n"+body,email,data.kind);
  await db.prepare("UPDATE messages SET email_status=? WHERE id=?").bind(status,id).run();
  return Response.json({saved:true,emailSent:status==="sent"});
 } catch(error) {console.error("Submission failed",error instanceof Error?error.message:"unknown");return Response.json({error:"The inbox is temporarily unavailable. Your message has not been confirmed. Please try again."},{status:503});}
}
