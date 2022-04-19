import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { useTheme } from "styled-components";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar com a conta Google");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas finanças{"\n"}com simplicidade,{"\n"}
            {"\n"}Sempre buscando o green!
          </Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {
            Platform.OS === 'ios' && <SignInSocialButton 
          title="Entrar com Apple" 
          svg={AppleSvg} 
          />
}
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
