import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, List, Switch, Divider, Button, Dialog, Portal, RadioButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/theme';

const SettingsScreen = ({ navigation }) => {
  // Settings state
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [exportDialogVisible, setExportDialogVisible] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [syncFrequency, setSyncFrequency] = useState('daily');
  
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
      ]
    );
  };
  
  const handleExport = () => {
    // Simulate export
    setExportDialogVisible(false);
    Alert.alert(
      "Export Successful",
      `Your contacts have been exported in ${exportFormat.toUpperCase()} format.`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark Mode"
            description="Use dark theme throughout the app"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={props => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={colors.primary}
              />
            )}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Enable Notifications"
            description="Receive reminders for follow-ups"
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={colors.primary}
              />
            )}
          />
          
          <List.Item
            title="Notification Sound"
            description="Set sound for notifications"
            left={props => <List.Icon {...props} icon="volume-high" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Data Management</List.Subheader>
          <List.Item
            title="Cloud Sync"
            description="Sync your data across devices"
            left={props => <List.Icon {...props} icon="cloud-sync" />}
            right={props => (
              <Switch
                value={syncEnabled}
                onValueChange={setSyncEnabled}
                color={colors.primary}
              />
            )}
          />
          
          {syncEnabled && (
            <List.Item
              title="Sync Frequency"
              description={`Currently set to: ${syncFrequency}`}
              left={props => <List.Icon {...props} icon="sync" />}
              onPress={() => {
                // Show sync frequency options dialog
                Alert.alert(
                  "Sync Frequency",
                  "Choose how often to sync",
                  [
                    { text: "Real-time", onPress: () => setSyncFrequency('real-time') },
                    { text: "Daily", onPress: () => setSyncFrequency('daily') },
                    { text: "Weekly", onPress: () => setSyncFrequency('weekly') },
                    { text: "Cancel", style: "cancel" }
                  ]
                );
              }}
            />
          )}
          
          <List.Item
            title="Export Contacts"
            description="Export your contacts to a file"
            left={props => <List.Icon {...props} icon="export" />}
            onPress={() => setExportDialogVisible(true)}
          />
          
          <List.Item
            title="Import Contacts"
            description="Import contacts from a file"
            left={props => <List.Icon {...props} icon="import" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Account Details"
            description="View and edit your account information"
            left={props => <List.Icon {...props} icon="account" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="Subscription"
            description="Manage your subscription plan"
            left={props => <List.Icon {...props} icon="star" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="Change Password"
            description="Update your account password"
            left={props => <List.Icon {...props} icon="lock" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Help & Feedback</List.Subheader>
          <List.Item
            title="Help Center"
            description="Get help with using the app"
            left={props => <List.Icon {...props} icon="help-circle" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="Report a Bug"
            description="Let us know about issues"
            left={props => <List.Icon {...props} icon="bug" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            icon="logout" 
            onPress={handleLogout}
            style={styles.logoutButton}
            contentStyle={styles.logoutButtonContent}
          >
            Log Out
          </Button>
        </View>
      </ScrollView>
      
      <Portal>
        <Dialog visible={exportDialogVisible} onDismiss={() => setExportDialogVisible(false)}>
          <Dialog.Title>Export Contacts</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>Choose export format:</Text>
            <RadioButton.Group onValueChange={value => setExportFormat(value)} value={exportFormat}>
              <View style={styles.radioOption}>
                <RadioButton value="csv" />
                <Text>CSV (Comma Separated Values)</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="vcf" />
                <Text>VCF (vCard)</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="json" />
                <Text>JSON</Text>
              </View>
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExportDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleExport}>Export</Button>
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
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 16,
  },
  logoutButton: {
    borderColor: colors.error,
  },
  logoutButtonContent: {
    padding: 8,
  },
  dialogText: {
    marginBottom: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
});

export default SettingsScreen; 