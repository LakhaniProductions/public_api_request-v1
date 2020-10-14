const apiURL = "https://randomuser.me/api/?nat=us&results=12";
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');


function getJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if(xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            return callback(data);
        }
    };
    xhr.send();
}

getJSON(apiURL,generateHTML);

let form = document.createElement('form');
form.setAttribute('action', '#');
form.setAttribute('method','get');

let inputSearch=document.createElement('input');
inputSearch.setAttribute('type', 'search');
inputSearch.setAttribute('id', 'search-input');
inputSearch.setAttribute('class', 'search-input');
inputSearch.setAttribute('placeholder', 'Search...');

let inputSubmit=document.createElement('input');
inputSubmit.setAttribute('type', 'submit');
inputSubmit.setAttribute('value', '🔍');
inputSubmit.setAttribute('class', 'search-submit');
inputSubmit.setAttribute('id', 'search-submit');

search.appendChild(form);
form.appendChild(inputSearch);
form.appendChild(inputSubmit);

function generateHTML(data) {
   
    for(let i=0; i<data.results.length; i++){
        //Creation and naming of attributes of elements 
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class', 'card');
        let imgCont = document.createElement('div');
        imgCont.setAttribute('class','card-img-container');
        let randomUser= data.results[i];
        let userImg= randomUser.picture.large;
        let imgElement= document.createElement('img');
        imgElement.setAttribute('class', 'card-img');
        imgElement.setAttribute('src', userImg);
        imgElement.setAttribute('alt', 'profile picture');
        let infoCont= document.createElement('div');
        infoCont.setAttribute('class', 'card-info-container');
        let caption=document.createElement('h3');
        caption.setAttribute('id', 'name');
        caption.setAttribute('class', 'card-name cap');
        let firstName= randomUser.name.first;
        let lastName= randomUser.name.last;
        caption.textContent = firstName + ' ' + lastName;
        let email= document.createElement('p');
        email.setAttribute('class', 'card-text');
        email.textContent= randomUser.email;
        let location= document.createElement('p');
        location.setAttribute('class', 'card-text cap');
        let city= randomUser.location.city;
        let state= randomUser.location.state;
        location.textContent= city + ', ' + state; 
        console.log(randomUser.cell);
        
        //Appending Elements To Card
        gallery.appendChild(cardDiv);
        cardDiv.appendChild(imgCont);
        imgCont.appendChild(imgElement); 
        cardDiv.appendChild(infoCont);
        infoCont.appendChild(caption);
        infoCont.appendChild(email);
        infoCont.appendChild(location);

        function filterUsers(event){
            if (event === ""){
                cardDiv.style.background= 'rgba(245, 245, 245, 0.9)';
                imgCont.style.opacity='1';
                infoCont.style.opacity='1';   
                cardDiv.style.pointerEvents='auto';
                cardDiv.style.border='1px solid rgba(50, 50, 50, 0.3)';
                cardDiv.style.boxShadow= 'none';
                newData=[];
            } else if(cardDiv.childNodes[1].childNodes[0].textContent.toLowerCase().includes(event.toLowerCase()) && event !== ""){
                cardDiv.style.background= 'rgba(152, 251, 152, 0.9)';
                cardDiv.style.border='1px solid rgba(50, 50, 50, 0.3)';
                cardDiv.style.boxShadow= '5px 10px 15px rgba(33, 34, 34, 0.1)';
                imgCont.style.opacity='1';
                infoCont.style.opacity='1'; 
            } else {
                cardDiv.style.background= 'rgba(245, 245, 245, 0.2)';
                cardDiv.style.pointerEvents='none';
                cardDiv.style.border='none';
                imgCont.style.opacity='.2';  
                infoCont.style.opacity='.2';     
                cardDiv.style.boxShadow= 'none';
            }
        }

        inputSearch.addEventListener('keyup', (e) => {
           filterUsers(e.target.value)
        });

        inputSearch.addEventListener('search', e =>{
            cardDiv.style.background= 'rgba(245, 245, 245, 0.9)';
            imgCont.style.opacity='1';
            infoCont.style.opacity='1';   
            cardDiv.style.pointerEvents='auto';
            cardDiv.style.border='1px solid rgba(50, 50, 50, 0.3)';
            cardDiv.style.boxShadow= 'none';
        });
        
        function generateModal(){
           
            
            let modalCont= document.createElement('div');
            modalCont.setAttribute('class', 'modal-container');
            let modal= document.createElement('div');
            modal.setAttribute('class', 'modal');
            let modalBtn= document.createElement('button');
            modalBtn.setAttribute('type', 'button');
            modalBtn.setAttribute('id', 'modal-close-btn');
            modalBtn.setAttribute('class', 'modal-close-btn');
            modalBtn.setAttribute('name', `${i}`);
            modalBtn.innerHTML=`<strong style="pointer-events:none">X</strong>`;

            let modalInfoCont = document.createElement('div');
            modalInfoCont.setAttribute('class', 'modal-info-container');
            let modalImg= document.createElement('img');
            modalImg.setAttribute('class', 'modal-img');
            modalImg.setAttribute('src', userImg);
            modalImg.setAttribute('alt', 'profile picture');
            let modalCaption = document.createElement('h3');
            modalCaption.setAttribute('id', 'name');
            modalCaption.setAttribute('class', 'modal-name cap');
            modalCaption.textContent= firstName + ' ' + lastName;
            let modalEmail= document.createElement('p');
            modalEmail.setAttribute('class', 'modal-text');
            modalEmail.textContent= randomUser.email;
            let modalCity= document.createElement('p');
            modalCity.setAttribute('class', 'modal-text cap');
            modalCity.textContent= randomUser.location.city;
            let hr=document.createElement('hr');
            let modalNumber= document.createElement('p');
            modalNumber.setAttribute('class', 'modal-text');
            
            modalNumber.textContent= formatNum(randomUser.cell);
            function formatNum(numb) {
                var cleaned = ('' + numb).replace(/\D/g, '')
                var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
                if (match) {
                  return '(' + match[1] + ') ' + match[2] + '-' + match[3]
                }
                return null
            }
            let modalAddress= document.createElement('p');
            modalAddress.setAttribute('class', 'modal-text');
            modalAddress.textContent= randomUser.location.street.number + ' ' + randomUser.location.street.name  +  ', ' + randomUser.location.city + ', ' + randomUser.location.state + ' ' + randomUser.location.postcode;
            let date = new Date(randomUser.dob.date);
            let modalBirthDate= document.createElement('p');
            modalBirthDate.setAttribute('class', 'modal-text');
            modalBirthDate.textContent= 'Birthday: '+ (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();
            
    
            let modalBtnCont= document.createElement('div');
            modalBtnCont.setAttribute('class', 'modal-btn-container');

            let prevBtn= document.createElement('button');
            prevBtn.setAttribute('type', 'button');
            prevBtn.setAttribute('id', 'modal-prev');
            prevBtn.setAttribute('class', 'modal-prev btn');
            prevBtn.textContent='Prev';
            let nextBtn= document.createElement('button');
            nextBtn.setAttribute('type', 'button');
            nextBtn.setAttribute('id', 'modal-next');
            nextBtn.setAttribute('class', 'modal-next btn');
            nextBtn.textContent='Next';

            //Appending Elements To Modal 
            document.body.appendChild(modalCont);
            modalCont.appendChild(modal);
            modal.appendChild(modalBtn);
            modal.appendChild(modalInfoCont);
            modalInfoCont.appendChild(modalImg);
            modalInfoCont.appendChild(modalCaption);
            modalInfoCont.appendChild(modalEmail);
            modalInfoCont.appendChild(modalCity);
            modalInfoCont.appendChild(hr);
            modalInfoCont.appendChild(modalNumber);
            modalInfoCont.appendChild(modalAddress);
            modalInfoCont.appendChild(modalBirthDate);
            modalCont.appendChild(modalBtnCont);
            modalBtnCont.appendChild(prevBtn);
            modalBtnCont.appendChild(nextBtn);
            
            function modalClose(event){
                modalCont.remove();
                randomUser = data.results[i =parseInt(event)];
            
                userImg= randomUser.picture.large;
                firstName= randomUser.name.first;
                lastName= randomUser.name.last;

                modalEmail.textContent= randomUser.email;
                modalCity.textContent= randomUser.location.city;
                modalNumber.textContent= randomUser.cell;
                modalAddress.textContent= randomUser.location.street.number + ' ' + randomUser.location.street.name  +  ', ' + randomUser.location.city + ', ' + randomUser.location.state + ' ' + randomUser.location.postcode;
                modalBirthDate.textContent= 'Birthday: '+ (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();

                modalInfoCont.appendChild(modalImg);
                modalInfoCont.appendChild(modalCaption);
                modalInfoCont.appendChild(modalEmail);
                modalInfoCont.appendChild(modalCity);
                modalInfoCont.appendChild(modalNumber);
                modalInfoCont.appendChild(modalAddress);
                modalInfoCont.appendChild(modalBirthDate);
            }
            function btnRmv(){
                if(i===0){
                    prevBtn.remove();
                } else if(i===11){
                    nextBtn.remove();
                }
            }
            btnRmv();
            function navigateBtn(counter, increment, event){
                
                if (i === counter ){
                    randomUser = data.results[counter];
                } else if(i !== counter){
                    modalCont.remove()
                    modal.remove();
                    modalBtnCont.remove();

                    if (event.toLowerCase() === 'prev') {
                        randomUser = data.results[i -= increment];
                    } else {
                        randomUser = data.results[i += increment];
                    }
                    let date = new Date(randomUser.dob.date);
                    
                    userImg= randomUser.picture.large;
                    firstName= randomUser.name.first;
                    lastName= randomUser.name.last;

                    modalImg.setAttribute('src', userImg);
                    modalCaption.textContent= firstName + ' ' + lastName;
                    modalEmail.textContent= randomUser.email;
                    modalCity.textContent= randomUser.location.city;
                    modalNumber.textContent= formatNum(randomUser.cell);
                    modalAddress.textContent= randomUser.location.street.number + ' ' + randomUser.location.street.name  +  ', ' + randomUser.location.city + ', ' + randomUser.location.state + ' ' + randomUser.location.postcode;
                    modalBirthDate.textContent= 'Birthday: '+ (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear();

                    document.body.appendChild(modalCont);
                    modalCont.appendChild(modal);
                    modalCont.appendChild(modalBtnCont);
                    modalBtnCont.appendChild(prevBtn);
                    modalBtnCont.appendChild(nextBtn);
                }     

                btnRmv();
            };

            modalBtn.addEventListener('click', e => {
                modalClose(e.target.name);
            });

            prevBtn.addEventListener('click', e => {
                navigateBtn(0,1,e.target.textContent);
                
            });

            nextBtn.addEventListener('click', e => {
                navigateBtn(11,1,e.target.textContent);
            });

        }
        //Modal Creation
        cardDiv.addEventListener('click', e => {
            generateModal(); 
        });
    }
};

























