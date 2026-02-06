
        // save data to local storage
        window.onload = function (){
            const saveData = localStorage.getItem("listData");
            if(saveData){
                document.getElementById("myList").innerHTML = saveData;
            }
        }

         const movie = document.getElementById("movieInput");
        const output = document.getElementById("output");
        let currentMovie = null;

        async function searchMovie() {
            const movieInput = movie.value.trim();
       
        if(movieInput === ""){
            output.textContent = "Please Enter a movie name";
            return;
        }
        output.textContent = "Loading...";
        try {
            const apiKey = "b6f2cb48";
            const res = await fetch(`https://www.omdbapi.com/?t=${movieInput}&apikey=${apiKey}`);
            const data = await res.json();
            if(data.Response === "False"){
                output.textContent = `${data.Error}`;
                return;
            }

            currentMovie = data;
            output.innerHTML = `<h2>${data.Title}  (${data.Year})</h2>
            <p>Genre: ${data.Genre}</p>
            <p>IMDb Rating: ${data.imdbRating}</p>
            <p>Plot: ${data.Plot}</p>
            <img src="${data.Poster}" alt="Poster">`;
        
        } catch (error) {
            output.textContent = "Error Fetching data";
        }
    }
    function ListBtn(){
        if (!currentMovie) {
                output.textContent = "Search for a movie first!";
                return;
            }
            const myList = document.getElementById("myList");
        const div = document.createElement("div");
        div.classList.add("movie-card");
        div.innerHTML = `<h2>${currentMovie.Title}  (${currentMovie.Year})</h2>
            <p>Genre: ${currentMovie.Genre}</p>
            <p>IMDb Rating: ${currentMovie.imdbRating}</p>
            <p>Plot: ${currentMovie.Plot}</p>
            <img src="${currentMovie.Poster}" alt="Poster"> <br><button class="deleteBtn">Delete</button><hr>`;
            myList.appendChild(div);
            document.getElementById("movieInput").value = "";
            saveData();
    };
    // Delete Button
    const MyList = document.getElementById("myList");
    MyList.addEventListener("click", (e) =>{
        if(e.target.classList.contains("deleteBtn")){
                 e.target.closest(".movie-card").remove();
    
        }
            saveData();    
    }) ;

    // Load data when page was refresh
     function saveData(){
        const myList = document.getElementById("myList");

        localStorage.setItem("listData", myList.innerHTML)
     };
