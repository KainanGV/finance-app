import React from "react"
import { Container, Header, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper, HighlightCards, Transactions, Title, TransactionsList, LogoutButton } from "./styles"
import { HighlightCard } from "../../components/HighlightCard"
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard"

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      title: "Desenvolvimento site web", amount:"R$ 12.000,00", category: {name: "Vendas", icon: "dollar-sign"}, date: "12/12/1222",
      type: "positive"
    },
    {
      id: "2",
      title: "Desenvolvimento site web", amount:"R$ 12.000,00", category: {name: "Vendas", icon: "dollar-sign"}, date: "12/12/1222",
      type: "negative"
    },
    {
      id: "3",
      title: "Desenvolvimento site web", amount:"R$ 12.000,00", category: {name: "Vendas", icon: "dollar-sign"}, date: "12/12/1222",
      type: "negative"
    }
  ]

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
