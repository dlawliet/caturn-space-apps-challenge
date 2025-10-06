import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllMateriales } from '@/utils/db';
import { Label } from '@react-navigation/elements';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [materiales, setMateriales] = useState<any[]>([]);

  const cargarMateriales = async (lang: 'es' | 'en') => {
    const data = await getAllMateriales(lang);
    setMateriales(data);
  };

  useEffect(() => {
    cargarMateriales(i18n.language as 'es' | 'en');
  }, [i18n.language]);

  const simularCrearMaterial = async () => {
    router.push('/(tabs)/simulacion');
  };

  const handleChangeLang = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#000', dark: '#000000ff' }}
        headerImage={
          <View style={{ position: 'relative', width: '100%', height: 180, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('@/assets/images/caturn.jpeg')}
              style={styles.reactLogo}
            />
            <Pressable
              onPress={handleChangeLang}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: '#fff',
                borderRadius: 16,
                paddingVertical: 6,
                paddingHorizontal: 14,
                elevation: 2,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              <ThemedText type="defaultSemiBold" style={{ color: '#000' }}>
                {i18n.language === 'es' ? 'ESP' : 'ENG'}
              </ThemedText>
            </Pressable>
          </View>
        }
      >
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
                {t('simulation')}
              </ThemedText>
            </View>
          </Pressable>
        </View>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t('material')}</ThemedText>
        </ThemedView>
        <Label
          style={{
            color: '#eed98eff',
            textAlign: 'justify',
            flexWrap: 'wrap',
            lineHeight: 20,
          }}
          numberOfLines={0}
        >
          {t('welcome')}
        </Label>
        <ThemedView style={styles.stepContainer}>
          {materiales.length > 0 && materiales.map((mat) => (
            <Pressable
              key={mat.id}
              style={{ padding: 8, borderBottomWidth: 0, borderColor: '#929292ff' }}
              onPress={() => router.push({ pathname: '/(tabs)/material-detail', params: { id: mat.id } })}
            >
              <ThemedText type="defaultSemiBold">{mat.nombre ?? mat.name}</ThemedText>
              <ThemedText>{mat.descripcion ?? mat.description}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5
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
