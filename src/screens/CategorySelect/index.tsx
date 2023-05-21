import react from "react"
import { Container, Header, Title, Category, Icon, Name, Seperator, Footer, ButtonText } from "./styles"
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import { Button } from "../../components/Forms/Button";

interface Category {
  key: string;
  name: string;
}

interface PropsCategorySelect {
  category: Category;
  setCategory: (item: Category) => void
  closeSelectCategory: () => void
}

export function CategorySelect({category,closeSelectCategory, setCategory}: PropsCategorySelect) {
  function handleSetCategorySelected({key, name}: Category) {
    setCategory({key, name})
  }
  return (
    <Container>
      <Header>
        <Title>Categories</Title>
      </Header>

      <FlatList data={categories} style={{flex:1, width: '100%'}} keyExtractor={(item) => item.key} 
      renderItem={({item}) => 
        (<Category onPress={() => handleSetCategorySelected({key: item.key, name: item.name})} isActive={category.key === item.key}>
          <Icon name={item.icon}  />
          <Name>{item.name}</Name>
        </Category>)
      } ItemSeparatorComponent={() => <Seperator />}/>

      <Footer>
        <Button title='Select' onPress={closeSelectCategory} />
      </Footer>
    </Container>
  )
}