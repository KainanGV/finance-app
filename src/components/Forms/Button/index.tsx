import React from "react"
import { Container, Title } from "./styles"
import { TouchableOpacityProps } from "react-native"

interface PropsButton extends TouchableOpacityProps {
  title: string
}

export function Button({title, ...rest}: PropsButton) {
  return (
    <Container {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}