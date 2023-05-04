import {useRouter} from "next/router";
import Link from "next/link";

function SideBar() {
    const router = useRouter();

    return (
        <div className="sidebar">
            <div className="logo">
                Logo
            </div>
            <div className="links">
                <Link href="/events-page"
                      className={`link ${router.pathname === "/events-page" ? 'active-link' : ''}`}
                >
                    Events
                </Link>
                {router.pathname === "/events-page" && <div>Events list</div>}
                <Link href="/test-page"
                      className={`link ${router.pathname === "/test-page" ? 'active-link' : ''}`}
                >
                    Test
                </Link>
            </div>
            <div className="user-later">U</div>
            <div className="user">
                name surname
            </div>
        </div>
    )
}

export {SideBar};
