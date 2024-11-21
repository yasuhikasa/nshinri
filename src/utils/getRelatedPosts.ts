import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getRelatedPosts = (currentSlug: string) => {
  const postsDirectory = path.join(process.cwd(), 'contents', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const allPosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  // 現在のスラッグを除外
  return allPosts.filter((post) => post.slug !== currentSlug).slice(0, 3); // 上位3件を返す
};
