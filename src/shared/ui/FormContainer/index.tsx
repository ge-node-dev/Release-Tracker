import styles from './FormContainer.module.scss';

const FormContainer = ({
   children,
   className,
   ...props
}: React.FormHTMLAttributes<HTMLFormElement> & {
   className?: string;
   children: React.ReactNode;
}) => {
   return (
      <form className={`${styles.formContainer} ${className}`} {...props}>
         {children}
      </form>
   );
};

export default FormContainer;
