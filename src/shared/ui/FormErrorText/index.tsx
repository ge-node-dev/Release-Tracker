import styles from './FormErrorText.module.scss';

const FormErrorText = ({ error, disableTopMargin = false }: { error: string; disableTopMargin?: boolean }) => {
   return <p className={`${styles.error} ${disableTopMargin ? styles.disableTopMargin : ''}`}>{error}</p>;
};

export default FormErrorText;
