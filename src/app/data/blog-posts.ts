export type BlogPost = {
  slugEs: string;
  slugEn: string;
  titleEs: string;
  titleEn: string;
  excerptEs: string;
  excerptEn: string;
  youtubeUrl: string;
  bodyEs: string[];
  bodyEn: string[];
  keywords: string[];
  publishedAt: string;
};

export const BLOG_POSTS: BlogPost[] = [];
