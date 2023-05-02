import React, {useState} from "react"

import { Container, Title, Header, Form, Fields, TransactionType } from "./styles"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton"
import { GestureResponderEvent } from "react-native"
import { CategorySelect } from "../../components/Forms/CategorySelect"

export function Register() {
  const [transactionType, setTransactionType] = useState<string>("")

  function handleTransactionTypeSelect(value: "down" | "up") {
    setTransactionType(value)
  }

  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Name" />
          <Input placeholder="Price" />

          <TransactionType>
            <TransactionTypeButton type="up" title="incoming" onPress={() => handleTransactionTypeSelect("up")} isActive={transactionType === "up"} />
            <TransactionTypeButton type="down" title="Outcoming" onPress={() => handleTransactionTypeSelect("down")} isActive={transactionType === "down"} />  
          </TransactionType>

          <CategorySelect title="Category" />

        </Fields>

        <Button title='Send'  />
      </Form>

    </Container>
  )
}