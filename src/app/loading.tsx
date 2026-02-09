import { ReleaseCardSkeleton } from '@/shared/ui/ReleaseCard';
import SkeletonWrapper from '@/shared/ui/SkeletonWrapper';

import styles from '@/modules/release/components/ReleasesList/ReleasesList.module.scss';

const Loading = () => {
   return (
      <section className={styles.wrapper}>
         <SkeletonWrapper>
            <div className={styles.releasesGrid}>
               {Array.from({ length: 10 }).map((_, index) => (
                  <ReleaseCardSkeleton key={index} />
               ))}
            </div>
         </SkeletonWrapper>
      </section>
   );
};

export default Loading;
