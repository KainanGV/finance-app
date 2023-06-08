import React, { useCallback, useState } from "react"
import { Container, Header, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper, HighlightCards, Transactions, Title, TransactionsList, LogoutButton } from "./styles"
import { HighlightCard } from "../../components/HighlightCard"
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { useFocusEffect } from "@react-navigation/core"

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function loadData() {
    const response = await AsyncStorage.getItem("@gofinances:transactions")
    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: DataListProps[] = transactions.map((item: any) => {
      const amount = Number(item.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

      const date = new Date(item.date)
      const dateFormatted = Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: '2-digit'}).format(date)

      return {...item, date: dateFormatted, amount}
    })

    setData(transactionsFormatted)
  }

  useEffect(() => {
    loadData()
  }, [])

  useFocusEffect(useCallback(() => {
    loadData()
  },[]))

  return (
      <Container>
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
          <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Útima entrada dia 13 de abril" />
          <HighlightCard type="down" title="Saídas" amount="R$ 17.400,00" lastTransaction="Útima entrada dia 13 de abril" />
          <HighlightCard type="total" title="Total" amount="R$ 17.400,00" lastTransaction="Útima entrada dia 13 de abril" />
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
      </Container>
  )
}
