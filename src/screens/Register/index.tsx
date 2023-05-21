import React, {useState} from "react"
import { Modal } from "react-native"

import { Container, Title, Header, Form, Fields, TransactionType } from "./styles"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton"
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton"
import { CategorySelect } from "../CategorySelect"

export function Register() {
  const [transactionType, setTransactionType] = useState<string>("")
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({key: "category", name: "Categoria"})

  function handleTransactionTypeSelect(value: "down" | "up") {
    setTransactionType(value)
  }

  function handleCloseModalSelectCategory() {
    setCategoryModalOpen(false)
  }

  function handleOpenModalSelectCategory() {
    setCategoryModalOpen(true)
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

          <CategorySelectButton title={category.name} onPress={handleOpenModalSelectCategory} />

        </Fields>

        <Button title='Send'  />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseModalSelectCategory} />
      </Modal>

    </Container>
  )
}