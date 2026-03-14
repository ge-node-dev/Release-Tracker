import styles from './FormErrorText.module.scss';

const FormErrorText = ({
   error,
   align = 'center',
   disableTopMargin = false,
}: {
   error: string;
   align?: 'start' | 'center';
   disableTopMargin?: boolean;
}) => {
   return (
      <p data-align={align} className={`${styles.error} ${disableTopMargin ? styles.disableTopMargin : ''}`}>
         {error}
      </p>
   );
};

export default FormErrorText;
