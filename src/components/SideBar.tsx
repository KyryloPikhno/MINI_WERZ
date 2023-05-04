import {useRouter} from "next/router";
import Link from "next/link";


function SideBar() {
    const router = useRouter();

    // cannot get the data. Maybe I don't have the necessary permissions or access rights.

    // const {loading, error, data} = useQuery(USER_QUERY);

    return (
        <div className="sidebar">
            <div className="logo">
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
                User FullName
            </div>
        </div>
    )
}

export {SideBar};
