import {ILogin, ILoginForm} from "@/interfaces/login.interface";
import {loginValidator} from "@/validators/login.validator";
import {LOGIN_MUTATION} from "@/queries/login-query";
import {joiResolver} from "@hookform/resolvers/joi";
import {NextRouter, useRouter} from "next/router";
import {FC, useEffect, useState} from "react";
import {useCallbackOne} from "use-memo-one";
import {useMutation} from "@apollo/client";
import {useForm} from "react-hook-form";


const Login: FC = () => {
    const [login, {loading, error}] = useMutation(LOGIN_MUTATION);

    const [authError, setAuthError] = useState<string | null>(null);

    const [dots, setDots] = useState<number>(0);

    const router: NextRouter = useRouter();

    const {register, watch, handleSubmit, formState: {errors, isValid}} = useForm<ILoginForm>({
        resolver: joiResolver(loginValidator),
        mode: 'onChange'
    });

    const identifier: string = watch("identifier");
    const password: string = watch("password");

    useEffect(() => {
        setAuthError(null);
    }, [password, identifier]);

    useEffect(() => {
        if (loading) {
            const intervalId = setInterval(() => {
                setDots((dots) => (dots + 1) % 4);
            }, 200);

            return () => clearInterval(intervalId);
        } else {
            setDots(0);
        }
    }, [loading]);

    const onSubmit: (data: ILogin) => Promise<void> = useCallbackOne(async (loginData: ILogin) => {
        try {
            const {identifier, password} = loginData;
            const {data} = await login({variables: {identifier, password}});

            if (data.login.token) {
                localStorage.setItem('token', data.login.token);
                await router.push('/events-page');
            } else {
                setAuthError("Wrong username or password");
            }
        } catch (error) {
            console.error(error);
        }
    }, [login, router]);

    return (
        <div className="login-container">
            <img className="logoWERZ" src="/imgs/Logo.png" alt="logo"/>
            <h1 className="login-header">Login</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>

                <div className="username-box">
                    <div className="label-box">
                        <label className="label">Username</label>
                        <div className="ellipse"></div>
                    </div>
                    <input className="field" type="text" placeholder="Enter username..." {...register("identifier")}/>
                     <p className="auth-error">{ errors.identifier && errors.identifier.message}</p>
                </div>

                <div className="password-box">
                    <div className="label-box">
                        <label className="label">Password</label>
                        <div className="ellipse"></div>
                    </div>
                    <input className="field" type="password" placeholder="Enter password..." {...register("password")}/>
                    <p className="auth-error">{errors.password && errors.password.message}</p>

                     <p className="auth-error">{authError && authError}</p>
                     <p className="auth-error">{error && error.message}</p>
                </div>

                <button className={!isValid ? "disabled-login-button" : "login-button"} type="submit" disabled={loading || !isValid}>
                    {loading ? `Log in${'.'.repeat(dots)}` : "Log in"}
                </button>
            </form>
            <p className="info">© WERZ 2023, all rights reserved</p>
        </div>
    );
};

export {Login};
