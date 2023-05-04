import {searchValidator} from "@/validators/search.validator";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useRouter} from "next/router";

type searchForm = {
    [key: string]: string;
};

function SearchForm() {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<searchForm>({
        resolver: joiResolver(searchValidator),
        mode: 'onChange'
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<searchForm> = async ({name}) => {
        try {
            let searchObj: any = {};

            if (name) {
                searchObj.name = name;
            }

            if (router.query.take) {
                searchObj.take = Number(router.query.take);
            }

            if (router.query.skip) {
                searchObj.skip = Number(router.query.skip);
            }

            await router.push({
                pathname: '/events-page',
                query: searchObj,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" disabled={!isValid}><img src="/imgs/zoom-out.png" alt="search"/></button>
            <input type="text" placeholder="Search" {...register("name")}/>
            {errors.name && <p className="error">{errors.name.message}</p>}
        </form>
    );
}

export {SearchForm};
