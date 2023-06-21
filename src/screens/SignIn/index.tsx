import {Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper} from "./styles"
import Apple from "../../assets/apple.svg"
import Google from "../../assets/google.svg"
import Logo from "../../assets/logo.svg"
import { RFValue } from "react-native-responsive-fontsize"
import { SignInSocialButton } from "../../components/SignInSocialButton"
import { useAuth } from "../../hooks/auth"
import { Alert } from "react-native"

export const SignIn = () => {
  const {signInWithGoogle}= useAuth()

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle()

    } catch (error) {
      console.log(error)
      Alert.alert("Erro durante a autenticação")
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
          <SignInSocialButton onPress={handleSignInWithGoogle} title="Entrar com o Google" svg={Google} />
          <SignInSocialButton title="Entrar com a Apple" svg={Apple} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}