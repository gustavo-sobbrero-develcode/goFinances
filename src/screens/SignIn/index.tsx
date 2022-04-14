import React, {useContext} from "react";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';    


import { 
    Container, 
    Header, 
    TitleWrapper, 
    Title, 
    SignInTitle, 
    Footer,
    FooterWrapper
} from './styles'

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { AuthContext } from "../../AuthContext";

export function SignIn() {
    const data = useContext(AuthContext);

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                    width={RFValue(120)}
                    height={RFValue(68)} 
                    
                    />
                    <Title>
                        Controle suas finanças{'\n'}com simplicidade,{'\n'}{'\n'}Sempre buscando o green!
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                    title="Entrar com Google"
                    svg={GoogleSvg}
                    />
                    
                    <SignInSocialButton
                    title="Entrar com Apple" 
                    svg={AppleSvg}
                    />
                </FooterWrapper>

            </Footer>

        </Container>
    );

}