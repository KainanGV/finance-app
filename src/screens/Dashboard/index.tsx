import React, { useCallback, useState } from "react"
import { Container, Header, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper, HighlightCards, Transactions, Title, TransactionsList, LogoutButton, LoadContainer } from "./styles"
import { HighlightCard } from "../../components/HighlightCard"
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { useFocusEffect } from "@react-navigation/core"
import { formatCurrencyPtBr } from "../../helpers/formatCurrencyPtBr"
import {ActivityIndicator} from "react-native"
import { useTheme } from "styled-components"
import { formatLastTransactionDate } from "../../helpers/formatLastTransactionDate"

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export type Amount = {
  amount: string;
  lastTransaction: string
}

interface HighlightProps {
  entries: Amount
  expensives: Amount
  total: Amount
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])
  const [highlight, setHighlight] = useState<HighlightProps>({} as HighlightProps)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const theme = useTheme()
  
  async function loadData() {
    let entriesTotal: number = 0
    let expensiveTotal: number = 0
    const response = await AsyncStorage.getItem("@gofinances:transactions")
    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: DataListProps[] = transactions.map((item: any) => {
      if(item.type === 'positive') entriesTotal += item.price
      if(item.type === 'negative') expensiveTotal += item.price

      const amount = formatCurrencyPtBr(item.price)

      const date = new Date(item.date)
      const dateFormatted = Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: '2-digit'}).format(date)

      return {...item, date: dateFormatted, amount}
    })

    const lastTransactionPositive = formatLastTransactionDate((data.filter(transaction => transaction.type === 'positive').at(-1)?.date as string) ?? '')
    const lastTransactionNegative = formatLastTransactionDate((data.filter(transaction => transaction.type === 'negative').at(-1)?.date as string) ?? '')

    const totalInterval = `01 a ${lastTransactionNegative.toLocaleString('pt-BR', {month: 'long'})}`
    
    setHighlight({
      entries: {
        amount: formatCurrencyPtBr(entriesTotal as number),
        lastTransaction:`Última entrada dia ${lastTransactionPositive.getDate()} de ${lastTransactionPositive.toLocaleString('pt-BR', {month: 'long'})}`
      }, 
      expensives: {
        amount: formatCurrencyPtBr(expensiveTotal),
        lastTransaction: `Última saída dia ${lastTransactionNegative.getDate()} de ${lastTransactionNegative.toLocaleString('pt-BR', {month: 'long'})}`
      },
      total: {
        amount: formatCurrencyPtBr(entriesTotal - expensiveTotal),
        lastTransaction: totalInterval
      }
    })
    setData(transactionsFormatted)
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  useFocusEffect(useCallback(() => {
    loadData()
  },[]))

  return (
    <Container>
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" /> 
        </LoadContainer>
        :
        <>
          <Header> 
            <UserWrapper>
              <UserInfo>
                <Photo source={{uri: "https://avatars.githubusercontent.com/u/71570785?v=4"}} />
                <User>
                  <UserGreeting>Olá</UserGreeting>  
                  <UserName>Rodrigo</UserName>
                </User>
              </UserInfo>

              <LogoutButton>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>

          </Header>

          <HighlightCards>
            <HighlightCard 
              type="up" 
              title="Entradas" 
              amount={highlight.entries.amount} 
              lastTransaction={highlight.entries.lastTransaction}
            />
            <HighlightCard 
              type="down" 
              title="Saídas" 
              amount={highlight.expensives.amount} 
              lastTransaction={highlight.expensives.lastTransaction}
            />
            <HighlightCard 
              type="total" 
              title="Total" 
              amount={highlight.total.amount} 
              lastTransaction={highlight.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList 
              data={data} 
              keyExtractor={item => item.id}
              renderItem={({item}) => <TransactionCard data={item}  />}
            >
              
            </TransactionsList>
          </Transactions>
        </>
      }
      
    </Container>
  )
}
