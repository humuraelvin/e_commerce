import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { C      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <IconSymbol name="gearshape" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}from '../../constants/theme';
import { IconSymbol } from '../../components/ui/icon-symbol';

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {

          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <IconSymbol name="house" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ size, color }) => (
            <IconSymbol name="bag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ size, color }) => (
            <IconSymbol name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <IconSymbol name="person.circle" size={size} color={color} />
          ),
        }}
      />

          tabBarIcon: ({ size, color }) => (      <Tabs.Screen

            <IconSymbol name="person.circle" size={size} color={color} />        name="products"

          ),        options={{

        }}          title: 'Products',

      />          tabBarIcon: ({ color }) => <IconSymbol size={24} name="bag.fill" color={color} />,

      <Tabs.Screen        }}

        name="settings"      />

        options={{      <Tabs.Screen

          title: 'Settings',        name="cart"

          tabBarIcon: ({ size, color }) => (        options={{

            <IconSymbol name="gearshape" size={size} color={color} />          title: 'Cart',

          ),          tabBarIcon: ({ color }: { color: string }) => <CartTabIcon color={color} />,

        }}        }}

      />      />

    </Tabs>      <Tabs.Screen

  );        name="profile"

}        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={24} name="person.crop.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={24} name="gear" color={color} />,
        }}
      />
    </Tabs>
 );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
