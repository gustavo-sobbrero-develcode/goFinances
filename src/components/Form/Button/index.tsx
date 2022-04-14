import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
    title: string;
    onButtonPress: Function;
}

export function Button({title, onButtonPress, ...rest} : Props){
    return(

        <Container onPress={() => onButtonPress()}>

            <Title>{title}</Title>


        </Container>

    
    )
}