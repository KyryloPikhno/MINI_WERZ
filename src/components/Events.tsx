import {IEvent} from "@/interfaces/event.interface";
import {Pagination} from "@/components/Pagination";
import {SearchForm} from "@/components/SearchForm";
import {EVENTS_QUERY} from "@/queries/event-query";
import {MemoizedEvent} from "@/components/Event";
import {useQuery} from '@apollo/client';
import {useRouter} from "next/router";
import {useMemo} from "react";

function Events() {
    const router = useRouter();

    const name = useMemo(() => {
        return router.query.name as string || ""
    }, [router.query.name]);

    const skip = useMemo(() => {
        return parseInt(router.query.skip as string) || 0
    }, [router.query.skip]);

    const take = useMemo(() => {
        return parseInt(router.query.take as string) || 9
    }, [router.query.take]);

    const {loading, error, data} = useQuery(EVENTS_QUERY, {
        variables: {name, skip, take},
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }

    return (
        <div>
            <h1 className="events-header">Events List</h1>
            <SearchForm/>
            <table className="table">
                <thead >
                <tr className="head">
                    <th className="th-event">Event <div className="triangle"></div></th>
                    <th className="th-date">Date <div className="triangle"></div></th>
                    <th className="th-venue">Venue <div className="triangle"></div></th>
                    <th className="th-sold">Tickets sold <div className="triangle"></div></th>
                    <th className="th-cross">Gross revenue <div className="triangle"></div></th>
                    <th className="th-status">Status <div className="triangle"></div></th>
                    <th className="th-action">Action</th>
                </tr>
                </thead>
                {data?.events && data.events.map((event: IEvent, index: number) => <MemoizedEvent key={index} event={event}/>)}
            </table>
            <Pagination/>
        </div>
    );
}

export {Events};
