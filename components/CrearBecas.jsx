import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { db } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";
import NumericInput from "react-native-numeric-input";
import { RadioButton } from "react-native-paper";

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
  const [checked, setChecked] = React.useState("Nacional");

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
          categoria: checked,
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
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Nombre"
          activeOutlineColor="#38b000"
          onChangeText={(value) => handleInputChange("nombre", value)}
        ></TextInput>
        <View style={{ marginBottom: 30, alignItems: "center" }}>
          <Text style={{ marginBottom: 10, fontSize: 16 }}>Categoría</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Nacional</Text>
            <RadioButton
              color="#38b000"
              value="Nacional"
              status={checked === "Nacional" ? "checked" : "unchecked"}
              onPress={() => setChecked("Nacional")}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Internacional</Text>
            <RadioButton
              color="#38b000"
              value="Internacional"
              status={checked === "Internacional" ? "checked" : "unchecked"}
              onPress={() => setChecked("Internacional")}
            />
          </View>
        </View>
        <Text style={{ marginBottom: 10, fontSize: 16 }}>
          Porcentaje de Financiación
        </Text>
        <NumericInput
          containerStyle={{ marginBottom: 20 }}
          rounded
          minValue={0}
          maxValue={100}
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor="#38b000"
          leftButtonBackgroundColor="#38b000"
          onChange={(value) => handleInputChange("porcentaje_financia", value)}
        />
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Pais"
          activeOutlineColor="#38b000"
          onChangeText={(value) => handleInputChange("pais", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Universidad"
          activeOutlineColor="#38b000"
          onChangeText={(value) => handleInputChange("universidad", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputAreaStyle}
          placeholder="Requerimientos"
          multiline
          numberOfLines={10}
          maxLength={250}
          activeOutlineColor="#38b000"
          onChangeText={(value) => handleInputChange("requerimientos", value)}
        ></TextInput>
        <Text style={{ marginBottom: 10, fontSize: 16 }}>Popularidad</Text>
        <NumericInput
          containerStyle={{ marginBottom: 20 }}
          rounded
          minValue={0}
          maxValue={5}
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor="#38b000"
          leftButtonBackgroundColor="#38b000"
          onChange={(value) => handleInputChange("popularidad", value)}
        />
        <View style={{ width: "100%" }}>
          <Button
            title="Guardar Beca"
            color="#38b000"
            onPress={() => {
              guardarBeca();
            }}
          ></Button>
        </View>
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
    width: "100%",
    height: 40,
    padding: 5,
    marginBottom: 20,
  },
  inputAreaStyle: {
    width: "100%",
    height: 140,
    padding: 10,
    marginBottom: 20,
  },
});

export default CrearBecas;
