import {MemoizedSideBar} from "@/components/SideBar";
import {client} from "@/configs/apollo-client";
import {ApolloProvider} from "@apollo/client";
import {useMemoOne} from "use-memo-one";
import type {AppProps} from 'next/app';
import {useRouter} from "next/router";
import '@/styles/globals.css'
import {AuthChecker} from "@/components/AuthChecker";


export default function App({Component, pageProps}: AppProps) {
    const {pathname} = useRouter();

    const currentRoute = useMemoOne(() => {
        return pathname === "/login-page";
    }, [pathname])

    return (
        <ApolloProvider client={client}>
            {!currentRoute && <MemoizedSideBar/>}
            <AuthChecker>
                <Component {...pageProps} />
            </AuthChecker>
        </ApolloProvider>
    )
};
