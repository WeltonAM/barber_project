import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import AbaPerfilUsuario from './Usuario'
import Agendamento from './Agendamento'
import Inicio from './Inicio'

const Tab = createBottomTabNavigator()

export default function Abas({ navigation }: any) {
    function tab(nome: string, componente: any, label: string, icone: string) {
        return (
            <Tab.Screen
                name={nome}
                component={componente}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabScreen}>
                            <Ionicons
                                name={icone as any}
                                size={24}
                                color={focused ? '#29A7EA' : '#9DA2AE'}
                            />
                            <Text
                                style={{
                                    ...styles.tabScreenText,
                                    color: focused ? '#29A7EA' : '#9DA2AE',
                                }}
                            >
                                {label}
                            </Text>
                        </View>
                    ),
                }}
            />
        )
    }

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#222',
                tabBarInactiveBackgroundColor: '#222',
                tabBarStyle: {
                    backgroundColor: '#222',
                },
            }}
        >
            {tab('Inicio', Inicio, 'Início', 'home-outline')}
            {tab('Agendamento', Agendamento, 'Agendamento', 'calendar-outline')}
            {tab('Usuario', AbaPerfilUsuario, 'Usuário', 'person-outline')}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabScreen: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabScreenText: {
        fontSize: 12,
    },
})
