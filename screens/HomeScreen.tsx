import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

type Country = {
  name: { common: string };
  cca3: string;
  currencies?: { [key: string]: { name: string } };
  languages?: { [key: string]: string };
  flags: { png: string };
  translations?: { [key: string]: { official: string; common: string } };
};

const Home = ({ navigation }: any) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: Country[]) => setCountries(data))
      .catch((error) => console.error("Erro ao buscar países:", error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.translations?.por?.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 GeoData</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Buscar país..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.countryItem}
            onPress={() => navigation.navigate("CountryDetails", { country: item })}
          >
            <Image source={{ uri: item.flags.png }} style={styles.flag} />
            <Text style={styles.countryName}>{Object.values(item.translations || {})[16]?.common || "N/A"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// **Estilos**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  countryName: {
    fontSize: 18,
  },
});

export default Home;
