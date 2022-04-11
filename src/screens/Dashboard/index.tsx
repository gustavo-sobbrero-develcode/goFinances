import React from "react";
import { HighligthCard } from "../../components/HighligthCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighligthCards,
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
  {    
  id: '1' , 
  type: 'positive',       
  title: "Emprego na Develcode",
  amount: "R$ 1.700,00",
  category: {
    name: "Salário mensal",
    icon: "dollar-sign",
  },
  date: "06/04/2022"
  },
  {       
    id: '2' ,    
    type: 'negative',
    title: "Hamburgueria Juventus",
    amount: "R$ 36,00",
    category: {
      name: "Alimentação",
      icon: "coffee",
    },
    date: "27/03/2022"
    },
    {
      id: '3' ,           
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "01/04/2022"
      },
  ];

  
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/100696299?s=400&u=3759e5f8de1ed8a6e08c417e92c6f4de1696b93b&v=4",
              }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Gustavo</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighligthCards>
        <HighligthCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighligthCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighligthCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighligthCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionCard data={item} />}
        
        />
          

      </Transactions>
    </Container>
  )
}
