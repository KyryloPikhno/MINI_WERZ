import {IProps} from "@/interfaces/props.interface";
import {memo} from "react";


function Event({event}: IProps) {
    const {name, start, end, ticketsSold} = event;

    return (
        <div>
            <h2>name: {name}</h2>
            <p>Start time: {start}</p>
            <p>End time: {end}</p>
            <p>Tickets sold: {ticketsSold}</p>
        </div>
    )
}

export const MemoizedEvent = memo(Event);
