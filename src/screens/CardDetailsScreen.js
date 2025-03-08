import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, TextInput, Button, IconButton, Menu, Divider, Chip, Text, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/theme';

const CardDetailsScreen = ({ route, navigation }) => {
  const { cardId, newCard } = route.params || {};
  const [menuVisible, setMenuVisible] = useState(false);
  const [editMode, setEditMode] = useState(newCard ? true : false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    notes: '',
    category: 'Uncategorized',
  });

  // Populate form with data if editing an existing card
  useEffect(() => {
    if (newCard) {
      setFormData({
        ...formData,
        ...newCard,
      });
    } else if (cardId) {
      // In a real app, you would fetch the card data from your state or API
      // Mock data for demonstration
      const mockCardData = {
        id: cardId,
        name: 'John Doe',
        title: 'Senior Developer',
        company: 'Tech Innovations Inc.',
        email: 'john.doe@techinnovations.com',
        phone: '+1 (555) 123-4567',
        website: 'www.techinnovations.com',
        address: '123 Tech Avenue, San Francisco, CA 94107',
        notes: 'Met at Tech Conference 2023. Interested in our API services.',
        category: 'Technology',
      };
      
      setFormData(mockCardData);
    }
  }, [cardId, newCard]);

  const handleSave = () => {
    // In a real app, you would save the card data to your state or API
    setEditMode(false);
    navigation.goBack();
  };

  const handleDelete = () => {
    // In a real app, you would delete the card data from your state or API
    navigation.goBack();
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const renderViewMode = () => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.name}>{formData.name}</Text>
            <Text style={styles.title}>{formData.title}</Text>
            <Text style={styles.company}>{formData.company}</Text>
          </View>
          
          <Chip icon="tag" style={styles.categoryChip}>
            {formData.category}
          </Chip>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.contactDetails}>
          <DetailItem icon="email" label="Email" value={formData.email} />
          <DetailItem icon="phone" label="Phone" value={formData.phone} />
          <DetailItem icon="web" label="Website" value={formData.website} />
          <DetailItem icon="map-marker" label="Address" value={formData.address} />
        </View>
        
        <Divider style={styles.divider} />
        
        <View>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notes}>{formData.notes || 'No notes added yet.'}</Text>
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.actions}>
        <Button icon="bell-plus" mode="outlined" style={styles.actionButton}>
          Add Reminder
        </Button>
        <Button icon="share-variant" mode="outlined" style={styles.actionButton}>
          Share
        </Button>
      </Card.Actions>
    </Card>
  );

  const renderEditMode = () => (
    <Card style={styles.card}>
      <Card.Content>
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Job Title"
          value={formData.title}
          onChangeText={(text) => handleChange('title', text)}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Company"
          value={formData.company}
          onChangeText={(text) => handleChange('company', text)}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
        
        <TextInput
          label="Phone"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />
        
        <TextInput
          label="Website"
          value={formData.website}
          onChangeText={(text) => handleChange('website', text)}
          mode="outlined"
          keyboardType="url"
          style={styles.input}
        />
        
        <TextInput
          label="Address"
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Category"
          value={formData.category}
          onChangeText={(text) => handleChange('category', text)}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Notes"
          value={formData.notes}
          onChangeText={(text) => handleChange('notes', text)}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />
      </Card.Content>
      
      <Card.Actions style={styles.actions}>
        <Button 
          mode="contained" 
          onPress={handleSave}
          style={styles.saveButton}
        >
          Save
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={() => setEditMode(false)}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={editMode ? "Edit Contact" : "Contact Details"} />
        {!editMode && (
          <>
            <Appbar.Action icon="pencil" onPress={() => setEditMode(true)} />
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Appbar.Action 
                  icon="dots-vertical" 
                  onPress={() => setMenuVisible(true)} 
                />
              }
            >
              <Menu.Item 
                onPress={() => {
                  setMenuVisible(false);
                  setEditMode(true);
                }} 
                title="Edit" 
                leadingIcon="pencil"
              />
              <Menu.Item 
                onPress={() => {
                  setMenuVisible(false);
                  // Add to favorites logic
                }} 
                title="Add to Favorites" 
                leadingIcon="star"
              />
              <Divider />
              <Menu.Item 
                onPress={() => {
                  setMenuVisible(false);
                  handleDelete();
                }} 
                title="Delete" 
                leadingIcon="delete"
                titleStyle={{ color: colors.error }}
              />
            </Menu>
          </>
        )}
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        {editMode ? renderEditMode() : renderViewMode()}
      </ScrollView>
      
      {!editMode && (
        <FAB
          style={styles.fab}
          icon="email"
          onPress={() => {
            // Send email logic
          }}
        />
      )}
    </SafeAreaView>
  );
};

const DetailItem = ({ icon, label, value }) => {
  if (!value) return null;
  
  return (
    <View style={styles.detailItem}>
      <IconButton icon={icon} size={20} style={styles.detailIcon} />
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
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
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    marginTop: 4,
  },
  company: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 2,
  },
  categoryChip: {
    backgroundColor: colors.primary + '20',
  },
  divider: {
    marginVertical: 16,
  },
  contactDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    margin: 0,
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.placeholder,
  },
  detailValue: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notes: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    marginBottom: 12,
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default CardDetailsScreen; 