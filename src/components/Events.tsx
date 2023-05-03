import {useQuery} from '@apollo/client';
import {EVENTS_QUERY} from "@/queries/event-query";
import {IEvent} from "@/interfaces/event.interface";
import {useRouter} from "next/router";
import {MemoizedEvent} from "@/components/Event";
import {SearchForm} from "@/components/SearchForm";

function Events() {
    const router = useRouter();

    const name = router.query.name || "";
    const skip = parseInt(router.query.skip as string) || 0;
    const take = parseInt(router.query.take as string) || 10;

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
            <SearchForm/>
            {data?.events && data.events.map((event: IEvent, index: number) => <MemoizedEvent key={index} event={event}/>)}
        </div>
    );
}

export {Events};
