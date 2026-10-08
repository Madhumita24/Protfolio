import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {ownerFromCookie} from '@/lib/owner-auth';
export type ChatGPTUser={userId:string;displayName:string;email:string;fullName:string|null};
// This independently hosted Worker verifies its own session. Never trust caller-supplied identity headers.
export async function getChatGPTUser():Promise<ChatGPTUser|null>{try{return await ownerFromCookie((await headers()).get('cookie')||'')}catch{return null}}
export async function requireChatGPTUser(returnTo:string){const user=await getChatGPTUser();if(user)return user;redirect(chatGPTSignInPath(returnTo))}
export function chatGPTSignInPath(returnTo:string){const safe=returnTo==='/inbox'?'/inbox':'/manage';return '/owner-login?returnTo='+encodeURIComponent(safe)}
export function chatGPTSignOutPath(){return '/owner-login'}
