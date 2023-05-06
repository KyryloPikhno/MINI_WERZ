import {ChangeEvent, useMemo} from "react";
import { useRouter } from "next/router";

type SearchObject = {
    name?: string;
    take?: number;
    skip?: number;
};

const Pagination = () => {
    const router = useRouter();

    const totalCount = 700;

    const skip = useMemo(() => {
        return parseInt(router.query.skip as string) || 0
    }, [router.query.skip]);

    const take = useMemo(() => {
        return parseInt(router.query.take as string) || 9
    }, [router.query.take]);

    const currentPage = skip / take + 1;
    const totalPages = Math.ceil(totalCount / take);

    const handlePrevious = () => {
        if (skip - take >= 0) {

            let searchObj: any = {};

            if (router.query.name) {
                searchObj.name = router.query.name;
            }

            searchObj.skip = Number(skip - take);

            searchObj.take = Number(take);

            router.push({
                pathname: "/events-page",
                query: searchObj,
            });
        }
    };

    const handleNext = () => {
        if (skip + take < totalCount) {
            let searchObj: any = {};

            if (router.query.name) {
                searchObj.name = router.query.name;
            }

            searchObj.skip = Number(skip + take);

            searchObj.take = Number(take);

            router.push({
                pathname: "/events-page",
                query: searchObj,
            });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newTake = Number(e.target.value);
        try {
            let searchObj: any = {};

            if (newTake) {
                searchObj.take = newTake;
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

    return (
        <div className="pagination">
            <div className="rows">
                <label>Rows per page:</label>
                <select value={take} onChange={handleChange}>
                    <option value={9}>9</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <p className="showing">
                {`Showing ${skip + 1}-${Math.min(skip + take, totalCount)} of ${totalCount}`}
            </p>
            <button className="prev" onClick={handlePrevious} disabled={skip === 0}>
                &#8592;
            </button>
            <span>
      </span>
            <div className="page">{Math.floor(skip / take) + 1}</div>
            <button className="next" onClick={handleNext} disabled={skip + take >= totalCount}>
                &#8594;
            </button>
        </div>
    );
};

export {Pagination};

