import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import { Card } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons/faBuildingColumns";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons/faSackDollar";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FAB } from "react-native-paper";

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
    <ScrollView>
      <Card>
        <Card.Title>{beca.nombre}</Card.Title>
        <Card.Divider />
        <View>
          <Image
            style={{ width: "100%", height: 200, marginBottom: 20 }}
            resizeMode="cover"
            source={{
              uri: "https://img.freepik.com/vector-gratis/cartel-prestamos-estudiantiles-o-becas_603843-1091.jpg?t=st=1652638503~exp=1652639103~hmac=b4369561279465254bff66e851f64a607447abc227ca811563c2f34019fef67e&w=740",
            }}
          />
          <View style={styles.viewStyle}>
            <Text style={styles.header}>{beca.categoria}</Text>
          </View>
          <View style={styles.viewStyle}>
            <FontAwesomeIcon icon={faLocationDot} />
            <Text style={styles.body}>{beca.pais}</Text>
          </View>
          <View style={styles.viewStyle}>
            <FontAwesomeIcon icon={faBuildingColumns} />
            <Text style={styles.body}>{beca.universidad}</Text>
          </View>
          <View style={styles.viewStyle}>
            <FontAwesomeIcon icon={faSackDollar} />
            <Text style={styles.body}>
              Porcentaje de financiacion: {beca.porcentaje_financia}%
            </Text>
          </View>
          <View style={styles.viewStyle2}>
            <Text style={{ fontWeight: "bold" }}>Requerimientos: </Text>
          </View>
          <ScrollView style={{ height: 70, marginBottom: 20, paddingLeft: 10 }}>
            <Text style={{ height: 80 }}>{beca.requerimientos}</Text>
          </ScrollView>
          <View style={styles.viewStyle3}>
            {Array.from({ length: beca.popularidad }).map((item, index) => {
              return (
                <FontAwesomeIcon
                  key={index}
                  style={styles.star}
                  icon={faStar}
                  size={28}
                />
              );
            })}
            {Array.from({ length: 5 - beca.popularidad }).map((item, index) => {
              return (
                <FontAwesomeIcon
                  key={index}
                  style={styles.starOpaca}
                  icon={faStar}
                  size={28}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.buttonStyle}>
          <FAB
            style={styles.fab2}
            icon="pencil"
            small
            label="Editar Beca"
            theme={{ colors: { accent: "#005CE6" } }}
            onPress={() =>
              props.navigation.navigate("ActualizarBeca", {
                becaId: props.route.params.becaId,
              })
            }
          />
        </View>
        <View>
          <FAB
            style={styles.fab2}
            icon="delete"
            small
            label="Eliminar Beca"
            theme={{ colors: { accent: "#e63946" } }}
            onPress={() => {
              confirmacionEliminar();
            }}
          />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    paddingLeft: 10,
  },
  viewStyle2: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  viewStyle3: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
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
  header: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    color: "#222",
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 20,
  },
});

export default BecasInfo;
