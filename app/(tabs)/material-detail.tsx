import { ThemedText } from '@/components/themed-text';
import { getAllMateriales } from '@/utils/db';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function MaterialDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [material, setMaterial] = useState<any>(null);

  useEffect(() => {
    async function fetchMaterial() {
      const materiales = await getAllMateriales(i18n.language as 'es' | 'en');
      const found = materiales.find((m: any) => String(m.id) === String(id));
      setMaterial(found);
    }
    fetchMaterial();
  }, [id, i18n.language]);

  if (!material) {
    return <ThemedText>{t('loading', 'Cargando...')}</ThemedText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText type="title" style={styles.title}>{t('material_detail', 'Detalle del Material')}</ThemedText>
        <View style={{ flex: 1 }}>
          <Button title={t('back', 'Volver')} onPress={() => router.back()} />
        </View>
      </View>
      {Object.entries(material).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <ThemedText type="subtitle" style={styles.subtitle}>{key}</ThemedText>
          <ThemedText>{String(value)}</ThemedText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 40,
  },
  title: {
    marginBottom: 0,
  },
  row: {
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: '600',
    color: '#858282ff',
  },
});
