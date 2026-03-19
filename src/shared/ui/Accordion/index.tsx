'use client';
import { useState } from 'react';

import { ArrowIcon } from '../Icons';

import styles from './Accordion.module.scss';

const Accordion = ({ children }: { children: React.ReactNode }) => {
   const [accordionOpen, setAccordionOpen] = useState(false);

   return (
      <div className={styles.wrapper}>
         <button className={styles.handle} onClick={() => setAccordionOpen((prev) => !prev)}>
            <h4>Tracklist</h4>
            <ArrowIcon
               width={20}
               height={20}
               className={styles.handleIcon}
               style={{ transform: accordionOpen ? 'rotate(-90deg)' : 'rotate(90deg)' }}
            />
         </button>

         <div data-open={accordionOpen} className={styles.content}>
            <div className={styles.contentInner}>{children}</div>
         </div>
      </div>
   );
};

export default Accordion;
