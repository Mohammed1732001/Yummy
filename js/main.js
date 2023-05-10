let rowData = document.getElementById("rowData");
let searchContanier = document.getElementById("searhContanier");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow","visible")
    })

})
closeSideNAv()
function openSideNav() {
    $(".side-nav-menu ").animate({ left: 0 }, 500)
    $(".open-close-icon").removeClass("fa-align-justify")
    $(".open-close-icon").addClass("fa-x")


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 6) * 100)

    }

}
function closeSideNAv() {
    let boxWidht = $(".side-nav-menu .nav-tab").outerWidth()


    $(".side-nav-menu ").animate({ left: -boxWidht }, 500)
    $(".open-close-icon").addClass("fa-align-justify")
    $(".open-close-icon").removeClass("fa-x")
    $(".links li").animate({ top: 300 }, 500)
}
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu ").css('left') == "0px") {
        closeSideNAv()
    } else {
        openSideNav()

    }
})
async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s= ${term}`)
    response = await response.json()
    displayMeal(response.meals);
}
function displayMeal(arr) {
    closeSideNAv()
    searchContanier.innerHTML = ""
    let meal = "";
    for (let i = 0; i < arr.length; i++) {
        meal += `
    <div class="col-md-3">
            <div onclick="getMealDiiteals(${arr[i].idMeal})" class="meal overflow-hidden coursor-poiner rounded-3  position-relative">
                <img class="w-100"
                    src="${arr[i].strMealThumb}" alt="">
                <div class="meal-layer p-2 d-flex align-items-center position-absolute">
                    <h3> ${arr[i].strMeal}</h3>
                </div>
            </div>

        </div>
    
     `

    }
    rowData.innerHTML = meal;
}
searchByName("")
async function getCatagrios() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCatagrios(response.categories)
}
function displayCatagrios(arr) {
    searchContanier.innerHTML = ""
    let meal = "";
    for (let i = 0; i < arr.length; i++) {
        meal += `
    <div class="col-md-3">
            <div onclick="getCatogryMeals('${arr[i].strCategory}')" class="meal coursor-poiner overflow-hidden rounded-3  position-relative">
                <img class="w-100"
                    src="${arr[i].strCategoryThumb}" alt="">
                <div class="meal-layer p-2 text-center position-absolute">
                    <h3> ${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>

        </div>
    
     `

    }


    rowData.innerHTML = meal

}
async function getArea() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response.meals);
    displayArea(response.meals)
}
function displayArea(arr) {
    searchContanier.innerHTML = ""
    let meal = "";
    for (let i = 0; i < arr.length; i++) {
        meal += `
    <div class="col-md-3">
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="  coursor-poiner rounded-3  ">
                <i class="fa-solid fa-4x text-danger fa-house-chimney-user"></i>    
                <h3> ${arr[i].strArea}</h3>
            </div>

        </div>
     `
    }
    rowData.innerHTML = meal
}
async function getIngrident() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log(response.meals);
    displayIngrident(response.meals.slice(0, 20))
}
function displayIngrident(arr) {

    searchContanier.innerHTML = ""
    let meal = "";
    for (let i = 0; i < arr.length; i++) {
        meal += `
    <div class="col-md-3">
            <div  onclick="getIntilgentMeals('${arr[i].strIngredient}')" class=" rounded-3 text-center coursor-poiner ">
            <i class="fa-solid fa-utensils fa-3x text-danger  "></i>    
                <h3> ${arr[i].strIngredient}</h3>
                <p> ${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>

        </div>
     `
    }
    rowData.innerHTML = meal
}
async function getCatogryMeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeal(response.meals)
}
async function getAreaMeals(Area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    response = await response.json()
    displayMeal(response.meals)
}
async function getIntilgentMeals(Intilgent) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Intilgent}`)
    response = await response.json()
    displayMeal(response.meals)
}
async function getMealDiiteals(mealID) {
    searchContanier.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    response = await response.json()
    displayMealDiiteals(response.meals[0])
}
function displayMealDiiteals(meal) {
    closeSideNAv()
    searchContanier.innerHTML = ""
    let Intilgent = ``
    for (let i = 0; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {

            Intilgent += `<li class=" alert m-2 p-1 alert-info">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }

    }
    let tag = meal.strTags?.split(",")
    if (!tag) tag = []
    let tagStr = ``

    for (i = 0; i < tag.length; i++) {
        tagStr = `
    <li class=" alert m-2 p-1 alert-danger ">${tag[i]}</li>
    `
    }
    let cartona = `

<div class="col-md-4">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>instrition</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bold">Area :</span>${meal.strArea}</h3>
                <h3><span class="fw-bold">category :</span> ${meal.strCategory} </h3>
                <h3>Recipes : </h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
             ${Intilgent}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
          
          ${tagStr}
                </ul>
                <a target="_blank" class="btn btn-success" href="${meal.strSource}"> source</a>
                <a  target="_blank" class="btn btn-danger" href="${meal.strYoutube}"> youtube</a>
            </div>
`

    rowData.innerHTML = cartona
}
function showSearchData() {
    searchContanier.innerHTML = `<div class="row py-3 ">
<div class="col-md-6">
    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-light" placeholder="search by Name" type="text">
</div>
<div class="col-md-6">
    <input onkeyup="searchByleter(this.value)" class="form-control bg-transparent text-light " placeholder="search by frist latter" type="text">
</div>
</div> `
    rowData.innerHTML = ""
}
async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeal(response.meals) : displayMeal([])
}
async function searchByleter(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeal(response.meals) : displayMeal([])
}

function showContact() {
    searchContanier.innerHTML = ""
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex  justify-content-center align-items-center ">
    <div class="container text-center w-75">
        <div class="row g-3 ">
            <div class="col-md-6">
                <input id="nameInput" onKeyup="inputsValidtion()"
                    class="form-control bg-transparent text-light " placeholder="Enter Name" type="text">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    <p> special charcters and number allowed </p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onKeyup="inputsValidtion()"
                    class="form-control bg-transparent text-light " placeholder="Enter email" type="email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        <p> Email not valid *exemple@yyy.com </p>
                    </div>                        
                </div>
            <div class="col-md-6">
                <input id="phoneInput" onKeyup="inputsValidtion()"
                    class="form-control bg-transparent text-light " placeholder="Enter phone" type="number">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        <p> Enter valied phone number </p>
                    </div>
                </div>
            <div class="col-md-6">
                <input id="ageInput" onKeyup="inputsValidtion()"
                    class="form-control bg-transparent text-light " placeholder="Enter Age" type="number">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        <p> Enter valid Age </p>
                    </div>
                </div>
            <div class="col-md-6">
                <input id="passwordInput" onKeyup="inputsValidtion()"
                    class="form-control bg-transparent text-light " placeholder="Enter password"type="password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        <p> Enter valid password "minumm 8 charcters at lest 1 later and one number" </p>
                    </div>
                </div>

            <div class="col-md-6">
                <input id="rePasswordInput" onKeyup="inputsValidtion()"
                    class="form-control bg-transparent text-light " placeholder="Enter Repassword"type="password">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        <p> Enter valied password </p>
                    </div>
                </div> 
        </div>
        <button disabled id="submitBtn" class="btn btn-outline-danger p-2 mt-3">Submit</button>
    </div>
</div>`
    submitBtn = document.getElementById("submitBtn")



    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("rePasswordInput").addEventListener("focus", () => {
        rePasswordInputTouched = true
    })

}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function inputsValidtion() {

    if (nameInputTouched) {
        if (nameValidtion()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }

    }
    if (emailInputTouched) {
        if (emailValidtion()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }

    }
    if (phoneInputTouched) {
        if (phoneValidtion()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }

    }
    if (ageInputTouched) {

        if (ageValidtion()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }

    }
    if (passwordInputTouched) {
        if (passwordValidtion()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        }

    }
    if (rePasswordInputTouched) {

        if (rePasswordValidtion()) {
            document.getElementById("rePasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("rePasswordAlert").classList.replace("d-none", "d-block")
        }

    }
    if (nameValidtion() &&
        emailValidtion() &&
        phoneValidtion() &&
        ageValidtion() &&
        passwordValidtion() &&
        rePasswordValidtion()) {
        submitBtn.removeAttribute("disabled ")
    } else {
        submitBtn.setAttribute("disabled ", true)
    }

}
function nameValidtion() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))

}
function emailValidtion() {
    return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(document.getElementById("emailInput").value))

}
function phoneValidtion() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))

}
function ageValidtion() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))

}
function passwordValidtion() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))

}
function rePasswordValidtion() {
    return document.getElementById("rePasswordInput").value == document.getElementById("passwordInput").value

}




