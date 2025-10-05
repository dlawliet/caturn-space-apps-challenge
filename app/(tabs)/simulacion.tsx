import { ThemedText } from '@/components/themed-text';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

const TEXTO_SIMULADO = `Este es un texto de ejemplo para la simulación de escritura. Puedes reemplazarlo por el texto que desees más adelante. El texto se mostrará como si estuviera siendo escrito en tiempo real, y al finalizar aparecerá un botón para continuar.`;

export default function SimulacionScreen() {
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
    if (displayed.length < TEXTO_SIMULADO.length) {
      const timeout = setTimeout(() => {
        setDisplayed(TEXTO_SIMULADO.slice(0, displayed.length + 1));
      }, 25);
      return () => clearTimeout(timeout);
    } else if (displayed.length === TEXTO_SIMULADO.length) {
      setDone(true);
    }
  }, [displayed]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'flex-start', marginBottom: 24 }}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
      <ThemedText style={styles.text}>{displayed}</ThemedText>
      {done && (
        <View style={{ marginTop: 32 }}>
          <Button title="Continuar" onPress={() => router.back()} />
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
