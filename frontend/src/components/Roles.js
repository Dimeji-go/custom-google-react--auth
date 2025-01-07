import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const Roles = () => {
  const axiosPrivate = useAxiosPrivate();

  const { auth, setAuth } = useAuth();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const userId = decoded?.UserInfo?.userId;
  console.log(userId);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpgradePermission = async (permission) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.put(
        "http://localhost:5000/roles/upgrade",
        {
          permission,
          userId,
        },
      );
      setMessage(response.data.message);
      setError("");
      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });
    } catch (error) {
      setError(error.response?.data?.message || "Error upgrading permission.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePermission = async (permission) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.put(
        "http://localhost:5000/roles/remove",
        {
          permission,
          userId,
        },
      );
      setMessage(response.data.message);
      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Error removing permission.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Permission Manager</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        disabled={loading}
        onClick={() => handleUpgradePermission("Editor")}
      >
        Upgrade to Editor
      </button>
      <button
        disabled={loading}
        onClick={() => handleUpgradePermission("Admin")}
      >
        Upgrade to Admin
      </button>
      <button
        disabled={loading}
        onClick={() => handleRemovePermission("Editor")}
      >
        Remove Editor
      </button>
      <button
        disabled={loading}
        onClick={() => handleRemovePermission("Admin")}
      >
        Remove Admin
      </button>
    </div>
  );
};

export default Roles;
