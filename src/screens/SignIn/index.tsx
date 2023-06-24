import {Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper} from "./styles"
import Apple from "../../assets/apple.svg"
import Google from "../../assets/google.svg"
import Logo from "../../assets/logo.svg"
import { RFValue } from "react-native-responsive-fontsize"
import { SignInSocialButton } from "../../components/SignInSocialButton"
import { useAuth } from "../../hooks/auth"
import { ActivityIndicator, Alert, Platform } from "react-native"
import { useState } from "react"
import { useTheme } from "styled-components"

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {signInWithGoogle}= useAuth()
  const theme = useTheme()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      await signInWithGoogle()

    } catch (error) {
      console.log(error)
      Alert.alert("Erro durante a autenticação")
      setIsLoading(false)
    } 
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />
          <Title> Controle suas {'\n'} finanças de forma {'\n'} muito simples </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          {
            Platform.OS === 'ios' ? 
            <SignInSocialButton title="Entrar com a Apple" svg={Apple} /> : 
            <SignInSocialButton onPress={handleSignInWithGoogle} title="Entrar com o Google" svg={Google} />
}          
        </FooterWrapper>
      </Footer>

      {isLoading && <ActivityIndicator color={theme.colors.shape} size={"large"} style={{marginTop: 18}}/>}
    </Container>
  )
}