import { setUnLogguedMode } from '../scripts/functions.js'
import store from '../scripts/store.js';

export default class Logout {

    constructor(router) {
        this.router = router;
        this.view = null;
    }

    init() {
        console.log('LOGOUT !');

        firebase.auth().signOut().then(() => {
            setUnLogguedMode();

            store.setState({ user: null })

            this.router.navigateTo('/')
        });
    }
}