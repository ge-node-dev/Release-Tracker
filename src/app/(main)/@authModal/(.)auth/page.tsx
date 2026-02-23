import AuthContent from '@/modules/auth/components/AuthContent';
import Modal from '@/shared/ui/Modal';

export default function AuthModalRoute() {
   return (
      <Modal>
         <AuthContent />
      </Modal>
   );
}
