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

  const handleInputChange = (name, value) => {
    setBeca({ ...beca, [name]: value });
  };

  const obtenerBeca = async (id) => {
    const docRef = doc(db, "becas", id);
    const docSnap = await getDoc(docRef);
    const becaData = docSnap.data();
    setBeca(becaData);
    console.log(becaData);
    setLoading(false);
  };

  const actualizarBeca = async (id) => {
    try {
      await updateDoc(doc(db, "becas", id), {
        nombre: beca.nombre,
        categoria: beca.categoria,
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
          onChangeText={(value) => handleInputChange("nombre", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Categoria"
          value={beca.categoria}
          onChangeText={(value) => handleInputChange("categoria", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Porcentaje de Financiación"
          value={beca.porcentaje_financia}
          onChangeText={(value) =>
            handleInputChange("porcentaje_financia", value)
          }
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Pais"
          value={beca.pais}
          onChangeText={(value) => handleInputChange("pais", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Universidad"
          value={beca.universidad}
          onChangeText={(value) => handleInputChange("universidad", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputAreaStyle}
          placeholder="Requerimientos"
          multiline
          numberOfLines={10}
          value={beca.requerimientos}
          onChangeText={(value) => handleInputChange("requerimientos", value)}
        ></TextInput>
        <TextInput
          mode="outlined"
          style={styles.inputStyle}
          placeholder="Popularidad"
          value={beca.popularidad}
          onChangeText={(value) => handleInputChange("popularidad", value)}
        ></TextInput>
        <View style={{ width: "100%" }}>
          <Button
            title="Actualizar Beca"
            onPress={() => {
              actualizarBeca(props.route.params.becaId, beca);
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
