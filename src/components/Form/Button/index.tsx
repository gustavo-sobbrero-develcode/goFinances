import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
    title: string;
    onButtonPress: Function;
}

export function Button({title, onButtonPress, ...rest} : Props){
    return(

        <Container onPress={()=> onButtonPress()}>

            <Title>{title}</Title>


        </Container>

    
    )
}