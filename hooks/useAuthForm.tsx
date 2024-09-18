import { UserType } from "@/constants/Types";
import { useAlert } from "./useAlert";
import { useCredentialSubmission } from "@/hooks/useCredentialSubmission";
import { useVerifyAccount } from "@/hooks/useVerifyAccount";
interface UseAuthFormProps {
  userType: UserType;
}

const useAuthForm = ({ userType }: UseAuthFormProps) => {
  const { alertInfo, showAlert, hideAlert } = useAlert();
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

  return {
    loading: formLoading || multiStepLoading,
    error: formError || multiStepError,
    alertInfo,
    showAlert,
    hideAlert,
    handleSubmit,
    handleMultiStepSubmit,
  };
};

export default useAuthForm;
