import {NextRouter, useRouter} from "next/router";
import {useCallbackOne} from "use-memo-one";
import {FC, memo} from "react";
import Link from "next/link";


const SideBar:FC = () => {
    const router: NextRouter = useRouter();

    // cannot get the user data.
    // Maybe I don't have the necessary permissions or access rights.
    // const {loading, error, data} = useQuery(USER_QUERY);

    const returner = useCallbackOne(() => {
        router.push({
            pathname: '/events-page',
            query: {},
        });
    }, [router]);

    return (
        <div className="sidebar">
            <div className="logo" onClick={returner}>
                <img src="/imgs/Vector.png" alt="Logo"/>
            </div>
            <div className="links">
                <Link href="/events-page"
                      className={`link ${router.pathname === "/events-page" ? 'active-link' : ''}`}
                >
                    Events
                </Link>
                {router.pathname === "/events-page" && <div className="link-link">Events list</div>}
                <Link href="/test-page"
                      className={`link ${router.pathname === "/test-page" ? 'active-link' : ''}`}
                >
                    Test
                </Link>
            </div>
            <div className="user-later">U</div>
            <div className="user">
                User
            </div>
        </div>
    )
}

export const MemoizedSideBar = memo(SideBar);
