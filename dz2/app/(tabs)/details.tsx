import { Ionicons } from '@expo/vector-icons'; // Додаємо іконки для красивого дизайну
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { time } = useLocalSearchParams<{ time: string }>();
  const { isgood } = useLocalSearchParams<{ isgood: string }>();




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.detailCard}>
          <View style={styles.headerRow}>
            {isgood == "true" ? (
              <View style={styles.statusBadge}>
                <View style={[styles.emptyCircleSmall, { borderColor: '#48C9B0' }]} />
                <Text style={[styles.statusText, { color: '#48C9B0' }]}>Completed</Text>
              </View>
            ) : (
              <View style={styles.statusBadge}>
                <View style={styles.emptyCircleSmall} />
                <Text style={styles.statusText}>Pending</Text>
              </View>
            )}
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={16} color="#6C8DF6" style={{ marginRight: 4 }} />
              <Text style={styles.taskTime}>{time || "1"}:00 PM</Text>
            </View>
          </View>
          <Text style={styles.taskName}>{name || "Untitled Task"}</Text>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This is a detailed view of your task. You can add more information here like priority, dates, or subtasks.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFCFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  detailCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  emptyCircleSmall: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  taskTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C8DF6',
  },
  taskName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
    lineHeight: 34,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  completeButton: {
    flexDirection: 'row',
    backgroundColor: '#48C9B0',
    borderRadius: 16,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#48C9B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  }
});