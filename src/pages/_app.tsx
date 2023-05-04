import {client} from "@/configs/apollo-client";
import {ApolloProvider} from "@apollo/client";
import {SideBar} from "@/components/SideBar";
import type { AppProps } from 'next/app'
import {useRouter} from "next/router";
import {useMemo} from "react";
import '@/styles/globals.css'


export default function App({Component, pageProps}: AppProps) {
    const {pathname} = useRouter();

    const currentRoute = useMemo(() => {
        return pathname === "/login-page";
    }, [pathname])

    return (
        <ApolloProvider client={client}>
            {!currentRoute && <SideBar/>}
            <Component {...pageProps} />
        </ApolloProvider>
    )
};
