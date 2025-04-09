'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-localstorage'

type EmailContextType = {
  email: string
  setEmail: (email: string) => void
}

const AuthenticateContext = createContext<EmailContextType | undefined>(undefined)

export function AuthenticateProvider({ children }: { children: ReactNode }) {
  const [storageEmail, setStorageEmail] = useLocalStorage<string>('email', '')
  const [email, setEmail] = useState<string>(storageEmail)

  const handleSetEmail = (email: string) => {
    setEmail(email)
    setStorageEmail(email)
  }

  return (
    <AuthenticateContext.Provider value={{ email, setEmail: handleSetEmail }}>
      {children}
    </AuthenticateContext.Provider>
  )
}

export function useAuthenticate() {
  const context = useContext(AuthenticateContext)
  if (!context) {
    throw new Error('useAuthenticate must be used within an AuthenticateProvider')
  }
  return context
}
