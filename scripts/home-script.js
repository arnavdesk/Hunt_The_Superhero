(function () {
    const fetchBtn = document.getElementById("get-image");
    const textBar = document.getElementById("name-input");
    const superHeroContainer = document.getElementById("main-2");
    const hamButton = document.getElementById("ham-btn");
    const hamBar = document.getElementById("ham-bar");
    const mainHeding = document.getElementById("heading-main");

    let localArrayIds = [];
    // listFavHero
    // localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
    let stringOfHeroId = localStorage.getItem("listFavHero");
    if (stringOfHeroId !== null || stringOfHeroId != undefined) {
        localArrayIds = JSON.parse(stringOfHeroId);
    }

    console.log(localArrayIds);

    console.log(hamBar.style.maxHeight);

    hamButton.onclick = function () {
        if (hamBar.style.maxHeight == "0px" || hamBar.style.maxHeight == "") {
            hamBar.style.maxHeight = "40vh";
        }
        else {
            hamBar.style.maxHeight = "0px";
        }
    }





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
        imgV.setAttribute("onerror", "this.onerror= null; this.src='assets/imgErr.jpg';");

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        var heroName = document.createElement("div");
        heroName.setAttribute("class", "hero-name");
        heroName.innerHTML = name;

        var starredIcon = document.createElement("div");
        starredIcon.setAttribute("class", "starred");

        // function findId(hero_id) {
        //     return hero_id === id;
        // }

        if (localArrayIds.indexOf(id) !== -1) {
            starredIcon.innerHTML = '<i id="star-click" class="fas fa-heart"></i>';
            localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
        }
        else {
            starredIcon.innerHTML = '<i id="star-click" class="far fa-heart"></i>';
            localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
        }


        starredIcon.onclick = function () {
            var index = localArrayIds.indexOf(id);
            if (index !== -1) {
                console.log(id);
                localArrayIds.splice(index, 1);
                starredIcon.innerHTML = '<i id="star-click" class="far fa-heart"></i>';
                console.log(localArrayIds);
                localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
            }
            else {
                localArrayIds.push(id);
                starredIcon.innerHTML = '<i id="star-click" class="fas fa-heart"></i>';
                console.log(localArrayIds);
                localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
            }
        }

        cardBody.appendChild(heroName);
        cardBody.appendChild(starredIcon);



        imageContainer.appendChild(imgV);
        cardL.appendChild(idDiv);
        cardL.appendChild(imageContainer);
        cardL.appendChild(cardBody);
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



    let renderHeros = async function (data, name) {
        if (data.results == null) {
            superHeroContainer.innerHTML = "";
            return;
        }
        if (textBar.value !== name) {
            return;
        }
        superHeroContainer.innerHTML = "";
        for (const it of data.results) {
            superHeroContainer.appendChild(getSuperHeroCard(it.image.url, it.name, it.id));
        }

    }


    textBar.onkeyup = async function () {
        mainHeding.style.display = "none";
        let name = textBar.value;
        if (name.length == 0) {
            superHeroContainer.innerHTML = "";
            mainHeding.style.display = "block";
            return;
        }
        let response = await fetch(`https://www.superheroapi.com/api.php/10212976430764752/search/${name}`).catch(e => {
            console.log("error");
        });
        let data = await response.json();
        renderHeros(data, name);

    }

    fetchBtn.onclick = () => { textBar.onkeyup() };


    // let renderOnLoad = async function (data) {
    //     let it = data
    //     superHeroContainer.appendChild(getSuperHeroCard(it.image.url, it.name, it.id));
    // }

    // let loadSuperHeroes = async function (id) {

    //     let response = await fetch(`https://www.superheroapi.com/api.php/10212976430764752/${id}`, { signal }).catch(e => {
    //         console.log("error");
    //     });
    //     let data = await response.json();
    //     renderOnLoad(data);
    // }

    // for (const iterator of allTheIds) {
    //     loadSuperHeroes(iterator);
    // }

})();