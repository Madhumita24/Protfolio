import {database} from './inbox';
import {initialContent,type Content} from './content';
export type ContentRow={draft:string;published:string|null;revision:number;published_at:string|null};
export async function contentRow(){return database().prepare('SELECT draft,published,revision,published_at FROM portfolio_content WHERE id=?').bind('main').first<ContentRow>()}
export async function publishedContent():Promise<Content>{const row=await contentRow();return row?.published?JSON.parse(row.published):initialContent}
