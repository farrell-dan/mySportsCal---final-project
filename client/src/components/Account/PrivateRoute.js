import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ element, ...rest }) => {
  const { authenticated } = useAuth(); // Use your authentication context

  console.log(useAuth())
  console.log(authenticated);

  return (
    <Route
      {...rest}
      element={authenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;