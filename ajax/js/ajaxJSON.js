{
    let xhr = null;
    let print_btn = document.querySelector('.print-ajax-btn');
    let data_zone = document.querySelector('.data-zone');
    let data_url = 'people.json';
    // let data_url = 'https://randomuser.me/api/?results=10';

    // Request
    let renderAjaxData = () => {
        xhr = new XMLHttpRequest;
        xhr.onreadystatechange = printAjaxData;
        xhr.open('GET', data_url);
        xhr.send(null);

        // Remove event listener OR just disable the button
        // print_btn.removeEventListener('click', renderAjaxData, true);
        print_btn.setAttribute('disabled', 'disabled');
    };


    // Response
    let printAjaxData = () => {

        if (xhr.status === 200 && xhr.readyState === 4) {

            const dataCollection = [];
            JSON.parse(xhr.responseText).forEach(function (user, index) {
                dataCollection.push({
                    name: user.name,
                    gender: user.gender === 'female' ? '여성' : '남성',
                    email: user.email
                });
            });

            data_zone.innerHTML = renderTable(dataCollection);


            console.log(dataCollection);

        } else if (xhr.status > 400) {
            data_zone.innerHTML = "Connection Failed";
            data_zone.style.cssText = 'color: #ef1a62;';
            window.setTimeout(function () {
                data_zone.removeAttribute('style');
            }, 1500);
        }
        // Loading effect when status 200 is not active
        else {
            data_zone.innerHTML = '\
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"><i>\
            <span class="sr-only">Loading...</span>\
            ';
        }
    };

    let renderTable = collection => {
        let printTemplate = `<table class="table"><tbody class="tbody">`;

        collection.forEach(function (user, index) {
            let n = index + 1;
            n = n < 10 ? '0' + n : n;

            printTemplate += `
                <tr class="tr">
                    <td class="td num">${n}</td>
                    <td class="td name">${user.name}</td>
                    <td class="td gender">${user.gender}</td>
                    <td class="td email">${user.email}</td>
                    <td class="td etc"></td>
                </tr>
            `;

        });

        printTemplate += `</tbody></table>`;

        return printTemplate;
    }

    print_btn.addEventListener('click', renderAjaxData, true);
}