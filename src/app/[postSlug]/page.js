import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { getBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateMetadata({ params }) {
	var { frontmatter } = await getBlogPost(params.postSlug);

	return {
		title: frontmatter.title,
		description: frontmatter.abstract,
	};
}

async function BlogPost({ params }) {
	var { frontmatter, content } = await getBlogPost(params.postSlug);

	return (
		<article className={styles.wrapper}>
			<BlogHero title={frontmatter.title} publishedOn={frontmatter.publishedOn} />
			<div className={styles.page}>
				<MDXRemote source={content} />
			</div>
		</article>
	);
}

export default BlogPost;
