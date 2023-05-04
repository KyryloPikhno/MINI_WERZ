import {IProps} from "@/interfaces/props.interface";
import moment from 'moment';
import {memo} from "react";

function Event({event}: IProps) {
    const {
        iconUrl,
        grossRevenue,
        publishingStatus,
        name,
        start,
        end,
        ticketsSold,
        location,
        ticketsTotal
    } = event;

    const format = 'ddd, DD MMM YYYY, h:mm A';

    const formattedDateStart = moment(start).format(format);
    const formattedDateEnd = moment(end).format(format);

    return (
        <tbody className="tbody">
        <tr>
            <td className="td-event">
                <div>{iconUrl && <img className="iconUrl" src={iconUrl} alt={iconUrl}/>}</div>
                <div>{name}</div>
            </td>
            <td>
                <div>From: {formattedDateStart}</div>
                <div>To: {formattedDateEnd}</div>
            </td>
            <td>{location ? location : '~'}</td>
            <td>{ticketsTotal === 0 ? '~' : `${ticketsSold}/${ticketsTotal}`}</td>
            <td>{grossRevenue === 0 ? '~' : `SEK ${grossRevenue}`}</td>
            {publishingStatus === "Past" &&<td><div className="past">{publishingStatus}</div></td>}
            {publishingStatus === "Draft" &&<td><div className="draft">{publishingStatus}</div></td>}
            {publishingStatus === "Active" &&<td><div className="active">{publishingStatus}</div></td>}
            <td><div className="action">...</div></td>
        </tr>
        </tbody>
    )
}

export const MemoizedEvent = memo(Event);
