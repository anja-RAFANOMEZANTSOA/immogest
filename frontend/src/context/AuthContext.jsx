import { createContext, useContext, useState, useEffect } from 'react'

// Crée le contexte — comme une variable globale accessible partout
const AuthContext = createContext(null)

export function AuthProvider({ children }) {

  // user = l'utilisateur connecté (null si personne)
  const [user,    setUser]    = useState(null)
  const [token,   setToken]   = useState(null)
  const [loading, setLoading] = useState(true)

  // Au démarrage → vérifie si une session existe déjà
  useEffect(() => {
    const savedToken = localStorage.getItem('immogest_token')
    const savedUser  = localStorage.getItem('immogest_user')

    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch {
        // Si données corrompues → on nettoie
        localStorage.removeItem('immogest_token')
        localStorage.removeItem('immogest_user')
      }
    }
    setLoading(false)
  }, [])

  // Fonction appelée quand l'utilisateur se connecte
  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('immogest_token', userToken)
    localStorage.setItem('immogest_user',  JSON.stringify(userData))
  }

  // Fonction appelée quand l'utilisateur se déconnecte
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

// Hook personnalisé — permet d'utiliser useAuth() dans n'importe quelle page
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider')
  }
  return context
}