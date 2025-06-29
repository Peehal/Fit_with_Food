// Select the form element and the search-results element
const form = document.querySelector('.form')
const searchResults = document.querySelector('.search-results')

// Variable to store the user's search query
let searchQuery = ''

// Event listener for form submission
form.addEventListener("submit",(e)=>{
    // Prevent the form from refreshing the page
    e.preventDefault()
    
    // Clear the search results and store the user's search query
    searchResults.innerHTML = ''
    searchQuery = e.target.querySelector('input').value
    
    // Fetch recipes from the API based on the user's search query
    fetchApi()
})

// API credentials
const appId = '72cf676f'
const appKey = '159da15f9d564ab7034f71437b189793'

// Function to fetch recipes from the API and generate HTML
async function fetchApi(){
    // Fetch data from the API and parse it as JSON
    fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&to=20`)
        .then((resp)=>{
            return resp.json()
        })
        .then((data)=>{
            // Generate HTML based on the fetched data
            genarateHtml(data.hits)
        })
}

// Function to generate HTML based on recipe data
const genarateHtml = (res) =>{
    let template = ''
    // Loop through each recipe and generate HTML for it
    res.map(result=>{
        template += 
        `
        <div class="result-items">
            <!-- Display the cuisine type of the recipe -->
            <div class="tag">
                <p>${result.recipe.cuisineType}</p>
            </div>
            <!-- Display the image of the recipe -->
            <div class="result-items-img">
                <img src="${result.recipe.image}"
                    alt="${result.recipe.label}">
            </div>
            <!-- Display the label, calories, and a link to the recipe -->
            <div class="result-items-text">
                <div class="heading">
                    <h2>${result.recipe.label}</h2>
                </div>
                <ul class="info">
                    <li>
                        Calories : <span>${Math.floor(result.recipe.calories)}</span> calories
                    </li>
                </ul>
            </div>
            <a href="${result.recipe.url}" target="_blank" class="btn-recipe">View Recipe</a>
        </div>
        `
    })
    // Append the generated HTML to the search results element
    searchResults.innerHTML += template
}
