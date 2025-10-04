
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllMateriales } from '@/utils/db';
import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  // Formulario movido a Explore
  const [materiales, setMateriales] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const cargarMateriales = async () => {
    const data = await getAllMateriales();
    setMateriales(data);
  };

  useEffect(() => {
    cargarMateriales();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await cargarMateriales();
    setRefreshing(false);
  }, []);

  // Funciones de formulario movidas a Explore

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Materiales</ThemedText>
        </ThemedView>
        {/* Solo listado de materiales, formulario movido a Explore */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Listado de materiales</ThemedText>
          {materiales.length === 0 && <ThemedText>No hay materiales registrados.</ThemedText>}
          {materiales.map((mat) => (
            <View key={mat.id} style={{ padding: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
              <ThemedText type="defaultSemiBold">{mat.nombre}</ThemedText>
              {mat.descripcion ? <ThemedText>{mat.descripcion}</ThemedText> : null}
            </View>
          ))}
        </ThemedView>
      </ParallaxScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
