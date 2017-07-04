{
    let xhr = null;
    let print_btn = document.querySelector('.print-ajax-btn');
    let data_zone = document.querySelector('.data-zone');
    let data_url = 'responseResult.html';

    // Request
    let renderAjaxData = () => {
        xhr = new XMLHttpRequest;
        xhr.onreadystatechange = printAjaxData;
        xhr.open('GET', data_url);
        xhr.send(null);

        // Remove event listener OR just disable the button
        print_btn.removeEventListener('click', renderAjaxData, true);
        // print_btn.setAttribute('disabled', 'disabled');
    };


    // Response
    let printAjaxData = () => {

        if (xhr.status === 200 && xhr.readyState === 4) {

            console.log(xhr.status);
            console.log(xhr.readyState);
            
            data_zone.innerHTML = rederDataBinding(xhr); // innerText 로 html 값들을 받으면, 렌더링 되지 않고 html 코드가 나옴

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

    let rederDataBinding = (xhr) => {
        let status = xhr.status;
        let url = xhr.responseURL;
        let type = xhr.responseType;
        let text = xhr.responseText;

        let frag = document.createDocumentFragment();
        let frag_root = document.createElement('div');
        frag.appendChild(frag_root);
        frag_root.innerHTML = text;

        frag_root.querySelector('.status').textContent = status;
        frag_root.querySelector('.url').textContent = url;
        frag_root.querySelector('.type').textContent = type === '' ? 'HTML' : '';
        frag_root.querySelector('.code').textContent = text;

        return frag_root.innerHTML;
    }
    print_btn.addEventListener('click', renderAjaxData, true);
}