import {ILogin, ILoginForm} from "@/interfaces/login.interface";
import {loginValidator} from "@/validators/login.validator";
import {LOGIN_MUTATION} from "@/queries/login-query";
import {joiResolver} from "@hookform/resolvers/joi";
import React, {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";


function Login() {
    const [login, {loading, error}] = useMutation(LOGIN_MUTATION);

    const [authError, setAuthError] = useState<string | null>(null);

    const router = useRouter();

    const {register, watch, handleSubmit, formState: {errors, isValid}} = useForm<ILoginForm>({
        resolver: joiResolver(loginValidator),
        mode: 'onChange'
    });

    const identifier = watch("identifier");
    const password = watch("password");

    useEffect(() => {
        setAuthError(null);
    }, [password, identifier]);

    const onSubmit: (data: ILogin) => Promise<void> = async (loginData: ILogin) => {
        try {
            const {identifier, password} = loginData;

            const {data} = await login({variables: {identifier, password}});

            if (data.login.token) {
                localStorage.setItem('token', data.login.token);
                await router.push('/events-page');
            } else {
                setAuthError("Wrong login or password");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <img className="logoWERZ" src="/imgs/Logo.png" alt="logo"/>
            <h1 className="login-header">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="username-label">Username</label>
                <div className="ellipse-username"></div>
                <input className="username-field" type="text" placeholder="Enter username..." {...register("identifier")}/>
                {errors.identifier && <p className="error-username">{errors.identifier.message}</p>}

                <label className="password-label">Password</label>
                <div className="ellipse-password"></div>
                <input className="password-field" type="password" placeholder="Enter password..." {...register("password")}/>
                {errors.password && <p className="error-password">{errors.password.message}</p>}

                {authError && <p className="error">{authError}</p>}
                {error && <p>{error.message}</p>}

                <button className={!isValid ? "disabled-login-button":"login-button"} type="submit" disabled={loading || !isValid}>
                    {loading? "Log in..." : "Log in"}
                </button>
            </form>
            <p className="info">© WERZ 2023, all rights reserved</p>
        </div>
    );
}

export {Login};
