import {useRouter, NextRouter} from "next/router";
import {FC, ReactNode, useEffect} from "react";

interface AuthCheckerProps {
    children: ReactNode;
}

const AuthChecker: FC<AuthCheckerProps> = ({ children }: AuthCheckerProps): JSX.Element => {
    const router: NextRouter = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login-page");
        }
    }, [router]);

    return <>{children}</>;
};

export { AuthChecker };
