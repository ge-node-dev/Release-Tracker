'use client';

import { useTheme } from 'next-themes';

import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
   const { setTheme, resolvedTheme } = useTheme();

   return (
      <button
         className={styles.button}
         aria-label="Toggle theme"
         onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
         <span className={styles.themeLabel}>Light / Dark</span>
         <div className={styles.switch} data-checked={resolvedTheme === 'light'}>
            <div className={styles.switchHandle}></div>
         </div>
      </button>
   );
};

export default ThemeToggle;
