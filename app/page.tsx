import Portfolio from './Portfolio';
import {publishedContent} from '@/lib/content-store';
export const dynamic='force-dynamic';
export default async function Home(){try{return <Portfolio content={await publishedContent()}/>}catch{return <main className="inbox"><h1>Portfolio temporarily unavailable</h1><p>Please reload in a moment.</p></main>}}
