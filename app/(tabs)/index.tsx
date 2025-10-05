import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllMateriales } from '@/utils/db';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Button, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
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

  const simularCrearMaterial = async () => {
    router.push('/(tabs)/simulacion');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              source={require('@/assets/images/caturn.jpeg')}
              style={styles.reactLogo}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Materiales</ThemedText>
          </ThemedView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Button
              title="Simular crear nuevo recursos"
              color="#caffc6ff"
              onPress={() => simularCrearMaterial()}
            />
          </View>
          {/* Solo listado de materiales, formulario movido a Explore */}
          <ThemedView style={styles.stepContainer}>
            {materiales.length === 0 && <ThemedText>No hay materiales registrados.</ThemedText>}
            {materiales.map((mat) => (
              <Pressable
                key={mat.id}
                style={{ padding: 8, borderBottomWidth: 1, borderColor: '#eee' }}
                onPress={() => router.push({ pathname: '/(tabs)/material-detail', params: { id: mat.id } })}
              >
                <ThemedText type="defaultSemiBold">{mat.nombre}</ThemedText>
                {mat.descripcion ? <ThemedText>{mat.descripcion}</ThemedText> : null}
              </Pressable>
            ))}
          </ThemedView>
        </ParallaxScrollView>
      </ScrollView>
    </SafeAreaView>
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
    top: 50,
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -145 }], // 290 / 2 = 145
  },
});
