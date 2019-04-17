import store from '../scripts/store.js';

export default class Sign {
    
    constructor(router) {
        this.router = router;
        this.view = 'sign.html';
    }

    init() {
        console.log('HOME !');

        document.getElementById('login').addEventListener('submit', this.onSubmitLogin.bind(this), false);
        document.getElementById('signin').addEventListener('submit', this.onSubmitSignin.bind(this), false);
        document.getElementById('google').addEventListener('click', this.onGoogle.bind(this), false);
        //document.getElementById('twitter').addEventListener('click', this.onTwitter.bind(this), false);
        document.getElementById('github').addEventListener('click', this.onGithub.bind(this), false);
    }

    onSubmitLogin(event) {
        event.preventDefault();// Empêche le navigateur de recharger la page

        const email            = document.getElementById('login_email').value;
        const password         = document.getElementById('login_password').value;
       
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredentials => firebase.firestore().collection('users').doc(userCredentials.user.uid).get())
            .then(userDoc => {
                userDoc = userDoc.data();
                console.log('Connecté !', userDoc);

                store.setState({ user: userDoc });
                this.router.navigateTo('/chat');
        
            })
            .catch(error => this.displayError(error + '\n' + error.message));
        
    }

    onSubmitSignin(event) {
        event.preventDefault();

        const firstname        = document.getElementById('signin_firstname').value;
        const lastname         = document.getElementById('signin_lastname').value;
        const email            = document.getElementById('signin_email').value;
        const password         = document.getElementById('signin_password').value;
        const password_confirm = document.getElementById('signin_password_confirm').value;
        const avatar           = document.getElementById('signin_avatar').files[0];

        console.log(firstname, lastname, email, password, password_confirm, avatar);

        const storageRef = firebase.storage().ref()
            .then((userCredentials) => firebase.firestorage().collection('users').doc(userCredentials.user.uid).set({ firstname, lastname, email }))
            .catch(error => {
                this.displayError(error.code + '\n' + error.message);
            });
        


        if (password != password_confirm){
            return this.displayError('Les mots de passe ne correspondent pas');
            
            return;
        }
        // Tentative de création de compte de firebase
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => firebase.firestore().collection('users').doc(userCredentials.user.uid).set({ firstname, lastname, email }))
            .then(() =>    this.router.navigateTo('/chat'))
            .catch(error => {
                this.displayError(error.code + '\n' + error.message);
            });
    }

    onGoogle(event) {
        event.preventDefault();

        console.log('Google !');

    }

    /*onTwitter(event) {
        event.preventDefault();

        console.log('Twitter !');

    }*/

    onGithub(event) {
        event.preventDefault();

        console.log('Github !');

    }
    displayError(errorMessage) {
        let error = document.getElementById('error');
            error.classList.remove('d-none');
            error.textContent = errorMessage;


    }
}