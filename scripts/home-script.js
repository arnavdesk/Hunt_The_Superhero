(function () {

    // fetch all the dom elements required to do any operation.
    const fetchBtn = document.getElementById("get-image");
    const textBar = document.getElementById("name-input");
    const superHeroContainer = document.getElementById("main-2");
    const hamButton = document.getElementById("ham-btn");
    const hamBar = document.getElementById("ham-bar");
    const mainHeding = document.getElementById("heading-main");
    const toastDiv = document.getElementById("toast-div");


    // toast function for showing notification/toasting.
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


    // fetching favourite array from localStorage. if it is not present then create empty array.
    let localArrayIds = [];
    // listFavHero
    // localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
    let stringOfHeroId = localStorage.getItem("listFavHero");
    if (stringOfHeroId !== null || stringOfHeroId != undefined) {
        localArrayIds = JSON.parse(stringOfHeroId);
    }

    console.log(localArrayIds);


    // hamburger menu for smaller devices.

    hamButton.onclick = function () {
        if (hamBar.style.maxHeight == "0px" || hamBar.style.maxHeight == "") {
            hamBar.style.maxHeight = "40vh";
        }
        else {
            hamBar.style.maxHeight = "0px";
        }
    }





    // creating a superhero card in dom when rendering is done.
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


        // check if element is present in localStorage or
        // not if it is there then it is favourite, color it else not favourite do not color.
        if (localArrayIds.indexOf(id) !== -1) {
            starredIcon.innerHTML = '<i id="star-click" class="fas fa-heart"></i>';
            localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
        }
        else {
            starredIcon.innerHTML = '<i id="star-click" class="far fa-heart"></i>';
            localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
        }

        // functionality for adding to favourites and removing it.
        starredIcon.onclick = function () {
            var index = localArrayIds.indexOf(id);
            if (index !== -1) {
                console.log(id);
                localArrayIds.splice(index, 1);
                starredIcon.innerHTML = '<i id="star-click" class="far fa-heart"></i>';
                console.log(localArrayIds);
                localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
                toast(heroName.innerHTML + " Removed from Favourites", 0);
            }
            else {
                localArrayIds.push(id);
                starredIcon.innerHTML = '<i id="star-click" class="fas fa-heart"></i>';
                console.log(localArrayIds);
                localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
                toast(heroName.innerHTML + " Added to Favourites", 1);
            }
        }

        cardBody.appendChild(heroName);
        cardBody.appendChild(starredIcon);

        imageContainer.appendChild(imgV);
        cardL.appendChild(idDiv);
        cardL.appendChild(imageContainer);
        cardL.appendChild(cardBody);

        // Ensuring that clicking on favourite button works else the superhero page is opened.

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



    // render heroes and if they are not present showing empty errpr.
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


    //  implementing suggestion kind of thing.
    // as soon as any key is pressed a get request is made on server.
    // all the elements found by that name is rendered. if no element found then show error. 
    // it also ensures that only those elements are entered 
    // into the render list whose name matches with the one written in the input bar.

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

    // making sure button click also works.
    fetchBtn.onclick = () => { textBar.onkeyup() };


    // FUNCTION TO FETCH ELEMENT BY ID USED IN OTHER FILES!!!!

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