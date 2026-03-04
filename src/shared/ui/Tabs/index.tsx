import styles from './Tabs.module.scss';

const Tabs = ({ children, className }: { className?: string; children: React.ReactNode }) => {
   return <nav className={`${styles.tabsContainer} ${className}`}>{children}</nav>;
};

export default Tabs;
