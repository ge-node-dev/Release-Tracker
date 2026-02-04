import ReleaseCard from '@/shared/ui/ReleaseCard';

import { getReleasesList } from '../../services/releaseServices';

import styles from './styles.module.scss';

const ReleasesList = async () => {
   const { data } = await getReleasesList({ page: 1, period: 'all_time' });

   return (
      <section className={styles.wrapper}>
         {data.map((release) => (
            <ReleaseCard key={release.id} release={release} />
         ))}
      </section>
   );
};

export default ReleasesList;
