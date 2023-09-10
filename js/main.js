let submitBt = document.getElementById("submitBt");
let nameTouch = false;
let emailTouch = false;
let phoneTouch = false;
let ageTouch = false;
let passwordTouch = false;
let repasswordTouch = false;

getTrending('Now Playing');
function openSideBar() {
    $(".sidemenu").animate({left: 0}, 500)
    $(".open").removeClass("fa-align-justify");
    $(".open").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: 0}, (i + 8) * 100)
    }
}

function closeSideBar() {
    let width = $(".sidemenu .sideBar").outerWidth()
    $(".sidemenu").animate({left: -width}, 500)
    $(".open").addClass("fa-align-justify");
    $(".open").removeClass("fa-x");
    $(".links li").animate({top: 300}, 500)
}

closeSideBar()

$(".nav-header i.open").click(() => {
    if ($(".sidemenu").css("left") == "0px") {
        closeSideBar()
    } else {
        openSideBar()
    }
})

let data = []

async function getTrending(category) {
    let https = ''

    if (category === 'Now Playing') {
        https = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        console.log('Now Playing')
    } else if (category === 'Popular') {
        https = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        console.log('Popular')
    } else if (category === 'Top Rated') {
        https = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        console.log('Top Rated')
    } else if (category === 'Trends') {
        https = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        console.log('Trends')
    } else if (category === 'Upcoming') {
        https = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        console.log('Upcoming')
    } else if (category === 'Search') {
        https = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=text`)
        console.log('Search')
    }


    response = await https.json()
    data = response.results
    // console.log(data[0].poster_path);
    displayTrends(data)
}

function displayTrends(arr) {
    var cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-4">
        <div class="movie rounded-2">
                    <div class="image">
                        <img class="w-100" src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}" alt="">
                    </div>
                    <div class="movieLayer text-white p-2">
                        <div class="">
                        <h1 class="text-center py-2  ">${arr[i].title}</h1>
                        <p class="">${arr[i].overview}</p>
                        <span class="">${arr[i].release_date}</span>
                        <div class="d-flex">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
    `

    }

    document.getElementById("rowData").innerHTML = cartona


}

document.getElementById("nameInput").addEventListener("focus", ()=>{
    nameTouch = true
})
document.getElementById("emailInput").addEventListener("focus", ()=>{
    emailTouch = true
})
document.getElementById("phoneInput").addEventListener("focus", ()=>{
    phoneTouch = true
})
document.getElementById("ageInput").addEventListener("focus", ()=>{
    ageTouch = true
})
document.getElementById("passwordInput").addEventListener("focus", ()=>{
    passwordTouch = true
})
document.getElementById("repasswordInput").addEventListener("focus", ()=>{
    repasswordTouch = true
})

function validation(){
    
    if(nameTouch){
        if(nameValidation()){
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        }
        else{
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    
        }
    }

    if(emailTouch){
        if(emailValidation()){
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        }
        else{
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    
        }
    }

    if(phoneTouch){
        if(phoneValidation()){
        document.getElementById("numberAlert").classList.replace("d-block", "d-none")
    }
    else{
        document.getElementById("numberAlert").classList.replace("d-none", "d-block")

    }
    }

    if(ageTouch){
        if(ageValidation()){
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        }
        else{
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    
        }
    }
    
    if(passwordTouch){
        if(passwordValidation()){
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        }
        else{
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    
        }
    }

    if(repasswordTouch){
        if(repasswordValidation()){
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        }
        else{
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    
        }
    }

    

    if(nameValidation() && 
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()){
        submitBt.removeAttribute("disabled")
    }
    else{
        submitBt.setAttribute("disabled", true)
    }


}

function nameValidation(){
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation(){
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function phoneValidation(){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation(){
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation(){
    return (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation(){
    return document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value
}