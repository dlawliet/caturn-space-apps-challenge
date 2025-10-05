import { ThemedText } from '@/components/themed-text';
import { PASOS_SIMULACION, VOLVER_EN, VOLVER_ES } from '@/constants/texto';
import { useLanguage } from '@/context/LanguageContext';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, View } from 'react-native';



export default function SimulacionScreen() {
  const { lang } = useLanguage();
  const steps = useMemo(() => PASOS_SIMULACION, []);

  const [displayed, setDisplayed] = useState<string[]>(Array(steps.length).fill(''));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [waitingButton, setWaitingButton] = useState(false);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      setDisplayed(Array(steps.length).fill(''));
      setCurrentIdx(0);
    }, [steps.length])
  );

  useEffect(() => {
    if (currentIdx < steps.length) {
      const step = steps[currentIdx];
      const text = step[lang];
      const currentDisplayed = displayed[currentIdx];
      if (step.type === 'label' || step.type === 'input') {
        if (step.escrito) {
          if (currentDisplayed.length < text.length) {
            const timeout = setTimeout(() => {
              setDisplayed((prev) => {
                const updated = [...prev];
                updated[currentIdx] = text.slice(0, currentDisplayed.length + 1);
                return updated;
              });
            }, 5);
            return () => clearTimeout(timeout);
          } else if (currentDisplayed.length === text.length) {
            if (currentIdx < steps.length - 1) {
              const nextTimeout = setTimeout(() => {
                setCurrentIdx((idx) => idx + 1);
              }, 500);
              return () => clearTimeout(nextTimeout);
            }
          }
        } else {
          if (currentDisplayed !== text) {
            setDisplayed((prev) => {
              const updated = [...prev];
              updated[currentIdx] = text;
              return updated;
            });
          } else if (currentDisplayed === text) {
            if (currentIdx < steps.length - 1) {
              const nextTimeout = setTimeout(() => {
                setCurrentIdx((idx) => idx + 1);
              }, 700);
              return () => clearTimeout(nextTimeout);
            }
          }
        }
      } else if (step.type === 'button') {
        setWaitingButton(true);
      }
    }
  }, [displayed, currentIdx, lang, steps]);

  return (
    <ScrollView contentContainerStyle={{ ...styles.container, justifyContent: 'flex-start' }}>
      <View style={{ alignItems: 'flex-start', marginBottom: 10, marginTop: 40, padding: 0, marginLeft: -9 }}>
        <Button
          title={lang === 'es' ? VOLVER_ES : VOLVER_EN}
          onPress={() => router.back()}
          color="#ffca6dff"
        />
      </View>
      {steps.map((step, i) => {
        if (i > currentIdx) return null;
        if (step.type === 'label') {
          return (
            <ThemedText
              key={i}
              style={[
                styles.text,
                { textAlign: 'justify', opacity: displayed[i] ? 1 : 0.2, minHeight: 30 },
                step.color ? { color: step.color } : null
              ]}
            >
              {displayed[i]}
            </ThemedText>
          );
        }
        if (step.type === 'input') {
          return (
            <View key={i} style={styles.textareaContainer}>
              <ThemedText
                style={[
                  styles.textareaText,
                  step.color ? { color: step.color } : null
                ]}
              >
                {displayed[i]}
              </ThemedText>
            </View>
          );
        }
        if (step.type === 'button') {
          if (!waitingButton) return null;
          return (
            <View key={i} style={{ marginTop: 15 }}>
              <Pressable
                onPress={() => {
                  setWaitingButton(false);
                  setCurrentIdx((idx) => idx + 1);
                }}
                style={({ pressed }) => [
                  {
                    borderWidth: 1,
                    borderColor: '#caffc6ff',
                    borderRadius: 6,
                    overflow: 'hidden',
                    backgroundColor: pressed ? '#ffe2a6' : '#ffca6dff',
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    alignItems: 'center',
                  },
                ]}
              >
                <ThemedText style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>
                  {step[lang]}
                </ThemedText>
              </Pressable>
            </View>
          );
        }
        return null;
      })}
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
  textareaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    minWidth: 220,
    minHeight: 120,
    height: 72,
    justifyContent: 'flex-start',
    marginTop: 12,
    marginBottom: 12,
  },
  textareaText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'monospace',
    minHeight: 72,
    textAlignVertical: 'top',
    lineHeight: 24,
  },
});
