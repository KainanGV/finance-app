import React, {useState} from "react"
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"

import { Container, Title, Header, Form, Fields, TransactionType } from "./styles"
import { Button } from "../../components/Forms/Button"
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton"
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton"
import { CategorySelect } from "../CategorySelect"
import { InputForm } from "../../components/Forms/InputForm"
import {useForm, Control} from "react-hook-form"
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

interface FormData {
  name: string;
  price: string;
}

type TransactionType = "down" | "up"

interface FormInput extends FormData {
  transactionType: TransactionType;
  category: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number().typeError("Price field is numeric").positive("Value should be positive").required("Field price is required"),
})

export function Register() {
  const [transactionType, setTransactionType] = useState<string>("")
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({key: "category", name: "Category"})
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>({defaultValues: {price: "", name: ""}, resolver: yupResolver(schema)})

  function handleTransactionTypeSelect(value: TransactionType) {
    setTransactionType(value)
  }

  function handleCloseModalSelectCategory() {
    setCategoryModalOpen(false)
  }

  function handleOpenModalSelectCategory() {
    setCategoryModalOpen(true)
  }

  function handleRegister(data: FormData) {
    const formData: FormInput = {...data, transactionType: transactionType as TransactionType, category: category.name}
    
    // if(!transactionType) return Alert.alert("Field select is required")

    // if(formData.category.toLowerCase() === "category") return Alert.alert("Field category is required")
    console.log(formData)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
          <Header>
            <Title>Register</Title>
          </Header>

          <Form>
            <Fields>
              <InputForm control={control as unknown as Control} name="name" placeholder="Name" autoCapitalize="sentences" autoCorrect={false} error={errors.name && errors.name.message} />
              <InputForm control={control as unknown as Control} name="price" placeholder="Price" keyboardType="numeric" error={errors.price && errors.price.message} />

              <TransactionType>
                <TransactionTypeButton type="up" title="incoming" onPress={() => handleTransactionTypeSelect("up")} isActive={transactionType === "up"} />
                <TransactionTypeButton type="down" title="Outcoming" onPress={() => handleTransactionTypeSelect("down")} isActive={transactionType === "down"} />  
              </TransactionType>

              <CategorySelectButton title={category.name} onPress={handleOpenModalSelectCategory} />

            </Fields>

            <Button title='Send' onPress={handleSubmit(handleRegister)}  />
          </Form>

          <Modal visible={categoryModalOpen}>
            <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseModalSelectCategory} />
          </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
}