import React from 'react';
import dynamic from 'next/dynamic';
import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { getBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet';
import CircularColorsDemo from '@/components/CircularColorsDemo';

const LazyDivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'));

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
				<MDXRemote
					source={content}
					components={{ pre: CodeSnippet, DivisionGroupsDemo: LazyDivisionGroupsDemo, CircularColorsDemo: CircularColorsDemo }}
				/>
			</div>
		</article>
	);
}

export default BlogPost;
