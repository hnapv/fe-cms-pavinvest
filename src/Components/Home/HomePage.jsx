import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { deleteUser, getListUsers } from "../../redux/apiRequest";
import "./home.css";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";

const HomePage = () => {
  // state => state.[lấy từ store].[state trong slide].[biến cần lấy]
  // ? này là optional chaining để nếu ko có thì ko handle, ? trong if else là ternary operator
  const user = useSelector(state => state.auth.login?.currentUser)
  const userList = useSelector(state => state.users.users?.allUsers)
  const msg = useSelector(state => state.users?.msg)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const axiosJWT = createAxios(user,dispatch,loginSuccess)
  
  const handDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT)
    console.log('delete=>',deleteUser)
  }

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (user?.accessToken) {
      getListUsers(user?.accessToken, dispatch, axiosJWT)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.admin ? `Admin` : `User`}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container" key={user._id}>
              <div className="home-user" >{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handDelete(user._id)}
              > Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errMessage">{msg}</div>
    </main>
  );
};

export default HomePage;
