import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

const DANGER_COLOR = '#FF3B30';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(false);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <IconSymbol name="gear" size={24} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText style={styles.settingText}>Dark Mode</ThemedText>
            </View>
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <IconSymbol name="gear" size={24} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText style={styles.settingText}>Push Notifications</ThemedText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <IconSymbol name="gear" size={24} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText style={styles.settingText}>Email Updates</ThemedText>
            </View>
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account</ThemedText>
          <Pressable style={styles.settingItem}>
            <View style={styles.settingContent}>
              <IconSymbol name="gear" size={24} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText style={styles.settingText}>Change Password</ThemedText>
            </View>
          </Pressable>
          <Pressable style={styles.settingItem}>
            <View style={styles.settingContent}>
              <IconSymbol name="gear" size={24} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText style={styles.settingText}>Privacy Settings</ThemedText>
            </View>
          </Pressable>
          <Pressable style={[styles.settingItem, styles.dangerItem]}>
            <View style={styles.settingContent}>
              <IconSymbol name="gear" size={24} color={DANGER_COLOR} />
              <ThemedText style={[styles.settingText, styles.dangerText]}>Log Out</ThemedText>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About</ThemedText>
          <View style={styles.aboutItem}>
            <ThemedText style={styles.label}>Version</ThemedText>
            <ThemedText style={styles.value}>1.0.0</ThemedText>
          </View>
          <View style={styles.aboutItem}>
            <ThemedText style={styles.label}>Build Number</ThemedText>
            <ThemedText style={styles.value}>100</ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  dangerItem: {
    marginTop: 20,
  },
  dangerText: {
    color: DANGER_COLOR,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
  },
});