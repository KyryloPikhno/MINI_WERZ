import {NextRouter, useRouter} from "next/router";
import {useCallbackOne} from "use-memo-one";
import {FC, memo, useState} from "react";
import Link from "next/link";


const SideBar: FC = () => {
    const router: NextRouter = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    // cannot get the user data.
    // Maybe I don't have the necessary permissions or access rights.
    // const {loading, error, data} = useQuery(USER_QUERY);

    const returner = useCallbackOne((): void => {
        router.push({
            pathname: '/events-page',
            query: {},
        });
    }, [router]);

    const toggleSidebar = (): void => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <button className={`open-button ${sidebarOpen && "work"}`} onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`sidebar ${sidebarOpen && "work"}`}>
                <div className="logo" onClick={returner}>
                    <img src="/imgs/Vector.png" alt="Logo"/>
                </div>
                <div className="links">
                    <Link href="/events-page" className={`link ${router.pathname === "/events-page" ? 'active-link' : ''}`}>
                        Events
                    </Link>
                    {router.pathname === "/events-page" && <div className="link-link">Events list</div>}
                    <Link href="/test-page" className={`link ${router.pathname === "/test-page" ? 'active-link' : ''}`}>
                        Test
                    </Link>
                </div>
                <div className="user-later">U</div>
                <div className="user">
                    User
                </div>
            </div>
        </>
    )
};

export const MemoizedSideBar = memo(SideBar);
