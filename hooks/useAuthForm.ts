import { UserType } from "@/constants/Types";
import { useCredentialSubmission } from "@/hooks/useCredentialSubmission";
import { useVerifyAccount } from "@/hooks/useVerifyAccount";
import { useSelectUserType } from "@/hooks/useSelectUserType";
interface UseAuthFormProps {
  userType: UserType;
}

const useAuthForm = ({ userType }: UseAuthFormProps) => {
  const {
    loading: formLoading,
    error: formError,
    handleSubmit,
  } = useCredentialSubmission(userType);
  const {
    loading: multiStepLoading,
    error: multiStepError,
    handleMultiStepSubmit,
  } = useVerifyAccount();
  const { handleUserTypeSubmit } = useSelectUserType();

  return {
    isLoading: formLoading || multiStepLoading,
    error: formError || multiStepError,
    handleSubmit,
    handleMultiStepSubmit,
    handleUserTypeSubmit,
  };
};

export default useAuthForm;
