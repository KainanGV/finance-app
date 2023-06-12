import React, {useEffect, useState} from 'react'
import {Container, Header, Title, Content} from "./styles"
import { HistoryCard } from '../../components/HistoryCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { categories } from '../../utils/categories'
import { formatCurrencyPtBr } from '../../helpers/formatCurrencyPtBr'
import uuid from "react-native-uuid"

type CategoryGroup = 
  'purchases' |
  'food' |
  'salary' |
  'car' |
  'leisure' |
  'studies' 

interface TransactionGroup {
  categoryGroup: CategoryGroup
  total: number
  color: string
  title: string
  id: string
}


export const Resume = () => {
  const [data, setData] = useState<TransactionGroup[]>([])

  async function transactions() {
    const resultFinal: TransactionGroup[] = []
    const response = await AsyncStorage.getItem("@gofinances:transactions")
    const currentData = (!!response ? JSON.parse(response) : []) as any[]

    const expensives = currentData.filter(transaction => transaction.transactionType === "negative")

    expensives.forEach(transaction => {
      const transactionAlreadyExist = resultFinal
        .find(element => element.categoryGroup === transaction.category)

      if(!!transactionAlreadyExist) transactionAlreadyExist.total += transaction.price
      else {
        const dataCategory = categories.find(value => value.key === transaction.category)
        resultFinal.push({
          categoryGroup: transaction.category, 
          total: transaction.price, 
          color: dataCategory?.color ?? 'red',
          title: transaction.name,
          id: uuid.v4().toString()
        })
      }
    })

    setData(resultFinal)
  }

  useEffect(() => {
    transactions()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          data.map(value => ( 
            <HistoryCard key={value.id} title={value.categoryGroup} amount={formatCurrencyPtBr(value.total)} color={value.color} />
          ))
        }
      </Content>

    </Container>
  )
}