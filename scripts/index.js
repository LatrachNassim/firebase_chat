import config from './config.js';

import store from './store.js';
import { dispatchRoute, setLogguedMode, setUnLogguedMode } from "./functions.js";

import Logout from '../controllers/Logout.js';
import Sign from '../controllers/Sign.js';
import Chat from '../controllers/Chat.js';

firebase.initializeApp(config);

const router = new Router({
    mode: 'hash'
});

router.add('/', () => dispatchRoute(new Sign(router)));
router.add('/chat', () => dispatchRoute(new Chat(router)));

router.addUriListener();
router.check();
router.add('/logout', () => dispatchRoute(new Logout(router)));

//Par defaut, on est non-logguer
setUnLogguedMode();

firebase.auth().onAuthStateChanged(user => {
    if (!user) return;
    firebase.firestore().collection('users').doc(user.uid).get().then(user => {
        user = user.data();

        // Mise à jour  du state
        store.setState({ user });

        // Passage en mode loggué
        setLogguedMode(user);

        // Redirection vers la page de chat
        router.navigateTo('/chat');
    });

});

