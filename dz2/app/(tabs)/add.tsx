import { Todo } from '@/app/model/todo';
import { storage } from '@/services/storage';
import React from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { IFormInput, PriorityEnum } from '../service/serviceadd';




export default function Add() {
    // const [tasks, setTasks] = useState<Todo[]>([]);
    const { control, handleSubmit } = useForm<IFormInput>();



    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        Keyboard.dismiss();
        storage.load<Todo[]>('tasks').then(loadedTasks => {
            if (loadedTasks) {
                console.log(loadedTasks);
                const newTask: Todo = {
                    id: loadedTasks.length + 1,
                    todo: data.todo,
                    completed: false,
                    userId: 1,
                };
                storage.save<Todo[]>('tasks', [...loadedTasks, newTask]);
            }
            else {
                const newTask: Todo = {
                    id: 1,
                    todo: data.todo,
                    completed: false,
                    userId: 1,
                };
                storage.save<Todo[]>('tasks', [newTask]);

            }
        });

        // setTasks([...tasks, newTask]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>To do List</Text>
            </View>

            <View style={styles.formSection}>
                <Text style={styles.label}>Task</Text>
                <Controller
                    control={control}
                    name="todo"
                    render={({ field: { value, onChange } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="go to school"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text style={styles.label}>Task Date</Text>
                <Controller
                    control={control}
                    name="data"
                    render={({ field: { value, onChange } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="2024-10-25"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Text style={styles.label}>Priority</Text>
                <Controller
                    control={control}
                    name="priority"
                    render={({ field: { value, onChange } }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                            {Object.values(PriorityEnum).map((priority) => (
                                <Text
                                    key={priority}
                                    style={{
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: value === priority ? '#6C8DF6' : '#ddd',
                                        borderRadius: 8,
                                        backgroundColor: value === priority ? '#6C8DF6' : '#fff',
                                        color: value === priority ? '#fff' : '#000',
                                        textTransform: 'capitalize'
                                    }}
                                    onPress={() => onChange(priority)}
                                >
                                    {priority}
                                </Text>
                            ))}
                        </View>
                    )}
                />

                <Button title="Submit Task" onPress={handleSubmit(onSubmit)} />
            </View>
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
        borderRadius: 8, // Додано легке заокруглення для краси
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