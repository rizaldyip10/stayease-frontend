import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authService } from "@/services/authService";

const GoogleAuthHandler: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      if (session?.user.googleToken) {
        try {
          // Check if user exists
          const userExists = await authService.checkUserExists(
            session.user.email,
          );

          if (userExists) {
            // User exists, exchange token and log in
            await authService.exchangeCode(session.user.googleToken);
            router.push("/dashboard");
          } else {
            // User doesn't exist, redirect to registration
            router.push("/register/select-user-type");
          }
        } catch (error) {
          console.error("Error during Google authentication:", error);
          // Handle error (e.g., show error message, redirect to login page)
        }
      }
    };

    handleGoogleAuth();
  }, [session]);

  return null; // or a loading indicator
};

export default GoogleAuthHandler;
