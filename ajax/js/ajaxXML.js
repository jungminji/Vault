{
    let xhr = null;
    let print_btn = document.querySelector('.print-ajax-btn');
    let data_zone = document.querySelector('.data-zone');
    let data_url = 'user.xml';

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

            let doc = xhr.responseXML;
            const dataCollection = [];

            let results = doc.querySelectorAll('user > results');
            [].forEach.call(results, function (result) {

                let name = {
                    first: result.querySelector('name > first').textContent,
                    last: result.querySelector('name > last').textContent
                };
                let email = result.querySelector('email').textContent;
                let gender = result.querySelector('gender').textContent;
                let user = {
                    name: `${name.first} ${name.last}`,
                    email,
                    gender
                };
                dataCollection.push(user);
            });

            data_zone.innerHTML = renderTable(dataCollection);

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

        let renderTemplate = document.querySelector('#user-table-template').innerHTML;
        // console.log(renderTemplate);
        let tbody = renderTemplate.split('<tbody></tbody>');
        let printTemplate = `${tbody[0]}<tbody class="tbody">`;

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

        printTemplate += `</tbody>${tbody[1]}`;

        return printTemplate;
    }

    print_btn.addEventListener('click', renderAjaxData, true);
}