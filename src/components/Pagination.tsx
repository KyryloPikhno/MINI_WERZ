import {ChangeEvent, useMemo} from "react";
import {useRouter} from "next/router";

const Pagination = () => {
    const router = useRouter();
    //i need count of events

    const page = useMemo(() => {
        return router.query.skip || 1
    }, [router.query.skip]);

    const pageSize = useMemo(() => {
        return router.query.take || 9
    }, [router.query.take]);

    const totalCount = 400;

    const totalPages = Math.ceil(Number(totalCount) / Number(pageSize));

    const previousPage = Number(page)  > 1 ? Number(page)  - 1 : 1;
    const nextPage = Number(page)  < totalPages ? Number(page)  + 1 : totalPages;

    const handleChange = (e:ChangeEvent<HTMLSelectElement>) =>{
        try {
            let searchObj: any = {};

            if (e.target.value) {
                searchObj.take = e.target.value;
            }

            if (router.query.skip) {
                searchObj.skip = Number(router.query.skip);
            }

            if (router.query.name) {
                searchObj.name = Number(router.query.name);
            }

            router.push({
                pathname: '/events-page',
                query: searchObj,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const querySetter =(query:number,rule:string)=>{
        try {
            let searchObj: any = {};

            if (router.query.name) {
                searchObj.name = router.query.name;
            }

            if (query && rule === '+') {
                searchObj.skip = rule === '+' ? Number(query) + Number(pageSize) : Number(query) - Number(pageSize);
            }

            if (router.query.take) {
                searchObj.take = Number(router.query.take);
            }

            router.push({
                pathname: '/events-page',
                query: searchObj,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="pagination">
            <div className="rows">
                <label>Rows per page:</label>
                <select
                    value={router.query.take}
                    onChange={handleChange}
                >
                    <option value={9}>9</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <p className="showing">{`Showing 1/10`}</p>
            <div className="page">{page}</div>
            {Number(page) > 1 && (
                <button className="prev" onClick={() => querySetter(previousPage, '-')}>
                    &#8592;
                </button>
            )}
            {Number(page) < totalPages && (
                <button className="next" onClick={() => querySetter(nextPage, '+')}>
                    &#8594;
                </button>
            )}
        </div>
    );
};

export {Pagination};






