import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionTypeProps {
  type: "positive" | "negative"
}

export const Container = styled.View`
  background-color: ${props => props.theme.colors.shape};
  border-radius: 5px;

  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)};
  font-family: ${props => props.theme.fonts.regular};
`;

export const Amount = styled.Text<TransactionTypeProps>`
  font-size: ${RFValue(20)};
  font-family: ${props => props.theme.fonts.regular};
  margin-top: 2px;
  color: ${({ theme, type }) => type === "positive" ? theme.colors.success : theme.colors.attention};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.Text`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)};
  color: ${props => props.theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)};
  color: ${props => props.theme.colors.text};

  margin-left: 17px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)};
  color: ${props => props.theme.colors.text};
`;
