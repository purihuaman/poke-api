!function(){"use strict";axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/?limit=151"}).then((function(e){var t=document.getElementById("pokemon"),n=document.createDocumentFragment();e.data.results.map((function(e,t){var a=document.createElement("div"),o=document.createElement("p"),p=document.createElement("img"),c=document.createElement("p");axios({method:"GET",url:"".concat("https://pokeapi.co/api/v2/pokemon-form/").concat(t+1)}).then((function(e){p.classList.add("pokemon__image"),p.src=e.data.sprites.back_default,c.textContent="Tipo: ".concat(e.data.types[0].type.name),c.classList.add("pokemon__text"),a.prepend(p),a.append(c)})),o.setAttribute("id",t+1),o.classList.add("pokemon__name"),o.textContent=e.name.toUpperCase(),a.append(o),a.classList.add("pokemon__card"),n.append(a)})),t.append(n)}))}();