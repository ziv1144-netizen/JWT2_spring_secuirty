// Change to '' if using Vite Proxy (Option A), or 'http://localhost:8080' if using CORS (Option B)
const BASE_URL = 'http://localhost:8080';

// 1. Login (maps to UserLoginController & LoginRequest / LoginResponse)
export async function loginUser(username, password) {
    const response = await fetch(`${BASE_URL}/api/auth/login`, { // Adjust path to match your @PostMapping
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    const data = await response.json();
    // Save the token returned by LoginResponse (adjust 'data.token' if your field is named differently, e.g., 'jwt' or 'accessToken')
    localStorage.setItem('jwt_token', data.token);
    return data;
}

// 2. Register (maps to UserLoginController & RegisterRequest)
export async function registerUser(registerPayload) {
    const response = await fetch(`${BASE_URL}/auth/register`, { // Adjust path to match your @PostMapping
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerPayload),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
}

// 3. Fetch Protected Data (maps to ResourceController via JwtAuthFilter)
export async function fetchProtectedResource(endpointPath) {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(`${BASE_URL}${endpointPath}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Required by JwtAuthFilter
        },
    });

    if (!response.ok) {
        throw new Error(`Access denied (${response.status})`);
    }

    // Use .text() if ResourceController returns a plain String, or .json() if it returns JSON
    return response.text();
}