import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getUsers } from '../api/users';
import { setToken } from '../api/token';

const HomeScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [hasLoadedUsers, setHasLoadedUsers] = useState(false);
    const [userLoadingErrorMessage, setUserLoadingErrorMessage] = useState('');


    const loadUsers = () => {
        setHasLoadedUsers(false);
        setUserLoadingErrorMessage('');
        getUsers()
            .then((res) => {
                setHasLoadedUsers(true);
                setUsers(res.users);
            }
            )
            .catch(handleUserLoadingError);
    };

    const handleUserLoadingError = (res) => {
        if (res.error === 401) {
            navigation.navigate('Login');
        } else {
            setHasLoadedUsers(false);
            setUserLoadingErrorMessage(res.message);
        }
    }

    const logOut = async () => {
        await setToken('');
        navigation.navigate('Login');
    };

    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HomeScreen</Text>
            {users.map((user) => (
                <Text key={user.email}>{user.email}</Text>
            ))}
            <Button title="Log out" onPress={() => logOut()} />
        </View>
    );
};

export default HomeScreen;