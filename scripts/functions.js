export function dispatchRoute(controller) {
    if (controller !== Object(controller) || !controller.hasOwnProperty('view') || typeof controller.init !== 'function') {
        return console.warn('Contrôleur invalide :', controller);
    }

    return fetch(`views/${controller.view}`)
            .then(res => res.text())
            .then(htmlText => {
                document.getElementsByTagName('main')[0].innerHTML = htmlText;
                controller.init();
            });
}