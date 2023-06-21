import {ReactNode, createContext, useContext, useEffect, useState} from "react"
import * as AuthSession from "expo-auth-session"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
  signOut: () => Promise<void>
  userStorageLoading: boolean
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const AuthContext = createContext({} as IAuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) => {
  const[user,setUser] = useState<User>({} as User)
  const [userStorageLoading, setUserStorageLoading] = useState<boolean>(true)

  async function signInWithGoogle() {
    try {
      const responseType = "token"
      const scope = encodeURI("profile email")

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${responseType}&scope=${scope}`

      const {type, params} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse

      if(type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json();

        setUser({id: userInfo.id, email: userInfo.email, name: userInfo.given_name, photo: userInfo.picture})
        await AsyncStorage.setItem("@gofinances:user", JSON.stringify(user))
      }

    } catch(error: any) {
      throw new Error(error)
    }
  }

  async function signOut() {
    setUser({} as User)

    await AsyncStorage.removeItem("@gofinances:user")
  }

  useEffect(() => {
    async function loadUserStorage() {
      const userStorage = await AsyncStorage.getItem("@gofinances:user")
      if(userStorage)  {
        const data = JSON.parse(userStorage!) as User
        setUser(data)
      }

      setUserStorageLoading(false)
    }

    loadUserStorage()
  }, [])

  return (
    <AuthContext.Provider value={{user, signInWithGoogle, signOut, userStorageLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext<IAuthContextData>(AuthContext)
  return context
}