import styles from './FormErrorText.module.scss';

const FormErrorText = ({ error }: { error: string }) => {
   return <p className={styles.error}>{error}</p>;
};

export default FormErrorText;
