import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';

const CATEGORIES = ['All', 'Classic', 'Dystopian', 'Fiction', 'Self-Help', 'Programming'];

const BOOKS = [
  { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic', description: 'A classic story of innocence, compassion, and justice in the American South.' },
  { id: '2', title: '1984', author: 'George Orwell', category: 'Dystopian', description: 'A chilling dystopian novel about totalitarianism, surveillance, and freedom.' },
  { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', description: 'A critique of the American Dream set in the roaring twenties.' },
  { id: '4', title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', description: 'An easy and proven way to build good habits and break bad ones.' },
  { id: '5', title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', description: 'A handbook of agile software craftsmanship.' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Digital Library</Text>
        <Text style={styles.headerSubtitle}>Discover and read your favorite books</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title or author..."
          placeholderTextColor="#95a5a6"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.activeCategoryButtonText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>Author: {item.author}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{item.category}</Text>
            </View>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => router.push({
                  pathname: '/details',
                  params: { 
                    title: item.title, 
                    author: item.author, 
                    category: item.category, 
                    description: item.description 
                  }
                })}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.readButton}>
                <Text style={styles.readButtonText}>Read Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingHorizontal: 16, paddingTop: 40 },
  header: { marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1e293b' },
  headerSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  searchContainer: { marginBottom: 16 },
  searchInput: { backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', fontSize: 15 },
  categoryContainer: { marginBottom: 16 },
  categoryButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e2e8f0', marginRight: 8 },
  activeCategoryButton: { backgroundColor: '#2563eb' },
  categoryButtonText: { fontSize: 14, color: '#475569', fontWeight: '600' },
  activeCategoryButtonText: { color: '#ffffff' },
  bookCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 14, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  bookTitle: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  bookAuthor: { fontSize: 14, color: '#64748b', marginTop: 4 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: '#eff6ff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginTop: 8 },
  categoryBadgeText: { fontSize: 12, color: '#2563eb', fontWeight: '600' },
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 14 },
  detailsButton: { backgroundColor: '#f1f5f9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  detailsButtonText: { color: '#475569', fontWeight: '600', fontSize: 13 },
  readButton: { backgroundColor: '#2563eb', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  readButtonText: { color: '#ffffff', fontWeight: '600', fontSize: 13 },
});