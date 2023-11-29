import { useRouter } from "next/router";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <h1 className="center">Loading...</h1>;
  }

  if (status === "unauthenticated") {
    router.push("/auth");
    return;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
