import React from "react"
import {Container, Title,Amount, Footer, Category, Icon, CategoryName, Date } from "./styles"

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
  type: "positive" | "negative"
}

interface PropsTransactionCard {
  data: TransactionCardProps
}

export function TransactionCard({data: {amount, category,date,title, type}}: PropsTransactionCard) {
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>${type === "negative" ? `- ${amount}` :  amount}</Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName> {category.name} </CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  )
}