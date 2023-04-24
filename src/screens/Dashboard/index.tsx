import React from "react"
import { Container, Header, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper } from "./styles"
import { HighlightCard } from "../../components/HighlightCard"

export function Dashboard() {
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

            <Icon name="power" />
          </UserWrapper>

        </Header>

        <HighlightCard />
      </Container>
  )
}
