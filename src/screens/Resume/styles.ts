import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"

export const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  flex: 1;
`

export const Header = styled.View`
  background-color: ${props => props.theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {padding: 24, flex: 1}
})``