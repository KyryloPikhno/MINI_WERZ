import {ILogin, ILoginForm} from "@/interfaces/login.interface";
import {loginValidator} from "@/validators/login.validator";
import {joiResolver} from "@hookform/resolvers/joi";
import {LOGIN_MUTATION} from "@/queries/login-query";
import {useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import React from "react";


function Login() {
    const [login, {loading, error}] = useMutation(LOGIN_MUTATION);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<ILoginForm>({
        resolver: joiResolver(loginValidator),
        mode: 'onChange'
    });

    const onSubmit: (data: ILogin) => Promise<void> = async (loginData: ILogin) => {
        try {
            const {identifier, password} = loginData;

            const {data} = await login({variables: {identifier, password}});

            localStorage.setItem('token', data.login.token);

            await router.push('/events-page');
        } catch (error) {
            console.error(error);
            // @ts-ignore
            if (error || error.graphQLErrors.some((e) => e.extensions.code === 'UNAUTHENTICATED')) {
                await router.push('/login-page');
            } else {
                console.error(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="identifier" {...register("identifier")}/>
            {errors.identifier && <p className="error">First Name is required.</p>}

            <input type="password" placeholder="password" {...register("password")}/>
            {errors.password && <p className="error">First Name is required.</p>}

            <button type="submit" disabled={loading}>
                {loading ? 'Entering...' : 'Enter'}
            </button>
            {error && <p>{error.message}</p>}
        </form>
    );
}

export {Login};
