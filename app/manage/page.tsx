import {getChatGPTUser,chatGPTSignInPath} from '@/app/chatgpt-auth';
import {OWNER_EMAIL} from '@/lib/inbox';
import Editor from './Editor';
export const dynamic='force-dynamic';
export const metadata={title:'Manage portfolio | Madhumita'};
export default async function Manage(){const user=await getChatGPTUser();if(!user)return <main className="inbox"><a href="/">Back to portfolio</a><h1>Your portfolio studio</h1><p>Sign in with the ChatGPT account that owns this portfolio to edit your work.</p><a className="button primary" target="_top" href={chatGPTSignInPath('/manage')}>Sign in with ChatGPT</a></main>;if(user.email.toLowerCase()!==OWNER_EMAIL)return <main className="inbox"><h1>This dashboard is private.</h1><p>Only Madhumita’s owner account can edit this portfolio.</p><a href="/">Back to portfolio</a></main>;return <Editor/>}
