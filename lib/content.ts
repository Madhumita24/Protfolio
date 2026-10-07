import {projects,experiences,skills} from './portfolio';
import {z} from 'zod';
const text=z.string().max(5000);const short=z.string().max(200);const required=z.string().trim().min(1).max(200);
export const contentSchema=z.object({projects:z.array(z.object({title:required,category:z.enum(['Robotics','Learning']),color:z.enum(['mint','pink','orange','blue']),date:short,place:short,summary:text,detail:text,tags:z.array(short).max(30),glyph:short})).max(100),experiences:z.array(z.object({company:required,role:required,date:short,points:z.array(text).max(30)})).max(100),skills:z.array(z.object({title:required,items:z.array(short).max(60)})).max(30)});
export type Content=z.infer<typeof contentSchema>;
export const initialContent:Content={projects,experiences,skills} as Content;
