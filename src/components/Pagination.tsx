import {useMemoOne, useCallbackOne} from "use-memo-one";
import {NextRouter, useRouter} from "next/router";
import {useHotkeys} from "react-hotkeys-hook";
import {ChangeEvent, FC} from "react";

type SearchObject = {
    name?: string;
    take?: number;
    skip?: number;
};

const Pagination:FC = () => {
    const router: NextRouter = useRouter();

    const totalCount = 700;

    const skip = useMemoOne(() => {
        return parseInt(router.query.skip as string) || 0
    }, [router.query.skip]);

    const take = useMemoOne(() => {
        return parseInt(router.query.take as string) || 9
    }, [router.query.take]);

    const handlePrevious = useCallbackOne(() => {
        try {
            if (skip - take >= 0) {
                let searchObj: SearchObject = {};

                if (router.query.name) {
                    searchObj.name = router.query.name as string;
                }

                searchObj.skip = Number(skip - take);
                searchObj.take = Number(take);

                router.push({
                    pathname: "/events-page",
                    query: searchObj,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [router.query.name, skip, take]);

    const handleNext = useCallbackOne(() => {
        try {
            if (skip + take < totalCount) {
                let searchObj: SearchObject = {};

                if (router.query.name) {
                    searchObj.name = router.query.name as string;
                }

                searchObj.skip = Number(skip + take);
                searchObj.take = Number(take);

                router.push({
                    pathname: "/events-page",
                    query: searchObj,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [router, skip, take, totalCount]);

    const handleChange = useCallbackOne((e: ChangeEvent<HTMLSelectElement>) => {
        try {
            let searchObj: SearchObject = {};

            if (e.target.value) {
                searchObj.take = Number(e.target.value);
            }

            if (router.query.skip) {
                searchObj.skip = Number(router.query.skip);
            }

            if (router.query.name) {
                searchObj.name = router.query.name as string;
            }

            router.push({
                pathname: '/events-page',
                query: searchObj,
            });
        } catch (error) {
            console.log(error);
        }
    }, [router]);


    useHotkeys('z', () => handlePrevious());
    useHotkeys('x', () => handleNext());

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
            <p className="showing">{`Showing ${skip + 1}-${Math.min(skip + take, totalCount)} of ${totalCount}`}</p>
            <button className="prev" onClick={handlePrevious} disabled={skip === 0}>
                &#8592;
            </button>
            <div className="page">{Math.floor(skip / take) + 1}</div>
            <button className="next" onClick={handleNext} disabled={skip + take >= totalCount}>
                &#8594;
            </button>
        </div>
    );
};

export {Pagination};

