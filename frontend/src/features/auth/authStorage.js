const AUTH_STORAGE_KEY = "crafton_auth";

export const getStoredAuth = () => {
  try {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : null;
  } catch {
    return null;
  }
};

export const saveAuth = (authData) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      user: authData?.user || null,
    })
  );
  window.dispatchEvent(new Event("auth-change"));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-change"));
};
