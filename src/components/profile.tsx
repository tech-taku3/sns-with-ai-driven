import { ProfileHeader } from "./profile/profile-header";
import { ProfileTabs } from "./profile/profile-tabs";
import { ProfileContent } from "./profile/profile-content";

export function Profile() {
  return (
    <section className="min-h-screen border-x border-black/10 dark:border-white/10">
      <ProfileHeader />
      <ProfileTabs />
      <ProfileContent />
    </section>
  );
}

export default Profile;
