// import {useState, useEffect, useMemo, ChangeEvent} from "react";


import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/router";

const Pagination = () => {
    const totalItems = 700;
    const router = useRouter();
    const [skip, setSkip] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const take = useMemo(() => {
        return Number(router.query.take) || 9;
    }, [router.query.take]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newTake = Number(e.target.value); // Объявляем переменную для нового значения "take"
        try {
            let searchObj: any = {};

            if (newTake) { // Если есть новое значение "take", добавляем его в объект запроса
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

    const querySetter = async () => {
        try {
            let searchObj: any = {};

            if (router.query.name) {
                searchObj.name = router.query.name;
            }

            if (skip) {
                searchObj.skip = skip;
            }

            if (take) {
                searchObj.take = take;
            }

            console.log(searchObj);
            console.log(take, skip);

            await router.push({
                pathname: "/events-page",
                query: searchObj,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handlePrevClick = () => {
        if (skip === 0) {
            router.push({
                pathname: "/events-page",
                query: {
                    take: take,
                    ...(router.query.name && { name: router.query.name }),
                },
            });
        } else {
            setSkip(Math.max(skip - take, 0));
        }
    };

    const handleNextClick = () => {
        setSkip(Math.min(skip + take, totalItems - take));
    };

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        querySetter();
    }, [skip, take]);

    const isFirstPage = skip === 0;
    const isLastPage = skip + take >= totalItems;

    return (
        <div className="pagination">
            <p className="showing">
                {`Showing ${skip + 1}-${Math.min(skip + take, totalItems)} of ${totalItems}`}
            </p>
            <div className="rows">
                <label>Rows per page:</label>
                <select value={take} onChange={handleChange}> {/* Меняем value на take и передаем новый onChange */}
                    <option value={9}>9</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <button className="prev" onClick={handlePrevClick} disabled={isFirstPage}>
                &#8592;
            </button>
            <div className="page">{Math.floor(skip / take) + 1}</div>
            <button className="next" onClick={handleNextClick} disabled={isLastPage}>
                &#8594;
            </button>
        </div>
    );
};

export {Pagination};


// import { useRouter } from "next/router";
//
// const Pagination = () => {
//     const totalItems = 700;
//     const router = useRouter();
//     const [skip, setSkip] = useState(0);
//     const [isFirstRender, setIsFirstRender] = useState(true);
//
//     const take = useMemo(() => {
//         return Number(router.query.take) || 9;
//     }, [router.query.take]);
//
//     const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//         try {
//             let searchObj: any = {};
//
//             if (e.target.value) {
//                 searchObj.take = e.target.value;
//             }
//
//             if (router.query.skip) {
//                 searchObj.skip = Number(router.query.skip);
//             }
//
//             if (router.query.name) {
//                 searchObj.name = router.query.name;
//             }
//
//             router.push({
//                 pathname: '/events-page',
//                 query: searchObj,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     const querySetter = async () => {
//         try {
//             let searchObj: any = {};
//
//             if (router.query.name) {
//                 searchObj.name = router.query.name;
//             }
//
//             // if (skip) {
//             //     searchObj.skip = skip;
//             // }
//
//             if (take) {
//                 searchObj.take = take;
//             }
//
//             console.log(searchObj);
//             console.log(take, skip);
//
//                 await router.push({
//                     pathname: "/events-page",
//                     query: searchObj,
//                 });
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     const handlePrevClick = () => {
//         if (skip === 0) {
//             router.push({
//                 pathname: "/events-page",
//                 query: {
//                     take: take,
//                     ...(router.query.name && {name: router.query.name}),
//                 },
//             });
//         } else {
//             setSkip(prevSkip => Math.max(prevSkip - take, 0));
//         }
//     };
//
//     const handleNextClick = () => {
//         setSkip(Math.min(skip + take, totalItems - take));
//     };
//
//     useEffect(() => {
//         if (isFirstRender) {
//             setIsFirstRender(false);
//             return;
//         }
//         querySetter();
//     }, [skip, take]);
//
//     const isFirstPage = skip === 0;
//     const isLastPage = skip + take >= totalItems;
//
//     return (
//         <div className="pagination">
//             <p className="showing">
//                 {`Showing ${skip + 1}-${Math.min(skip + take, totalItems)} of ${totalItems}`}
//             </p>
//             <div className="rows">
//                 <label>Rows per page:</label>
//                 <select
//                     value={router.query.take}
//                     onChange={handleChange}
//                 >
//                     <option value={9}>9</option>
//                     <option value={20}>20</option>
//                     <option value={50}>50</option>
//                 </select>
//             </div>
//             <button className="prev" onClick={handlePrevClick} disabled={isFirstPage}>
//                 &#8592;
//             </button>
//             <div className="page">{Math.floor(skip / take) + 1}</div>
//             <button className="next" onClick={handleNextClick} disabled={isLastPage}>
//                 &#8594;
//             </button>
//         </div>
//     );
// };
//
// export { Pagination };









