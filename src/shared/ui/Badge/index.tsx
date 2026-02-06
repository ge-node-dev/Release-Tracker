import { ReactNode } from 'react';

import styles from './Badge.module.scss';

interface BadgeProps {
   children?: ReactNode;
}

export const Badge = ({ children }: BadgeProps) => {
   return <div className={styles.badge}>{children}</div>;
};
