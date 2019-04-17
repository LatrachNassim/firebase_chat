import store from '../scripts/store.js'



export default class Chat {
    
    constructor(router) {
        this.router = router;
        this.view = 'chat.html';

        this.user = null;
        this.messages = [];
    }

    init() {
        console.log('CHAT !');
        

                    
        //definition de l'utilisateur
        this.user = store.getState().user;

        //Si il n'y a pas d'utilisateur
        if (!this.user) {
            this.router.navigateTo('/');
            return;
        }

        // Affichage de la page
        const wrapper = document.getElementById("wrapper");
        wrapper.classList.remove("d-none");
        wrapper.getElementsByTagName("h1")[0].textContent = `Bienvenue ${this.user.firstname} ${this.user.lastname}`;

        this.initChat();

    }

    initChat() {
        // Initialisation des gestionnaire d'événement du chat
        document.getElementById('addMessage').addEventListener('submit', this.onAddMessage.bind(this), false);

        firebase.database().ref('/messages').limitToLast(15).on('value', snapshot => {
            this.messages.length = 0; // Vide le tableau
            snapshot.forEach(item => {
                this.messages.push(item.val());
            });
            this.messages = this.messages.reverse();
            this.renderMessages();
        });

    }

    // A chaque fois que l'utilisateur envoie un message...
    onAddMessage(event) {
        event.preventDefault();

        const messageEl = document.getElementById("message");
        const { firstname, lastname } = this.user;

        if (!messageEl.value) return;

        firebase.database().ref('/messages').push({
            pseudo: `${firstname} ${lastname}`,
            message: messageEl.value,
            date: Date.now(),
        });

        messageEl.value = ''; // Vide le champs <input>

        

        this.renderMessages();
    }

    renderMessages() {
        const ul = document.getElementById('messages');
        ul.innerHTML = this.messages.map(message => `<li class="list-group-item d-flex align-items-start">
                                                        <img class="rounded" src="//gradientjoy.com/40x40" style="width:40px;" />
                                                        <div class="d-flex w-100 flex-column align-items-start ml-2">
                                                            <span class="badge badge-dark mr-1">${message.pseudo}</span>
                                                            ${message.message}
                                                        </div>
                                                        <span class="ml-auto badge badge-light">${new Date(message.date).toLocaleString()}</span>
                                                    </li>`).join('');
    }
}