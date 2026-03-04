'use client';

import { useTheme } from 'next-themes';

import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
   const { setTheme, resolvedTheme } = useTheme();

   return (
      <button
         aria-label="Toggle theme"
         className={styles.button}
         onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
         <span aria-hidden="true" className={styles.icon}>
            {resolvedTheme === 'dark' ? 'light' : 'dark'}
         </span>
      </button>
   );
};

export default ThemeToggle;
