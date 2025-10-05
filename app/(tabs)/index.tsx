
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { deleteAllMateriales, getAllMateriales, insertMaterial } from '@/utils/db';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
// Importar materiales desde archivo JSON
const handleImportarJSON = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/json', copyToCacheDirectory: true });
    if (result.canceled || !result.assets || !result.assets[0]?.uri) return;
    const asset = result.assets[0];
    const file = new File(asset.uri);
    const data = JSON.parse(file.textSync());
    if (!Array.isArray(data)) {
      Alert.alert('Error', 'El archivo JSON debe ser una lista de materiales.');
      return;
    }
    let count = 0;
    for (const material of data) {
      try {
        await insertMaterial(material);
        count++;
      } catch (e) {
        console.error(e)
      }
    }
    // await cargarMateriales();
    Alert.alert('Importación completa', `${count} materiales importados.`);
  } catch (e) {
    console.error(e)
    Alert.alert('Error', 'No se pudo importar el archivo.');
  }
};

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

  // Funciones de formulario movidas a Explore

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ paddingTop: 90, gap: 12 }}>
        <Button title="Importar materiales desde JSON" onPress={handleImportarJSON} />
        <Button
          title="Eliminar todos los materiales"
          color="#d32f2f"
          onPress={() => {
            Alert.alert(
              'Confirmar eliminación',
              '¿Estás seguro de que deseas eliminar todos los materiales? Esta acción no se puede deshacer.',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Eliminar',
                  style: 'destructive',
                  onPress: async () => {
                    await deleteAllMateriales();
                    await cargarMateriales();
                    Alert.alert('Eliminación completa', 'Todos los materiales han sido eliminados.');
                  },
                },
              ]
            );
          }}
        />
      </View>
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
