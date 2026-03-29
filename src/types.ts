export type PostType = 'Reels' | 'Carrossel' | 'Estático';

export interface ContentIdea {
  type: PostType;
  hook: string;
  visualIdea: string;
  caption: string;
}

export interface NicheData {
  [key: string]: ContentIdea[];
}
