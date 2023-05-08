import React from "react"
import { Container, Title, Icon } from "./styles"
import { TouchableOpacityProps } from "react-native";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle"
}

interface PropsTransactionTypeButton extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean
}

export function TransactionTypeButton({title, type ,isActive,...rest}: PropsTransactionTypeButton) {
  return (
    <Container {...rest} isActive={isActive} type={type}> 
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  )
}