import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypeButtons,
} from "./styles ";
import { useAuth } from "../../hooks/auth";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não deve ser negativo")
    .required("Valor é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  type NavigationProps = {
    navigate:(screen:string) => void;
  }

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister() {
    if (!transactionType) return Alert.alert("Selecione o tipo de transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const form = getValues();

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user${user.id}`;

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormated = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));
      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }

  }

  // async function removeAll(){
  //     const dataKey = "@gofinances:transactions";
  
  //     await AsyncStorage.removeItem(dataKey);
  //   }
  //   removeAll();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              error={errors.name && errors.name.message}
            />

            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypeButtons>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypeSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionTypeButtons>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onButtonPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
