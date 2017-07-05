(function (window) {
    'use strict';

    // Create asynchronous connection object
    const ajax = new XMLHttpRequest;

    // XMLHttpRequest.open(method, url)
    // XMLHttpRequest.open(method, url, async)
    // XMLHttpRequest.open(method, url, async, user)
    // XMLHttpRequest.open(method, url, async, user, password)
    ajax.open('GET', 'data.txt');

    // Request to server
    ajax.send(null);

    ajax.onreadystatechange = callbackCommunication;
    // readyState
        // 0: unset
        // 1: opened
        // 2: headers received
        // 3: loading
        // 4: done

    // Callback event function for asynchronous connection
    function callbackCommunication() {
        console.log(arguments);

        console.log(`XHR status is : ${ajax.status}`);

        if (ajax.status === 200 && ajax.readyState === 4) {
            console.log(`Success`);
            console.log(`Requested data : ${ajax.responseType}`);
            console.log(`Requested data : ${ajax.responseURL}`);
            console.log(`Requested data : ${ajax.responseText}`);
            console.log(`Requested data : ${ajax.response}`);

        }
        if (ajax.status === 404) {
            console.log('Not found');
            console.log(`Requested data : ${ajax.responseType}`);
            console.log(`Requested data : ${ajax.responseURL}`);
            console.log(`Requested data : ${ajax.responseText}`);
            console.log(`Requested data : ${ajax.response}`);
        }
    }
})(window);