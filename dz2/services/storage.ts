import { Todo } from '@/app/model/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    async save<Todo>(key: string, value: Todo): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('Error saving data to storage', e);
        }
    },
    async load<T>(key: string): Promise<T | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error loading data from storage', e);
            return null;
        }
    }
}