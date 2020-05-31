(function () {
    const url = new URL(window.location.href);
    var heroId = url.searchParams.get("hero_id");

    const heroImg = document.getElementById("main-hero-img");
    const heroName = document.getElementById("hero-name");
    const fullName = document.getElementById("full-name");
    const alterEgo = document.getElementById("ego");
    const alias = document.getElementById("alias");

    const renderHero = function (data) {
        heroImg.setAttribute("src", data.image.url);
        heroName.innerHTML = data.name;
        fullName.innerHTML = data.biography["full-name"];
        alterEgo.innerHTML = data.biography["alter-egos"];
        alias.innerHTML = data.biography["aliases"];
        let powerstats = data["powerstats"]
        console.log(powerstats);
        for (const it in powerstats) {
            let skill = document.getElementById(it);
            skill.style.width = `${powerstats[it]}%`;
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