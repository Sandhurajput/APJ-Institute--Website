export const storeAuthSession = ({ token, user, role, email }) => {
  if (token) {
    localStorage.setItem('token', token);
  }

  if (role) {
    localStorage.setItem('role', role);
  }

  if (email) {
    localStorage.setItem('email', email);
  }

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('user');
};

export const getDefaultDashboardPath = (role) => {
  return role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
};
