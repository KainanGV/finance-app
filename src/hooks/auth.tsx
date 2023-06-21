import {ReactNode, createContext, useContext, useState} from "react"
import * as AuthSession from "expo-auth-session"

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthorizationResponse {
  params: {
    access_token: string
  },
  type: string;
}

interface IAuthContextData {
  user: User
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) => {
  const[user,setUser] = useState<User>({} as User)

  async function signInWithGoogle() {
    try {
      const clientId = "98177177589-er6tj169evnltu7bqo8h0uuf3m7i9qg8.apps.googleusercontent.com"
      const redirectURI = "https://auth.expo.io/@kainangv/gofinances"
      const responseType = "token"
      const scope = encodeURI("profile email")

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}`

      const {type, params} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse

      if(type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json();
        
        setUser({id: userInfo.id, email: userInfo.email, name: userInfo.given_name, photo: userInfo.picture})
      }

    } catch(error: any) {
      throw new Error(error)
    }
  }


  return (
    <AuthContext.Provider value={{user: {email: "", name: "", id: ""}, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext<IAuthContextData>(AuthContext)
  return context
}