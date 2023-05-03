import { useQuery } from '@apollo/client';
import {EVENTS_QUERY} from "@/queries/event-query";
import {IEvent} from "@/interfaces/event.interface";

function Events() {
    const {loading, error, data} = useQuery(EVENTS_QUERY);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }

    return (
        <div>
            {data?.events && data.events.map((event: IEvent, index: number) => (
                <div key={index}>
                    <h2>{event.name}</h2>
                    <p>Start time: {event.start}</p>
                    <p>End time: {event.end}</p>
                    <p>Tickets sold: {event.ticketsSold}</p>
                </div>
            ))}
        </div>
    );
}

export {Events};
