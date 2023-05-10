import {IEvent} from "@/interfaces/event.interface";
import {Pagination} from "@/components/Pagination";
import {SearchForm} from "@/components/SearchForm";
import {EVENTS_QUERY} from "@/queries/event-query";
import {NextRouter, useRouter} from "next/router";
import {MemoizedEvent} from "@/components/Event";
import {useMemoOne} from "use-memo-one";
import {useQuery} from '@apollo/client';
import {FC} from "react";


const Events:FC = () => {
    const router: NextRouter = useRouter();

    const name: string = useMemoOne(() => {
        return router.query.name as string || ""
    }, [router.query.name]);

    const skip: number = useMemoOne(() => {
        return parseInt(router.query.skip as string) || 0
    }, [router.query.skip]);

    const take: number = useMemoOne(() => {
        return parseInt(router.query.take as string) || 9
    }, [router.query.take]);

    const {loading, error, data} = useQuery(EVENTS_QUERY, {
        variables: {name, skip, take},
    });

    if (loading) {
        return <div className="box"><div className="loader"></div></div>;
    }

    if (error) {
        console.error(error);
        return <div className="box">Error!</div>;
    }

    return (
        <div className="events-container">
            <h1 className="events-header">Events List</h1>
            <SearchForm/>
            <div className="table-container">

            <table className="table">
                <thead >
                <tr className="head">
                    <th className="event">Event <span className="triangle"></span></th>
                    <th className="date">Date <span className="triangle"></span></th>
                    <th className="venue">Venue <span className="triangle"></span></th>
                    <th className="sold">Tickets sold <span className="triangle"></span></th>
                    <th className="gross">Gross revenue <span className="triangle"></span></th>
                    <th className="status">Status <span className="triangle"></span></th>
                    <th className="action">Action</th>
                </tr>
                </thead>
                {data?.events && data.events.map((event: IEvent, index: number) => <MemoizedEvent key={index} event={event}/>)}
            </table>
            </div>
            <Pagination/>
        </div>
    );
}

export {Events};
