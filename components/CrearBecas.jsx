import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { db } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";

function CrearBecas(props) {
  const INITIAL_STATE = {
    nombre: "",
    categoria: "",
    porcentaje_financia: "",
    pais: "",
    universidad: "",
    requerimientos: "",
    popularidad: "",
  };

  const [beca, setBeca] = useState(INITIAL_STATE);

  const handleInputChange = (name, value) => {
    setBeca({ ...beca, [name]: value });
  };

  const guardarBeca = async () => {
    if (beca.nombre === "") {
      alert("Por favor rellen todos los campos.");
    } else {
      console.log(beca);
      try {
        await addDoc(collection(db, "becas"), {
          nombre: beca.nombre,
          categoria: beca.categoria,
          porcentaje_financia: beca.porcentaje_financia,
          pais: beca.pais,
          universidad: beca.universidad,
          requerimientos: beca.requerimientos,
          popularidad: beca.popularidad,
        });
        props.navigation.navigate("BecasList");
      } catch (error) {
        console.log("Error al agregar una beca " + error);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>CrearBecas</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Nombre"
          onChangeText={(value) => handleInputChange("nombre", value)}
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          placeholder="Categoria"
          onChangeText={(value) => handleInputChange("categoria", value)}
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          placeholder="Porcentaje de Financiación"
          onChangeText={(value) =>
            handleInputChange("porcentaje_financia", value)
          }
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          placeholder="Pais"
          onChangeText={(value) => handleInputChange("pais", value)}
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          placeholder="Universidad"
          onChangeText={(value) => handleInputChange("universidad", value)}
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          placeholder="Requerimientos"
          onChangeText={(value) => handleInputChange("requerimientos", value)}
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          placeholder="Popularidad"
          onChangeText={(value) => handleInputChange("popularidad", value)}
        ></TextInput>
        <Button
          title="Guardar Beca"
          onPress={() => {
            guardarBeca();
          }}
        ></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  textStyle: {
    fontSize: 50,
  },
  inputStyle: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default CrearBecas;
