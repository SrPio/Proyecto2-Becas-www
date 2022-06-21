import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";
import { FAB } from "react-native-paper";
import CarouselNYT from "./CarouselComponent/CarouselNYT";

function BecasList(props) {
  const [becas, setBecas] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "becas"), (snapshot) => {
      const becasData = snapshot.docs.map(
        (doc) => {
          return {
            id: doc.id,
            nombre: doc.data().nombre,
            categoria: doc.data().categoria,
            porcentaje_financia: doc.data().porcentaje_financia,
            pais: doc.data().pais,
            universidad: doc.data().universidad,
            requerimientos: doc.data().requerimientos,
            popularidad: doc.data().popularidad,
          };
        },
        (error) => {
          console.log(error, "Error en snapshot");
        }
      );
      setBecas(becasData);
      console.log(becasData);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        <CarouselNYT />
        {becas?.map((beca) => {
          return (
            <ListItem
              key={beca.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("BecasInfo", {
                  becaId: beca.id,
                });
              }}
            >
              <ListItem.Chevron />
              <Avatar
                source={{
                  uri: "https://www.primeprospects.net/wp-content/uploads/2017/10/education-icon-1.png",
                }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{beca.nombre}</ListItem.Title>
                <ListItem.Subtitle>{beca.categoria}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        small
        label="Crear beca"
        theme={{ colors: { accent: "#38b000" } }}
        onPress={() => props.navigation.navigate("CrearBecas")}
      />
      <FAB
        style={styles.fab2}
        icon="plus"
        small
        label="Becas populares"
        theme={{ colors: { accent: "#38b000" } }}
        onPress={() => props.navigation.navigate("BecasPopulares")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    marginTop: 20,
    right: 0,
    top: "85%",
  },
  fab2: {
    position: "absolute",
    margin: 16,
    marginTop: 20,
    right: 0,
    top: "75%",
  },
});

export default BecasList;
