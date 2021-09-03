import data from './snippets.json';

export interface Snippet {
    name: string;
    value: string;
}

export const snippets: Snippet[] = data as Snippet[];