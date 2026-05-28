// Exposes shared authentication state and actions.
import {
  useAuthContext,
} from "../context/AuthContext";

const useAuth = () => useAuthContext();

export default useAuth;
