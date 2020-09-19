import {RNKeycloak} from '@react-keycloak/native';

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloak = new RNKeycloak({
    url: 'http://192.168.8.100:8080/auth',
    realm: 'master',
    clientId: 'ncell'
});

export default keycloak;
