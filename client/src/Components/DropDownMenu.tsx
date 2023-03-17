import { useAppContext } from "../context/AppContext";
import { formatDate } from "../utils/ConvertDBTime";
const DropDownMenu = () => {
  const ctx = useAppContext();

  if (ctx == null) return <div>Loading...</div>;

  const { user } = ctx;
  return (
    <div className="p-4 absolute top-17 left-4 text-black bg-white z-10 min-w-10 rounded-sm text-xl flex flex-col gap-2">
      <div className="capitalize text-center text-2xl">
        Welcome {user?.username}!
      </div>
      <div>Email: {user?.email}</div>
      <div>Member Since {formatDate(user?.registrationDate)}</div>
      {/* <div>Last Logged In At {formatDate(user?.lastLoginDate)}</div> */}
      <div>Role: {user?.role}</div>
      <button
        className="bg-mid-purple text-white p-1
      rounded-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default DropDownMenu;
