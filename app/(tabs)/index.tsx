import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DESCRIPCION_MATERIALES } from '@/constants/texto';
import { getAllMateriales } from '@/utils/db';
import { Label } from '@react-navigation/elements';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
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
          headerBackgroundColor={{ light: '#000', dark: '#000000ff' }}
          headerImage={
            <Image
              source={require('@/assets/images/caturn.jpeg')}
              style={[styles.reactLogo, { margin: 0, padding: 0, alignSelf: 'flex-start' }]}
            />
          }>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Pressable
              onPress={simularCrearMaterial}
              style={{
                borderWidth: 1,
                borderColor: '#caffc6ff',
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <View style={{ backgroundColor: '#f5fff4ff', paddingVertical: 8, paddingHorizontal: 16 }}>
                <ThemedText type="defaultSemiBold" style={{ color: '#000' }}>
                  Simular crear nuevo recurso
                </ThemedText>
              </View>
            </Pressable>
          </View>

          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Materiales Reciclados</ThemedText>
          </ThemedView>
          <Label
            style={{
              color: '#ac9130ff',
              textAlign: 'justify',
              flexWrap: 'wrap',
              lineHeight: 20,
            }}
            numberOfLines={0}
          >
            {DESCRIPCION_MATERIALES}
          </Label>
          <ThemedView style={styles.stepContainer}>
            {materiales.length === 0 && <ThemedText>No hay materiales registrados.</ThemedText>}
            {materiales.map((mat) => (
              <Pressable
                key={mat.id}
                style={{ padding: 8, borderBottomWidth: 0, borderColor: '#929292ff' }}
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
    marginTop: 20,
    marginBottom: 10
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 180,
    width: 290,
    top: 0,
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -145 }], // 290 / 2 = 145
  },
});
