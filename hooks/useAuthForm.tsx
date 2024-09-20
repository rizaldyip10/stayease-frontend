import { UserType } from "@/constants/Types";
import { useAlert } from "./utils/useAlert";
import { useCredentialSubmission } from "@/hooks/useCredentialSubmission";
import { useVerifyAccount } from "@/hooks/useVerifyAccount";
import { useSelectUserType } from "@/hooks/useSelectUserType";
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
  const { handleUserTypeSubmit } = useSelectUserType();

  return {
    loading: formLoading || multiStepLoading,
    error: formError || multiStepError,
    alertInfo,
    showAlert,
    hideAlert,
    handleSubmit,
    handleMultiStepSubmit,
    handleUserTypeSubmit,
  };
};

export default useAuthForm;
