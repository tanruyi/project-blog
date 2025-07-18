'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import Cookies from 'js-cookie';

function Header({ initialTheme, className, ...delegated }) {
	const [theme, setTheme] = React.useState(initialTheme);

	function handleClick() {
		const nextTheme = theme == 'light' ? 'dark' : 'light';

		setTheme(nextTheme);

		const root = document.documentElement;

		root.setAttribute('data-color-theme', nextTheme);

		const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

		Object.entries(colors).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});

		Cookies.set('color-theme', nextTheme, { expires: 1000 });
	}

	return (
		<header className={clsx(styles.wrapper, className)} {...delegated}>
			<Logo />

			<div className={styles.actions}>
				<button className={styles.action}>
					<Rss
						size='1.5rem'
						style={{
							// Optical alignment
							transform: 'translate(2px, -2px)',
						}}
					/>
					<VisuallyHidden>View RSS feed</VisuallyHidden>
				</button>
				<button className={styles.action} onClick={handleClick}>
					{theme == 'light' ? <Sun size='1.5rem' /> : <Moon size='1.5rem' />}
					<VisuallyHidden>Toggle {theme == 'light' ? 'dark' : 'light'} mode</VisuallyHidden>
				</button>
			</div>
		</header>
	);
}

export default Header;
