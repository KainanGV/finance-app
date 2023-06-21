import { TouchableOpacityProps } from "react-native"
import {Button, ImageContainer, Text} from "./styles"
import { SvgProps } from "react-native-svg";

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>
}

export const SignInSocialButton = ({title, svg: Svg, ...rest}: Props) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>{title}</Text>
    </Button>
  )
}