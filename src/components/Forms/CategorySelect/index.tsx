import React from "react-native"
import { Container, Category, Icon } from "./styles"

interface PropsCategorySelect {
  title: string
}

export function CategorySelect({title}: PropsCategorySelect) {
  return (
    <Container>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down" />

    </Container>
  )
}