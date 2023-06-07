import React from "react"
import {Container, Title,Amount, Footer, Category, Icon, CategoryName, Date } from "./styles"
import { categories } from "../../utils/categories";

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: "positive" | "negative"
}

interface PropsTransactionCard {
  data: TransactionCardProps
}

export function TransactionCard({data: {amount, category,date,name, type}}: PropsTransactionCard) {
  const categoryResult = categories.filter(item => item.key === category)[0]

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>{type === "negative" ? `- ${amount}` :  amount}</Amount>

      <Footer>
        <Category>
          <Icon name={categoryResult?.icon} />
          <CategoryName> {categoryResult?.name} </CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  )
}