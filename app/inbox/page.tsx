import { getChatGPTUser,chatGPTSignInPath } from "@/app/chatgpt-auth";
import { database, OWNER_EMAIL } from "@/lib/inbox";
export const dynamic="force-dynamic";
export default async function Inbox(){
 const user=await getChatGPTUser();
 if(!user)return <main className="inbox"><a href="/">Back to portfolio</a><h1>Private inbox</h1><p>Sign in with the code sent to your owner email.</p><a className="button primary" target="_top" href={chatGPTSignInPath("/inbox")}>Owner sign-in</a></main>;
 if(user.email.toLowerCase()!==OWNER_EMAIL)return <main className="inbox"><h1>This inbox is private.</h1><p>Only Madhumita’s owner account can read these messages.</p><a href="/">Back to portfolio</a></main>;
 try{
 const {results}=await database().prepare("SELECT id,kind,name,email,body,created_at,email_status FROM messages ORDER BY created_at DESC LIMIT 100").all<{id:string;kind:string;name:string;email:string;body:string;created_at:string;email_status:string}>();
 return <main className="inbox"><a href="/">Back to portfolio</a><h1>Your private inbox</h1><form action="/api/owner/logout" method="post"><button className="button">Sign out</button></form><p>Latest 100 notes and unanswered questions. Visible only to your owner account.</p>{results.length===0?<p>No messages yet.</p>:results.map(m=><article className="message" key={m.id}><span className="tag">{m.kind}</span><h2>{m.name||"Anonymous visitor"}</h2><p>{m.email}</p><p className="message-body">{m.body}</p><small>{m.created_at} · Email: {m.email_status.replaceAll("_"," ")}</small></article>)}</main>
 }catch{return <main className="inbox"><h1>Inbox temporarily unavailable</h1><p>Please reload in a moment.</p></main>}
}
