import {MemoizedSideBar} from "@/components/SideBar";
import {AuthChecker} from "@/components/AuthChecker";
import {client} from "@/configs/apollo-client";
import {ApolloProvider} from "@apollo/client";
import {useMemoOne} from "use-memo-one";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import "@/styles/searchForm.css";
import "@/styles/pagination.css";
import "@/styles/eventList.css";
import "@/styles/sideBar.css";
import "@/styles/globals.css";
import "@/styles/login.css";


export default function App({Component, pageProps}: AppProps) {
    const {pathname} = useRouter();

    const currentRoute = useMemoOne(() => {
        return pathname === "/login-page";
    }, [pathname]);

    return (
        <ApolloProvider client={client}>
            {!currentRoute && <MemoizedSideBar/>}
            <AuthChecker>
                <Component {...pageProps} />
            </AuthChecker>
        </ApolloProvider>
    )
};
