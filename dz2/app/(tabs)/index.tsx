import { Todo } from '@/app/model/todo';
import { Ionicons } from '@expo/vector-icons';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { set, SubmitHandler, useForm } from "react-hook-form";
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { IFormInput } from '../service/serviceadd';
import { storage } from '@/services/storage';


export default function Index() {

  const [tasks, setTasks] = useState<Todo[]>([]);


  


 
  function getRandomInt() {
    return Math.floor(Math.random() * (12 - 1 + 1)) + 1;
  }
  function loadTasks() {
    storage.load<Todo[]>('tasks').then(loadedTasks => {
      if (loadedTasks) {
        setTasks(loadedTasks);
      }
    });
  }
  useFocusEffect(
  useCallback(() => {
    loadTasks();
  }, [])
);
  

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>4th March 2026</Text>
      </View>

      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={tasks}

        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link style={styles.taskCard} href={{
            pathname: "/details",
            params: { name: item.todo.toString(), time: getRandomInt().toString(), isgood: item.completed.toString() }

          }} >
            <View style={styles.taskLeft}>
              {item.completed ? (
                <Ionicons name="checkmark-circle" size={24} color="#48C9B0" style={styles.checkIcon} />
              ) : (
                <View style={styles.emptyCircle} />
              )}
              <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
                {item.todo}
              </Text>
            </View>
            <Text style={styles.taskTime}>{getRandomInt()}pm</Text>
          </Link>
        )}

        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFCFF',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  dateContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 20,

    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 3,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 15,
  },
  emptyCircle: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    width: 200,
    color: '#333',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#48C9B0',
  },
  taskTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  fab: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    backgroundColor: '#6C8DF6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C8DF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  formSection: { padding: 20 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  dateSelector: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

