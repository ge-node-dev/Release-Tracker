import LinkButton from '@/shared/ui/Buttons/LinkButton';

import styles from './errorPage.module.scss';

const ErrorPageComponent = () => {
   return (
      <main className={styles.wrapper}>
         <h1 className={styles.title}>Something went wrong</h1>
         <p className={styles.description}>Please try again later.</p>
         <LinkButton href="/" size="medium" variant="secondary" ariaLabel="Go to home page">
            Go to home page
         </LinkButton>
      </main>
   );
};

export default ErrorPageComponent;
