import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Country = {
  name: { common: string };
  cca3: string;
  flags: { png: string };
  population?: number;
  region?: string;
  subregion?: string;
  capital?: string[];
  currencies?: { [key: string]: { name: string } };
  translations?: { [key: string]: { official: string; common: string } };
  languages?: { [key: string]: string };
};

const CountryDetailScreen = ({ route }: any) => {
  const { country }: { country: Country } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      
      <Text style={styles.title}>{country.name.common}</Text>

      <Text style={styles.detail}>
        <Text style={styles.bold}>Nome Portugues: </Text> 
        {Object.values(country.translations || {})[16]?.common || "N/A"}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Nome Official: </Text> 
        {Object.values(country.translations || {})[16]?.official || "N/A"}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Região: </Text> {country.region || "N/A"}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Sub-Região: </Text> {country.subregion || "N/A"}
      </Text>

      <Text style={styles.detail}>
        <Text style={styles.bold}>População: </Text> {country.population?.toLocaleString() || "N/A"}
      </Text>

      <Text style={styles.detail}>
        <Text style={styles.bold}>Capital: </Text> {country.capital?.join(", ") || "N/A"}
      </Text>

      <Text style={styles.detail}>
        <Text style={styles.bold}>Moeda: </Text> 
        {Object.values(country.currencies || {})[0]?.name || "N/A"}
      </Text>

      <Text style={styles.detail}>
        <Text style={styles.bold}>Idioma: </Text> 
        {Object.values(country.languages || [])[0] || "N/A"}
      </Text>
    </View>
  );
};

// **Estilos**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flag: {
    width: 200,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default CountryDetailScreen;
