import React, {useState, useEffect} from "react"
import { Modal, Keyboard, Alert } from "react-native"

import { Container, Title, Header, Form, Fields, TransactionType } from "./styles"
import { Button } from "../../components/Forms/Button"
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton"
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton"
import { CategorySelect } from "../CategorySelect"
import { InputForm } from "../../components/Forms/InputForm"
import {useForm, Control} from "react-hook-form"
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import UUID from "react-native-uuid"
import {useNavigation} from "@react-navigation/native"

interface FormData {
  name: string;
  price: string;
}

type TransactionType = "down" | "up"
type NavigationProps = {
  navigate: (router: string) => void
}

interface FormInput extends FormData {
  id: string;
  transactionType: TransactionType;
  category: string;
  date: Date;
  type: string
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number().typeError("Price field is numeric").positive("Value should be positive").required("Field price is required"),
})

export function Register() {
  const [transactionType, setTransactionType] = useState<string>("")
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({key: "category", name: "Category"})
  const {control, handleSubmit, formState: {errors}, reset} = useForm<FormData>({defaultValues: {price: "", name: ""}, resolver: yupResolver(schema)})
  const navigation = useNavigation<NavigationProps>();

  function handleTransactionTypeSelect(value: 'positive' | 'negative') {
    setTransactionType(value)
  }

  function handleCloseModalSelectCategory() {
    setCategoryModalOpen(false)
  }

  function handleOpenModalSelectCategory() {
    setCategoryModalOpen(true)
  }

  async function handleRegister(data: FormData) {
    const formData: FormInput = {
      id: UUID.v4().toString(),
      ...data, 
      transactionType: transactionType as TransactionType, 
      category: category.key,
      date: new Date(),
      type: transactionType
    }
    
    // if(!transactionType) return Alert.alert("Field select is required")

    // if(formData.category.toLowerCase() === "category") return Alert.alert("Field category is required")

    try {
      const collectionKey = "@gofinances:transactions"
      const data = await AsyncStorage.getItem(collectionKey)
      const currentData = (!!data ? JSON.parse(data) : []) as any[]
      currentData.push(formData)

      await AsyncStorage.setItem(collectionKey, JSON.stringify(currentData))

    } catch(e) {
      Alert.alert("Não foi possível cadastrar")
    } finally {
      setTransactionType('')
      setCategory({key: "category", name: "Category"})
      reset()
      navigation.navigate("List")
    }
  }

  // useEffect(() => {
  //   async function removeAll() {
  //     console.log(await AsyncStorage.getItem("@gofinances:transactions"))
  //     // await AsyncStorage.removeItem("@gofinances:transactions")
  //   }

  //   removeAll()
  // })

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
          <Header>
            <Title>Register</Title>
          </Header>

          <Form>
            <Fields>
              <InputForm control={control as unknown as Control}  name="name" placeholder="Name" autoCapitalize="sentences" autoCorrect={false} error={errors.name && errors.name.message} />
              <InputForm control={control as unknown as Control} name="price" placeholder="Price" keyboardType="numeric" error={errors.price && errors.price.message} />

              <TransactionType>
                <TransactionTypeButton type="up" title="incoming" onPress={() => handleTransactionTypeSelect("positive")} isActive={transactionType === "up"} />
                <TransactionTypeButton type="down" title="Outcoming" onPress={() => handleTransactionTypeSelect("negative")} isActive={transactionType === "down"} />  
              </TransactionType>

              <CategorySelectButton title={category.name} onPress={handleOpenModalSelectCategory} />

            </Fields>

            <Button title='Send' onPress={handleSubmit(handleRegister)}  />
          </Form>

          <Modal visible={categoryModalOpen}>
            <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseModalSelectCategory} />
          </Modal>

      </Container>
    // </TouchableWithoutFeedback>
  )
}