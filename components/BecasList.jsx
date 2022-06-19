import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

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
    <ScrollView>
      <Text>BecasList</Text>
      <Button
        title="Crear Beca"
        onPress={() => props.navigation.navigate("CrearBecas")}
      />
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
  );
}

export default BecasList;
