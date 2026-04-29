import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState({ id: 1, nom: 'RAFANOMEZANTSOA', prenom: 'Anja', email: 'demo@immogest.com', role: 'proprietaire' })
  const [token,   setToken]   = useState('demo-token')
  const [loading, setLoading] = useState(false)

  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('immogest_token', userToken)
    localStorage.setItem('immogest_user',  JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('immogest_token')
    localStorage.removeItem('immogest_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider')
  }
  return context
}
