import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useBookmarks } from '../BookmarkContext';
import { useRouter } from 'expo-router';

export default function BookmarksScreen() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>📌 Saved Bookmarks</Text>

      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarked books yet!</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookCard}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>Author: {item.author}</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => router.push({
                    pathname: '/details',
                    params: { ...item }
                  })}
                >
                  <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => toggleBookmark(item)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748b' },
  bookCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  bookTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  bookAuthor: { fontSize: 14, color: '#64748b', marginTop: 4 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  detailsButton: { backgroundColor: '#2563eb', padding: 8, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  removeButton: { backgroundColor: '#fee2e2', padding: 8, borderRadius: 8 },
  removeText: { color: '#dc2626', fontWeight: 'bold' },
});