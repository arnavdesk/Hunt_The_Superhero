(function () {
    const fetchBtn = document.getElementById("get-image");
    const textBar = document.getElementById("name-input");
    const superHeroContainer = document.getElementById("main-2");


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
        starredIcon.innerHTML = '<i class="far fa-heart"></i>';

        cardBody.appendChild(heroName);
        cardBody.appendChild(starredIcon);



        imageContainer.appendChild(imgV);
        cardL.appendChild(idDiv);
        cardL.appendChild(imageContainer);
        cardL.appendChild(cardBody);
        cardL.onclick = function () {
            window.open("superhero.html?hero_id=" + id, "_self");
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

        let name = textBar.value;
        if (name.length == 0) {
            superHeroContainer.innerHTML = "";
            return;
        }
        let response = await fetch(`https://www.superheroapi.com/api.php/10212976430764752/search/${name}`).catch(e => {
            console.log("error");
        });
        let data = await response.json();
        renderHeros(data, name);

    }

    fetchBtn.onclick = () => { textBar.onkeyup() };

})();