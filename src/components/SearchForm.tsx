import {searchValidator} from "@/validators/search.validator";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {NextRouter, useRouter} from "next/router";
import {useCallbackOne} from "use-memo-one";
import {FC} from "react";

type searchForm = {
    [key: string]: string;
};

type SearchObject = {
    name?: string;
    take?: number;
    skip?: number;
};

const SearchForm:FC = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<searchForm>({
        resolver: joiResolver(searchValidator),
        mode: 'onChange'
    });

    const router: NextRouter = useRouter();

    const onSubmit: SubmitHandler<searchForm> = useCallbackOne(({name}): void => {
        try {
            let searchObj: SearchObject = {};

            if (name) {
                searchObj.name = name;
            }

            router.push({
                pathname: '/events-page',
                query: searchObj,
            });
        } catch (error) {
            console.log(error);
        }
    }, [router]);

    return (
        <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" disabled={!isValid}>
                &#128269;
            </button>
            <input type="text" placeholder="Search" {...register("name")}/>
            <p className="search-error">{errors.name && errors.name.message}</p>
        </form>
    );
}

export {SearchForm};

