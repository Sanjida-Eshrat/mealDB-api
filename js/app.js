const errorDiv = document.getElementById('error');
const searchMeal = () =>{
    const searchField = document.getElementById('search-text');
    const searchText = searchField.value;
    // console.log(searchText);
    // error message
    if(searchText===''){
        errorDiv.innerText= "Search field cannot be empty.";
        errorDiv.style.color='white';
    }
    
    else{
        //clear search bar
        errorDiv.innerText ='';
        searchField.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => getMeal(data.meals));
    }
    
}
// searchMeal();
const getMeal = meals =>{
    const searchedMeal = document.getElementById('search-meal');
    //clear searched item
    searchedMeal.textContent ='';
    meals.forEach(meal=>{
        // console.log(meals);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div onclick="loadMealDetail(${meal.idMeal})" class="card bg-light mt-5 mx-4 mb-3" style="width: 20rem;"> 
             <img src="${meal.strMealThumb}" class="card-img-top img-fluid">
             <div class="card-body">
             <h5 class="card-title">${meal.strMeal.slice(0,20)}</h5>
             <p class="card-text">${meal.strCategory}</p>
            </div>  
        </div>         
        `;
        searchedMeal.appendChild(div);
    });
}

const loadMealDetail = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => getMealDetail(data.meals[0]));
}

const getMealDetail = meal =>{
    const mealDetailContainer = document.getElementById('meal-detail');
    mealDetailContainer.textContent ='';
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =`
             <img src="${meal.strMealThumb}" class="card-img-top img-fluid">
             <div class="card-body">
             <h5 class="card-title">${meal.strMeal.slice(0,20)}</h5>
             <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
            </div>         
        `;
        mealDetailContainer.appendChild(div);
}