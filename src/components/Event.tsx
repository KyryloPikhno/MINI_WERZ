import {IProps} from "@/interfaces/props.interface";
import {FC, memo} from "react";
import moment from 'moment'


const Event:FC<IProps> = ({event}) => {
    const {iconUrl, grossRevenue, publishingStatus, name, start, end, ticketsSold, location, ticketsTotal} = event;

    const format: string = 'ddd, DD MMM YYYY, h:mm A';

    const formattedDateStart: string = moment(start).format(format);
    const formattedDateEnd: string = moment(end).format(format);

    return (
        <tbody>
        <tr>
            <td className="td-event">
                <div>
                    {iconUrl ? <img className="iconUrl" src={iconUrl} alt={iconUrl}/>
                    :
                    <img className="iconUrlVector" src="/imgs/Vectorimg.png" alt="Vectorimg"/>}
                </div>
                <div>{name}</div>
            </td>
            <td className="td-date">
                <div>From: {formattedDateStart}</div>
                <div>To: {formattedDateEnd}</div>
            </td>
            <td className="td-enue">{location ? location : '~'}</td>
            <td className="td-sold">{ticketsTotal === 0 ? '~' : `${ticketsSold}/${ticketsTotal}`}</td>
            <td className="td-gross">{grossRevenue === 0 ? '~' : `SEK ${grossRevenue}`}</td>
            {publishingStatus === "Past" &&<td className="td-status"><div className="past">{publishingStatus}</div></td>}
            {publishingStatus === "Draft" &&<td className="td-status"><div className="draft">{publishingStatus}</div></td>}
            {publishingStatus === "Active" &&<td className="td-status"><div className="active">{publishingStatus}</div></td>}
            <td className="td-action"><div className="points">...</div></td>
        </tr>
        </tbody>
    )
}

export const MemoizedEvent = memo(Event);
