import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./main-navigation.module.css";
import { useRouter } from "next/router";

function MainNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const logoutHandler = (event) => {
    event.preventDefault();
    signOut({ redirect: false });
    router.push("/auth");
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
