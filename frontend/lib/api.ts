const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token')
    }
    return null
}

const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
})

export const auth = {
    login: async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            
            const contentType = res.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server error. Please try again later.')
            }
            
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Login failed')
            return data
        } catch (error) {
            if (error instanceof Error) throw error
            throw new Error('Network error. Please check your connection.')
        }
    },

    register: async (fullName: string, email: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ fullName, email, password })
            })
            
            const contentType = res.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server error. Please try again later.')
            }
            
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Registration failed')
            return data
        } catch (error) {
            if (error instanceof Error) throw error
            throw new Error('Network error. Please check your connection.')
        }
    },

    logout: async () => {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: getAuthHeaders()
        })
        return res.json()
    }
}
export const password = {
    forgot: async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/forgot-password`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            
            const contentType = res.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server error. Please try again later.')
            }
            
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Failed to send reset email')
            return data
        } catch (error) {
            if (error instanceof Error) throw error
            throw new Error('Network error. Please check your connection.')
        }
    },

    reset: async (token: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ token, password })
            })
            
            const contentType = res.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server error. Please try again later.')
            }
            
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Failed to reset password')
            return data
        } catch (error) {
            if (error instanceof Error) throw error
            throw new Error('Network error. Please check your connection.')
        }
    }
}

export const links = {
    getAll: async () => {
        const res = await fetch(`${API_URL}/api/links`, {
            headers: getAuthHeaders()
        })
        return res.json()
    },

    create: async (linkData: Record<string, unknown>) => {
        const res = await fetch(`${API_URL}/api/links`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(linkData)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to create link')
        return data
    },

    update: async (id: string, linkData: Record<string, unknown>) => {
        const res = await fetch(`${API_URL}/api/links/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(linkData)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to update link')
        return data
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_URL}/api/links/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || data.error || 'Failed to delete link')
        return data
    }
}

export const qrs = {
    getAll: async () => {
        const res = await fetch(`${API_URL}/api/qrs`, {
            headers: getAuthHeaders()
        })
        return res.json()
    },

    create: async (qrData: Record<string, unknown>) => {
        const res = await fetch(`${API_URL}/api/qrs`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(qrData)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to create QR')
        return data
    },

    update: async (id: string, qrData: Record<string, unknown>) => {
        const res = await fetch(`${API_URL}/api/qrs/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(qrData)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to update QR')
        return data
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_URL}/api/qrs/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to delete QR')
        return data
    }
}

export const redirect = {
    check: async (customUrl: string, code?: string) => {
        const url = `${API_URL}/api/redirect/${customUrl}${code ? `?code=${code}` : ''}`
        return fetch(url, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        })
    }
}


export const analytics = {
    get: async (linkId: string, startDate?: string, endDate?: string) => {
        let url = `${API_URL}/api/analytics/${linkId}`
        if (startDate && endDate) {
            url += `?startDate=${startDate}&endDate=${endDate}`
        }
        const res = await fetch(url, {
            headers: getAuthHeaders()
        })
        return res.json()
    }
}

export const getLoginRedirectUrl = (token: string) => {
    return `${SITE_URL}?token=${token}`
}

export { API_URL, SITE_URL }