export function dispatchRoute(controller) {
    if (controller !== Object(controller) || !controller.hasOwnProperty('view') || typeof controller.init !== 'function') {
        return console.warn('Contrôleur invalide :', controller);
    }

    //Si le controller n'a pas de view
    if (controller.view === null) {
        return controller.init();
    }


    return fetch(`views/${controller.view}`)
        .then(res => res.text())
        .then(htmlText => {
            document.getElementsByTagName('main')[0].innerHTML = htmlText;
            controller.init();
        });
}

export function setLogguedMode(user) {
    const menuloggued = document.getElementById('menu-loggued');
    document.getElementById('navbarContent').innerHTML = menuloggued.innerHTML;
}

export function setUnLogguedMode() {
    const menuUnloggued = document.getElementById('menu-unloggued');
    document.getElementById('navbarContent').innerHTML = menuUnloggued.innerHTML;
}