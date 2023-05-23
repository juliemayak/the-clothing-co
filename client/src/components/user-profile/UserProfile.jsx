import { useAuth0 } from "@auth0/auth0-react";
import Button from "@/components/button/Button";
import "./user-profile.scss";

const UserProfile = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth0();
  const handleLogout = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };
  console.log("user", user);

  return (
    <div className="user-profile">
      <h3 className="user-profile__title">User Profile</h3>

      <div className="user-profile__header">
        <img src={user?.picture} alt="" className="user-profile__img" />
        <h4>{user?.nickname}</h4>
        <Button onClick={handleLogout} text="Выйти" className="user-profile__btn" />
      </div>
    </div>
  );
};

export default UserProfile;
