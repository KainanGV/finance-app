import React from "react"

import { Container, Title, Header, Form, Fields } from "./styles"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton"

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

          <TransactionTypeButton type="up" title="incoming" />
        </Fields>

        <Button title='Send'  />
      </Form>

    </Container>
  )
}