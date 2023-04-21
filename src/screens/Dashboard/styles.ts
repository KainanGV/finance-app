import styled from "styled-components/native"

export const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.background};
`

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.title};
`