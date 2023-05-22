import styled from "styled-components/native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { Feather } from "@expo/vector-icons"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { FlatList, FlatListProps } from "react-native"
import { getBottomSpace } from "react-native-iphone-x-helper"
import { DataListProps } from "."
import {BorderlessButton} from "react-native-gesture-handler"

export const Container = styled.View`
  flex: 1;

  background-color: ${(props) => props.theme.colors.background};
`

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${props => props.theme.colors.primary};

  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const User = styled.View`
  margin-left: 17px;
`

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`
export const UserGreeting = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.regular};
    
`
export const UserName = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.bold};
`

export const Icon = styled(Feather)`
  color: ${props => props.theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`

export const LogoutButton = styled(BorderlessButton)`
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.regular};

  margin-bottom: 16px;
`

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() }
})``

