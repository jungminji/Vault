(function (window, $) {
    'use strict';

    let dataPath = 'people.lib.json';
    let printBtn = document.querySelector('.print-ajax-btn');
    let dataZone = document.querySelector('.data-zone');



    // Request
    let request = () => {
        $.get('people.lib.json', function (dataPath) {
            let data = $.parse(dataPath);

            dataZone.innerHTML = renderHTML(data);

        }, function (dataPath) {
            if (!dataPath) {
                'Connection Failed';
            }
        });
    }

    // Response
    let renderHTML = data => {

        let result = data.results;
        let markUp = '';
        // let toPrint = [];

        // Info
        [].forEach.call(result, function (item, index) {
            let name = `${item.name.first} ${item.name.last}`;
            let username = `${item.login.username}`;
            let email = `${item.email}`;
            let date = `${item.registered}`;
            let pictureThumbnail = `${item.picture.thumbnail}`;

            markUp += `
                <div class="card">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="${pictureThumbnail}" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${name}</p>
                        <p class="subtitle is-6">@${username}</p>
                    </div>
                    </div>

                    <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@${username}</a>.
                    <a>#css</a> <a>#responsive</a>
                    <br>
                    <small>${date}</small>
                    </div>
                </div>
                </div>
             `;

        });
        return markUp;
    }

    printBtn.addEventListener('click', request, true);

})(window, window.FDS);