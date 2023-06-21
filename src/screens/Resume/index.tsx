import React, {useCallback, useEffect, useState} from 'react'
import {Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadContainer } from "./styles"
import { HistoryCard } from '../../components/HistoryCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { categories } from '../../utils/categories'
import { formatCurrencyPtBr } from '../../helpers/formatCurrencyPtBr'
import uuid from "react-native-uuid"
import {VictoryPie} from "victory-native"
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs"
import {addMonths, subMonths, format} from "date-fns"
import {ptBR} from "date-fns/locale"
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'

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
  percent: string
}


export const Resume = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState<TransactionGroup[]>([])
  const theme = useTheme()
  const {user} = useAuth()

  function handleDateChange(action: 'next' | 'prev') {
    if(action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  async function transactions() {
    setIsLoading(true)

    const resultFinal: TransactionGroup[] = []
    const response = await AsyncStorage.getItem(`@gofinances:transactions_user:${user.id}`)
    const currentData = (!!response ? JSON.parse(response) : []) as any[]

    const expensives = currentData
      .filter(transaction => 
        transaction.transactionType === "negative" && 
        new Date(transaction.date).getMonth() === selectedDate.getMonth() && 
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear())

    const expensiveTotal = expensives.reduce((acc, value) => acc + value.price , 0)

    expensives.forEach(transaction => {
      const transactionAlreadyExist = resultFinal
        .find(element => element.categoryGroup === transaction.category)


      if(!!transactionAlreadyExist) {
        const percent = `${(transactionAlreadyExist.total / expensiveTotal * 100).toFixed(0)}%`
        transactionAlreadyExist.total += transaction.price
        transactionAlreadyExist.percent = percent
      }
      else {
        const dataCategory = categories.find(value => value.key === transaction.category)
        const percent = `${(transaction.price / expensiveTotal * 100).toFixed(0)}%`
        resultFinal.push({
          categoryGroup: transaction.category, 
          total: transaction.price, 
          color: dataCategory?.color ?? 'red',
          title: transaction.name,
          id: uuid.v4().toString(),
          percent
        })
      }
    })

    setData(resultFinal)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    transactions()
  },[selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" /> 
        </LoadContainer>
        :
          <Content showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 24,paddingBottom: useBottomTabBarHeight()}} >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left"/>
              </MonthSelectButton>

              <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right"/>
              </MonthSelectButton>
            </MonthSelect>
            
            <ChartContainer>
              <VictoryPie 
                data={data} 
                x="percent" 
                y="total" 
                colorScale={data.map(register => register.color)} 
                style={{labels: {fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape}}}
                labelRadius={50}
              />
            </ChartContainer>
            {
              data.map(value => ( 
                <HistoryCard key={value.id} title={value.categoryGroup} amount={formatCurrencyPtBr(value.total)} color={value.color} />
              ))
            }
        </Content>
      }
    </Container>
  )
}