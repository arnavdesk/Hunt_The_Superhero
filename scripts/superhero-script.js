(function () {
    const url = new URL(window.location.href);
    var heroId = url.searchParams.get("hero_id");

    const heroImg = document.getElementById("main-hero-img");
    const heroName = document.getElementById("hero-name");
    const fullName = document.getElementById("full-name");
    const alterEgo = document.getElementById("ego");
    const alias = document.getElementById("alias");
    const starredIcon = document.getElementById("starred");

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

    let stringOfHeroId = localStorage.getItem("listFavHero");
    if (stringOfHeroId !== null || stringOfHeroId != undefined) {
        localArrayIds = JSON.parse(stringOfHeroId);
    }

    console.log(localArrayIds);

    const renderHeroBio = function (bio) {
        for (const it in bio) {
            document.getElementById(it).innerHTML = bio[it];
        }
    }

    const renderHeroAppearence = function (appearance) {
        for (const it in appearance) {
            document.getElementById(it).innerHTML = appearance[it];
        }
    }

    const renderPowerStats = function (powerstats) {
        for (const it in powerstats) {
            let skill = document.getElementById(it);
            skill.style.width = `${powerstats[it]}%`;
        }
    }




    const renderHero = function (data) {
        heroImg.setAttribute("src", data.image.url);
        heroName.innerHTML = data.name;
        renderHeroBio(data.biography);
        renderPowerStats(data.powerstats);
        renderHeroAppearence(data.appearance);
        if (localArrayIds.indexOf(heroId) !== -1) {
            starredIcon.innerHTML = '<i id="star-click" class="fas fa-heart"></i>';
        }
        else {
            starredIcon.innerHTML = '<i id="star-click" class="far fa-heart"></i>';
        }
        starredIcon.onclick = function () {
            var index = localArrayIds.indexOf(heroId);
            if (index !== -1) {
                console.log(heroId);
                localArrayIds.splice(index, 1);
                starredIcon.innerHTML = '<i id="star-click" class="far fa-heart"></i>';
                console.log(localArrayIds);
                localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
                toast(heroName.innerHTML + " Removed from Favourites", 0);
            }
            else {
                localArrayIds.push(heroId);
                starredIcon.innerHTML = '<i id="star-click" class="fas fa-heart"></i>';
                console.log(localArrayIds);
                localStorage.setItem("listFavHero", JSON.stringify(localArrayIds));
                toast(heroName.innerHTML + " Added to Favourites", 1);
            }
        }

    }

    const loadHeroFromId = async function (heroId) {
        let response = await fetch(`https://www.superheroapi.com/api.php/10212976430764752/${heroId}`).catch(e => {
            console.log("error");
        });
        let data = await response.json();
        renderHero(data);
    }

    loadHeroFromId(heroId);




})();