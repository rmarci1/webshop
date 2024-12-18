interface ApiResponse {
    message: string;
  }
  
  const API_URL = 'http://localhost:3000';
  
  export const register = async (username: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return await response.json();
  };
  
  export const login = async (username: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return await response.json();
  };
  
  export const logout = async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    return await response.json();
  };
  
  export const fetchProtected = async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/protected`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    return await response.json();
  };

  export const updateUsername = async (
    currentUsername: string,
    newUsername: string
  ): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/update-username`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUsername, newUsername }),
      credentials: 'include',
    });
    if (!response.ok) {
      console.log(response);
      throw new Error('Username update failed');
    }
    return await response.json();
  };
  
 export const updatePassword = async (
  username: string,
  newPassword: string
): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/update-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, newPassword }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Password update failed');
  }
  return await response.json();
};

  