import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.coverPlaceholder}>
          <Text style={styles.coverIcon}>📚</Text>
        </View>

        <Text style={styles.title}>{params.title || 'Book Title'}</Text>
        <Text style={styles.author}>Author: {params.author || 'Unknown'}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{params.category || 'General'}</Text>
        </View>

        <Text style={styles.sectionTitle}>About this book</Text>
        <Text style={styles.description}>
          {params.description || 'No description available for this book.'}
        </Text>

        <TouchableOpacity 
          style={styles.readButton}
          onPress={() => alert(`Starting to read "${params.title}"...`)}
        >
          <Text style={styles.readButtonText}>Start Reading Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, paddingTop: 40 },
  backButton: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#e2e8f0', borderRadius: 8, alignSelf: 'flex-start' },
  backText: { color: '#1e293b', fontWeight: 'bold' },
  content: { padding: 20, alignItems: 'center' },
  coverPlaceholder: { width: 140, height: 180, backgroundColor: '#eff6ff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  coverIcon: { fontSize: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', textAlign: 'center' },
  author: { fontSize: 16, color: '#64748b', marginTop: 4 },
  badge: { backgroundColor: '#2563eb', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 10 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', alignSelf: 'flex-start', marginTop: 24, marginBottom: 8 },
  description: { fontSize: 14, color: '#475569', lineHeight: 22, alignSelf: 'flex-start' },
  readButton: { backgroundColor: '#2563eb', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  readButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});