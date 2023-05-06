import {NextRouter, useRouter} from "next/router";
import {useEffect} from "react";


export default function Home() {
  const router: NextRouter = useRouter();

  useEffect(() => {
    router.push('/login-page');
  }, [router]);

  return null;
};
