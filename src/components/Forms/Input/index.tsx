import React from "react"
import { Container } from "./styles"
import { TextInputProps } from "react-native"

type PropsInput = TextInputProps

export function Input({...rest}: PropsInput) {
  return (
    <Container {...rest} />
  )
}