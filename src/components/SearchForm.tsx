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

    const onSubmit: SubmitHandler<searchForm> = ({name}) => {
        try {
            router.push({
                pathname: '/events-page',
                query: {name, skip: 1, take: 5},
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="name" {...register("name")}/>
            {errors.name && <p className="error">{errors.name.message}</p>}

            <button type="submit" disabled={!isValid}>Enter</button>
        </form>
    );
}

export {SearchForm};
