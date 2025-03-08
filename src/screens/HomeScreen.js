import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, FAB, Searchbar, Card, Text, Chip, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/theme';

// Mock data for demonstration
const MOCK_CARDS = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Tech Innovations Inc.',
    title: 'Senior Developer',
    email: 'john.doe@techinnovations.com',
    phone: '+1 (555) 123-4567',
    category: 'Technology',
    date: '2023-11-15',
    hasReminder: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Marketing Solutions',
    title: 'Marketing Director',
    email: 'jane.smith@marketingsolutions.com',
    phone: '+1 (555) 987-6543',
    category: 'Marketing',
    date: '2023-11-10',
    hasReminder: false,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    company: 'Finance Group',
    title: 'Investment Advisor',
    email: 'robert.j@financegroup.com',
    phone: '+1 (555) 456-7890',
    category: 'Finance',
    date: '2023-11-05',
    hasReminder: true,
  },
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState(MOCK_CARDS);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality
  };

  const renderCard = ({ item }) => (
    <Card 
      style={styles.card}
      onPress={() => navigation.navigate('CardDetails', { cardId: item.id })}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Avatar.Text size={40} label={item.name.substr(0, 2)} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCompany}>{item.company}</Text>
          </View>
        </View>
        
        <View style={styles.cardMeta}>
          <Chip 
            icon="tag" 
            style={styles.categoryChip}
            textStyle={styles.chipText}
          >
            {item.category}
          </Chip>
          
          <Text style={styles.cardDate}>Added {item.date}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="CardConnect" />
        <Appbar.Action icon="bell" onPress={() => navigation.navigate('Reminders')} />
        <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Searchbar
          placeholder="Search contacts..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          contentContainerStyle={styles.list}
        />
      </View>
      
      <FAB
        style={styles.fab}
        icon="camera"
        onPress={() => navigation.navigate('ScanCard')}
        label="Scan Card"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
    elevation: 2,
  },
  list: {
    paddingBottom: 80, // Space for FAB
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardInfo: {
    marginLeft: 12,
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 14,
    color: colors.text,
  },
  cardCompany: {
    fontSize: 14,
    color: colors.text,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  categoryChip: {
    backgroundColor: colors.primary + '20',
  },
  chipText: {
    color: colors.primary,
    fontSize: 12,
  },
  cardDate: {
    fontSize: 12,
    color: colors.placeholder,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default HomeScreen; 