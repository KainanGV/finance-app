import React, { TouchableOpacity } from "react-native"
import { Container, Category, Icon } from "./styles"

interface PropsCategorySelect {
  title: string
  onPress: () => void
}

export function CategorySelectButton({title, onPress}: PropsCategorySelect) {
  return (
    <Container onPress={onPress}>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down" />

    </Container>
  )
}