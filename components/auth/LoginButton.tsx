import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
const LoginButton = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  if (!user) {
    return <Link href={"/login"}>Login</Link>;
  }
  return <Link href={"/"}>Logout ({user?.user_metadata?.username})</Link>;
};

export default LoginButton;
