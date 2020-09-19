/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {ReactNativeKeycloakProvider, RNKeycloak} from '@react-keycloak/native';

const App: () => React$Node = () => {
    const keycloak = new RNKeycloak({
        url: 'http://192.168.8.100:8080/auth',
        realm: 'master',
        clientId: 'ncell'
    });
    const userDetail = useCallback(async () => {
        console.log(keycloak.authenticated);
        console.log(keycloak.token);
        if(keycloak.idTokenParsed)
        console.log(keycloak.idTokenParsed.preferred_username);
    });
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header/>
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>

                        <ReactNativeKeycloakProvider
                            authClient={keycloak}
                            initOptions={{
                                redirectUri: 'ncell://login',
                                inAppBrowserOptions: {
                                    enableUrlBarHiding: true,
                                    showTitle: false
                                }
                            }}>

                            <Button onPress={() => keycloak?.login()} title="LOGIN" style={styles.buttonSample}/>
                            <Button onPress={() => keycloak?.logout()} title="LOGOUT" style={styles.buttonSample}/>
                        </ReactNativeKeycloakProvider>

                        <Button onPress={userDetail} title="TOKEN" style={styles.buttonSample}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
        margin: 10
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    buttonSample: {
        marginBottom: 30,
        margin: 20
    }
});

export default App;
