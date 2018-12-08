export interface BlogPost {
    id: number;
    frontmatter: {
      draft: boolean;
      title: string;
      description: string;
      path: string;
      keywords: string;
      date: string;
    };
    html: string;
}
