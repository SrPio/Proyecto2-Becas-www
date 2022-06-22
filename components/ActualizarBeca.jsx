import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import NumericInput from "react-native-numeric-input";
import { RadioButton, FAB } from "react-native-paper";

function ActualizarBeca(props) {
  console.log(props.route.params.becaId);

  const INITIAL_STATE = {
    nombre: "",
    categoria: "",
    porcentaje_financia: "",
    pais: "",
    universidad: "",
    requerimientos: "",
    popularidad: "",
  };

  const [beca, setBeca] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = React.useState("Nacional");

  const handleInputChange = (name, value) => {
    setBeca({ ...beca, [name]: value });
  };

  const obtenerBeca = async (id) => {
    const docRef = doc(db, "becas", id);
    const docSnap = await getDoc(docRef);
    const becaData = docSnap.data();
    setBeca(becaData);
    setChecked(becaData.categoria);
    console.log(becaData);
    setLoading(false);
  };

  const actualizarBeca = async (id) => {
    try {
      await updateDoc(doc(db, "becas", id), {
        nombre: beca.nombre,
        categoria: checked,
        porcentaje_financia: beca.porcentaje_financia,
        pais: beca.pais,
        universidad: beca.universidad,
        requerimientos: beca.requerimientos,
        popularidad: beca.popularidad,
      });
      setBeca(INITIAL_STATE);
      props.navigation.navigate("BecasList");
    } catch (e) {
      console.log("Error al actualizar el post", e);
    }
  };

  useEffect(() => {
    obtenerBeca(props.route.params.becaId);
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator
          style={{ marginTop: 50 }}
          size="large"
          color="#9e9e9e"
        />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Nombre"
          value={beca.nombre}
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
          value={beca.pais}
          activeOutlineColor="#38b000"
          onChangeText={(value) => handleInputChange("pais", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Universidad"
          value={beca.universidad}
          activeOutlineColor="#38b000"
          onChangeText={(value) => handleInputChange("universidad", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputAreaStyle}
          placeholder="Requerimientos"
          multiline
          numberOfLines={10}
          value={beca.requerimientos}
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
          <FAB
            style={styles.fab2}
            icon="check"
            small
            label="Actualizar Beca"
            theme={{ colors: { accent: "#005CE6" } }}
            onPress={() => {
              actualizarBeca(props.route.params.becaId, beca);
            }}
          />
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
    padding: 10,
    marginBottom: 20,
  },
  inputAreaStyle: {
    width: "100%",
    height: 140,
    padding: 10,
    marginBottom: 20,
  },
});

export default ActualizarBeca;
