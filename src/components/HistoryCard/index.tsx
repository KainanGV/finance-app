import React from 'react'
import { Container, Title, Amount } from './styles'

interface IHistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

export const HistoryCard = ({amount,color,title}: IHistoryCardProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}