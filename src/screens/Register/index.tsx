import React from "react"

import { Container, Title, Header, Form, Fields } from "./styles"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Name" />
          <Input placeholder="Price" />
        </Fields>

        <Button title='Send'  />
      </Form>

    </Container>
  )
}