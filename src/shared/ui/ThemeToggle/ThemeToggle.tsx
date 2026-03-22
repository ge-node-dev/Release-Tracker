'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import styles from './ThemeToggle.module.scss';

const emptySubscribe = () => () => {
   /* empty */
};

const ThemeToggle = () => {
   const { setTheme, resolvedTheme } = useTheme();
   const mounted = useSyncExternalStore(
      emptySubscribe,
      () => true,
      () => false,
   );

   return (
      <button
         className={styles.button}
         aria-label="Toggle theme"
         onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
         <span className={styles.themeLabel}>Light / Dark</span>
         <div className={styles.switch} data-checked={mounted ? resolvedTheme === 'light' : undefined}>
            <div className={styles.switchHandle}></div>
         </div>
      </button>
   );
};

export default ThemeToggle;
