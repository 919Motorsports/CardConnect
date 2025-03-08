import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Text, Checkbox, IconButton, Divider, Button, FAB, Dialog, Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/theme';

// Mock data for demonstration
const MOCK_REMINDERS = [
  {
    id: '1',
    contactId: '1',
    contactName: 'John Doe',
    title: 'Follow up on project proposal',
    date: '2023-12-05T10:00:00',
    completed: false,
  },
  {
    id: '2',
    contactId: '3',
    contactName: 'Robert Johnson',
    title: 'Schedule meeting for investment options',
    date: '2023-12-07T14:30:00',
    completed: false,
  },
  {
    id: '3',
    contactId: '2',
    contactName: 'Jane Smith',
    title: 'Discuss marketing campaign',
    date: '2023-12-02T09:00:00',
    completed: true,
  },
];

const RemindersScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState(MOCK_REMINDERS);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    contactName: '',
    date: ''
  });

  // Format date string for display
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Toggle reminder completion
  const toggleCompletion = (id) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed } 
          : reminder
      )
    );
  };

  // Delete reminder
  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  // Add new reminder
  const addReminder = () => {
    if (newReminder.title && newReminder.contactName) {
      const reminder = {
        id: Date.now().toString(),
        contactId: Math.floor(Math.random() * 1000).toString(), // Mock ID
        contactName: newReminder.contactName,
        title: newReminder.title,
        date: newReminder.date || new Date().toISOString(),
        completed: false,
      };
      
      setReminders([reminder, ...reminders]);
      setNewReminder({ title: '', contactName: '', date: '' });
      setDialogVisible(false);
    }
  };

  // Render a reminder item
  const renderReminderItem = ({ item }) => (
    <Card style={[styles.card, item.completed && styles.completedCard]}>
      <Card.Content>
        <View style={styles.reminderHeader}>
          <Checkbox
            status={item.completed ? 'checked' : 'unchecked'}
            onPress={() => toggleCompletion(item.id)}
          />
          <View style={styles.reminderInfo}>
            <Text style={[
              styles.reminderTitle,
              item.completed && styles.completedText
            ]}>
              {item.title}
            </Text>
            <Text style={styles.reminderContact}>
              For: {item.contactName}
            </Text>
          </View>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => deleteReminder(item.id)}
          />
        </View>
        
        <View style={styles.reminderFooter}>
          <Text style={styles.reminderDate}>
            {formatDate(item.date)}
          </Text>
          <Button
            mode="text"
            compact
            onPress={() => navigation.navigate('CardDetails', { cardId: item.contactId })}
          >
            View Contact
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  // Filter reminders by completion status
  const activeReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Reminders" />
      </Appbar.Header>
      
      <View style={styles.content}>
        <FlatList
          data={[...activeReminders, ...completedReminders]}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
          ListHeaderComponent={() => (
            <>
              <Text style={styles.sectionHeader}>
                Active Reminders ({activeReminders.length})
              </Text>
            </>
          )}
          ListEmptyComponent={() => (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Text style={styles.emptyText}>No reminders yet</Text>
                <Button 
                  mode="contained" 
                  onPress={() => setDialogVisible(true)}
                  style={styles.emptyButton}
                >
                  Create a Reminder
                </Button>
              </Card.Content>
            </Card>
          )}
          SectionSeparatorComponent={() => activeReminders.length > 0 && completedReminders.length > 0 ? (
            <View>
              <Divider style={styles.sectionDivider} />
              <Text style={styles.sectionHeader}>
                Completed Reminders ({completedReminders.length})
              </Text>
            </View>
          ) : null}
        />
      </View>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setDialogVisible(true)}
        label="New Reminder"
      />
      
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>New Reminder</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={newReminder.title}
              onChangeText={(text) => setNewReminder({...newReminder, title: text})}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Contact Name"
              value={newReminder.contactName}
              onChangeText={(text) => setNewReminder({...newReminder, contactName: text})}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Date (e.g. 2023-12-10T10:00:00)"
              value={newReminder.date}
              onChangeText={(text) => setNewReminder({...newReminder, date: text})}
              mode="outlined"
              style={styles.dialogInput}
              placeholder="YYYY-MM-DDTHH:MM:SS"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={addReminder}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.primary,
  },
  sectionDivider: {
    marginVertical: 16,
  },
  card: {
    marginBottom: 12,
  },
  completedCard: {
    opacity: 0.7,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderInfo: {
    flex: 1,
    marginLeft: 8,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  reminderContact: {
    fontSize: 14,
    color: colors.placeholder,
    marginTop: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  reminderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  reminderDate: {
    fontSize: 13,
    color: colors.placeholder,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 8,
  },
  dialogInput: {
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default RemindersScreen; 