import { useMutation } from "@tanstack/react-query";

export const useEditData = <T, E = Error, V = Partial<T>>(
  mutationFn: (values: V) => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: E) => void,
) => {
  return useMutation<T, E, V>({
    mutationFn,
    onSuccess,
    onError,
  });
};
