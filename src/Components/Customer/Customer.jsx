import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListCustomers } from "../../api/customerAPI";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import "./customer.css"

const Customers = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.auth.login?.currentUser)
  const customerList = useSelector(state => state.customers.customers?.allCustomers)

  const axiosJWT = createAxios(user, dispatch, loginSuccess)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (user?.accessToken) {
      getListCustomers(dispatch, navigate, user?.accessToken, axiosJWT)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <main className="container">
      <div className="title">Danh sách khách hàng</div>
      <div className="customer-list">
        <table>
        <tbody>
          <tr>
            <th>Khách hàng</th>
            <th>Email</th>
          </tr>
          {customerList?.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.CustomerName} </td>
                <td>{user.Email}</td>
              </tr>
            );
          })}
           </tbody>
        </table>
      </div>
      {/* <div className="errMessage">{msg}</div> */}
    </main>
  );
}

export default Customers
