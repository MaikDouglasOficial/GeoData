import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

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
    <ScrollView style={styles.container}>
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      <Text style={styles.title}>{country.name.common}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Nome Português: </Text>
          {Object.values(country.translations || {})[16]?.common || "N/A"}
        </Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>Nome Oficial: </Text>
          {Object.values(country.translations || {})[16]?.official || "N/A"}
        </Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>Região: </Text> {country.region || "N/A"}
        </Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>Sub-Região: </Text> {country.subregion || "N/A"}
        </Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>População: </Text>
          {country.population?.toLocaleString() || "N/A"}
        </Text>

        <Text style={styles.detail}>
          <Text style={styles.bold}>Capital: </Text>
          {country.capital?.join(", ") || "N/A"}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    padding: 16,
  },
  flag: {
    width: 200,
    height: 120,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
  },
  detailContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  bold: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default CountryDetailScreen;
