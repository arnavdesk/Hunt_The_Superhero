(function () {

    // fetch all the required dom elements.
    const superHeroContainer = document.getElementById("main-2");
    const containerEmptyDiv = document.getElementById("nothing-here");
    let localArrayIds = []; //array used for localStorage
    // listFavHero is the local storage key
    // localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));

    //try to getch from local storage
    let stringOfHeroId = localStorage.getItem("listFavHero");
    if (stringOfHeroId !== null || stringOfHeroId != undefined) {
        localArrayIds = JSON.parse(stringOfHeroId);
    }

    // if localStorage does not have any value then return and show msg.

    if (localArrayIds.length == 0) {
        containerEmptyDiv.style.display = "block";
        return;
    }

    let showError = function () {
        if (localArrayIds.length == 0) {
            containerEmptyDiv.style.display = "block";
            return;
        }
    }



    // create a function for toasting/notification by fetching toast div

    const toastDiv = document.getElementById("toast-div");

    let toast = function (msg, state) {
        toastDiv.innerHTML = msg;
        if (state == true) {
            toastDiv.style.backgroundColor = "green";
            toastDiv.style.opacity = 1;
            setTimeout(() => {
                toastDiv.style.opacity = 0
            }, 800)
        }
        else {
            toastDiv.style.backgroundColor = "red";
            toastDiv.style.opacity = 1;
            setTimeout(() => {
                toastDiv.style.opacity = 0
            }, 800)
        }
    }

    console.log(localArrayIds);



    // function for creating a super hero card, it requires name, url and id and it creates a card.
    var getSuperHeroCard = function (sourceImg, name, id) {
        var cardL = document.createElement("div");
        cardL.setAttribute("class", "card-layout");

        var idDiv = document.createElement("div");
        idDiv.setAttribute("class", "hero-id");
        idDiv.innerHTML = id;

        var imageContainer = document.createElement("div");
        imageContainer.setAttribute("class", "hero-img-container");

        var imgV = document.createElement("img");
        imgV.setAttribute("class", "hero-img");
        imgV.setAttribute("src", sourceImg);
        imgV.setAttribute("onerror", "this.src='/assets/imgErr.jpg';");

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        var heroName = document.createElement("div");
        heroName.setAttribute("class", "hero-name");
        heroName.innerHTML = name;

        var starredIcon = document.createElement("div");
        starredIcon.setAttribute("class", "starred");


        // if it is present in local array fill the heart.
        if (localArrayIds.indexOf(id) !== -1) {
            starredIcon.innerHTML = '<i id="star-click" class="fas fa-heart"></i>';
            localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
        }

        // if it is present in local array(favourites), 
        // then executing this should remove it from favourites
        starredIcon.onclick = function () {
            var index = localArrayIds.indexOf(id);
            if (index !== -1) {
                console.log(id);
                localArrayIds.splice(index, 1);
                starredIcon.innerHTML = '<i id="star-click" class="far fa-heart"></i>';
                console.log(localArrayIds);
                superHeroContainer.removeChild(cardL);
                localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
                toast(heroName.innerHTML + " Removed from Favourites", 0);
                showError();
            }
        }

        cardBody.appendChild(heroName);
        cardBody.appendChild(starredIcon);



        imageContainer.appendChild(imgV);
        cardL.appendChild(idDiv);
        cardL.appendChild(imageContainer);
        cardL.appendChild(cardBody);

        // appending the card to the local array also ensuring that
        // when the user clicks on heart it should remove 
        // from favourites instead of opening the card.

        cardL.onclick = function (event) {
            if (event.target.id === starredIcon.firstChild.id) {
                return;
            }
            else {
                window.open("superhero.html?hero_id=" + id, "_self");
            }
        }
        return cardL;
    }



    //  function for rendering hero when we have data
    let renderHeros = async function (data) {
        let it = data
        superHeroContainer.appendChild(getSuperHeroCard(it.image.url, it.name, it.id));
    }


    // function to load favourites by using id in localStorage.
    let loadFavourites = async function (id) {

        let response = await fetch(`https://www.superheroapi.com/api.php/10212976430764752/${id}`).catch(e => {
            console.log("error");
        });
        let data = await response.json();
        renderHeros(data);
    }

    // iterating on each id and calling load favourites.
    for (const iterator of localArrayIds) {
        loadFavourites(iterator);
    }

})();