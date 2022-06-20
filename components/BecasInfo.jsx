import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import { Card } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function BecasInfo(props) {
  console.log(props.route.params.becaId);

  const [beca, setBeca] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerBeca = async (id) => {
    const docRef = doc(db, "becas", id);
    const docSnap = await getDoc(docRef);
    const becaData = docSnap.data();
    setBeca(becaData);
    console.log(becaData);
    setLoading(false);
  };

  const eliminarBeca = async (id) => {
    try {
      await deleteDoc(doc(db, "becas", id));
      props.navigation.navigate("BecasList");
    } catch (e) {
      console.log("Error al borrar el post", e);
    }
  };

  const confirmacionEliminar = () => {
    Alert.alert("Eliminar beca", "¿Desea eliminar la beca?", [
      {
        text: "Eliminar",
        onPress: () => eliminarBeca(props.route.params.becaId),
      },
      {
        text: "Cancelar",
        onPress: () => null,
      },
    ]);
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
    <View>
      <Card>
        <Card.Title>{beca.nombre}</Card.Title>
        <Card.Divider />
        <View>
          <Image
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
            source={{
              uri: "https://img.freepik.com/vector-gratis/cartel-prestamos-estudiantiles-o-becas_603843-1091.jpg?t=st=1652638503~exp=1652639103~hmac=b4369561279465254bff66e851f64a607447abc227ca811563c2f34019fef67e&w=740",
            }}
          />
          <Text>{beca.categoria}</Text>
          <View style={styles.viewStyle}>
            <FontAwesomeIcon icon={faLocationDot} />
            <Text>{beca.pais}</Text>
          </View>
          <Text>{beca.porcentaje_financia}</Text>
          <Text>{beca.universidad}</Text>
          <Text>{beca.requerimientos}</Text>
          <View style={styles.viewStyle}>
            {Array.from({ length: beca.popularidad }).map((item, index) => {
              return (
                <FontAwesomeIcon
                  key={index}
                  style={styles.star}
                  icon={faStar}
                />
              );
            })}
            {Array.from({ length: 5 - beca.popularidad }).map((item, index) => {
              return (
                <FontAwesomeIcon
                  key={index}
                  style={styles.starOpaca}
                  icon={faStar}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Editar Beca"
            onPress={() =>
              props.navigation.navigate("ActualizarBeca", {
                becaId: props.route.params.becaId,
              })
            }
          ></Button>
        </View>
        <View>
          <Button
            style={styles.buttonStyle}
            title="Eliminar Beca"
            color="#e63946"
            onPress={() => {
              confirmacionEliminar();
            }}
          ></Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  starOpaca: {
    color: "#bdbdbd",
  },
  star: {
    color: "#ffc300",
  },
  buttonStyle: {
    marginBottom: 20,
  },
});

export default BecasInfo;
