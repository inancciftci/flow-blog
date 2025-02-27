"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const LoginButton = () => {
  const user = { user: 1 };
  const router = useRouter();

  if (!user) {
    return <Button>Login</Button>;
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/sign-in");
      }}
    >
      Logout
    </Button>
  );
};

export default LoginButton;
