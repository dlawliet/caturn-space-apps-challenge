import { ThemedText } from '@/components/themed-text';
import { CONTINUAR_EN, CONTINUAR_ES, TEXTO_SIMULADO_EN, TEXTO_SIMULADO_ES, VOLVER_EN, VOLVER_ES } from '@/constants/texto';
import { useLanguage } from '@/context/LanguageContext';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function SimulacionScreen() {
  const { lang } = useLanguage();
  const TEXTO_SIMULADO = lang === 'es' ? TEXTO_SIMULADO_ES : TEXTO_SIMULADO_EN;
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const router = useRouter();
  const idx = useRef(0);

  useFocusEffect(
    React.useCallback(() => {
      setDisplayed('');
      setDone(false);
      idx.current = 0;
    }, [])
  );

  useEffect(() => {
    setDone(false);
  }, []);

  useEffect(() => {
    setDone(false);
    if (displayed.length < TEXTO_SIMULADO.length) {
      const timeout = setTimeout(() => {
        setDisplayed(TEXTO_SIMULADO.slice(0, displayed.length + 1));
      }, 0.05);
      return () => clearTimeout(timeout);
    } else if (displayed.length === TEXTO_SIMULADO.length) {
      setDone(true);
    }
  }, [displayed, TEXTO_SIMULADO]);

  return (
    <ScrollView contentContainerStyle={{ ...styles.container, justifyContent: 'flex-start' }}>
      <View style={{ alignItems: 'flex-start', marginBottom: 10, marginTop: 40, padding: 0, marginLeft: -9 }}>
        <Button
          title={lang === 'es' ? VOLVER_ES : VOLVER_EN}
          onPress={() => router.back()}
          color="#ffca6dff"
        />
      </View>
      <ThemedText style={[styles.text, { textAlign: 'justify' }]}>{displayed}</ThemedText>
      {done && (
        <View style={{ marginTop: 32 }}>
          <Button title={lang === 'es' ? CONTINUAR_ES : CONTINUAR_EN} onPress={() => router.back()} color="#ffca6dff" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flexGrow: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
  },
});
