import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

type Temp = 'sanguine' | 'melancholic' | 'choleric' | 'phlegmatic';

const questions = [
  {
    q: 'Як ви реагуєте на труднощі?',
    opts: [
      { text: 'Активно дію', type: 'choleric' },
      { text: 'Швидко адаптуюсь', type: 'sanguine' },
      { text: 'Спокійно аналізую', type: 'phlegmatic' },
      { text: 'Засмучуюсь', type: 'melancholic' },
    ],
  },
  {
    q: 'У новій компанії ви:',
    opts: [
      { text: 'Керую', type: 'choleric' },
      { text: 'Багато спілкуюсь', type: 'sanguine' },
      { text: 'Спостерігаю', type: 'phlegmatic' },
      { text: 'Тримаюсь осторонь', type: 'melancholic' },
    ],
  },
];

const names: Record<Temp, string> = {
  sanguine: 'Сангвінік', melancholic: 'Меланхолік',
  choleric: 'Холерик', phlegmatic: 'Флегматик',
};

export default function App() {
  const [step, setStep] = useState<number>(-1); 
  const [scores, setScores] = useState<Record<Temp, number>>({
    sanguine: 0, melancholic: 0, choleric: 0, phlegmatic: 0,
  });

  const handleAnswer = (type: Temp) => {
    scores[type]++;
    
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const result = (Object.keys(scores) as Temp[]).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
      );
      
      Alert.alert('Результат', `Ваш темперамент: ${names[result]}`, [
        { 
          text: 'Ок', 
          onPress: () => { 
            setStep(-1); 
            setScores({ sanguine: 0, melancholic: 0, choleric: 0, phlegmatic: 0 }); 
          } 
        }
      ]);
    }
  };

  if (step === -1) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Тест на темперамент</Text>
        <Button title="Старт" onPress={() => setStep(0)} />
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{questions[step].q}</Text>
      {questions[step].opts.map((opt, i) => (
        <View key={i} style={styles.btnWrapper}>
          <Button title={opt.text} onPress={() => handleAnswer(opt.type as Temp)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  btnWrapper: { marginVertical: 8 },
});