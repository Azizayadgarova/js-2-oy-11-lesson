import pokemons from "./pokemons.js";
const wrapper = document.querySelector(".wrapper");
let button = document.querySelector('button');
let searchInput = document.querySelector('input'); 
let sortSelect = document.querySelector('#sortSelect');

wrapper.style.cssText = "gap:20px; justify-content:center;";

const ReadPokemonsFunction = (filteredPokemons = pokemons) => {
    wrapper.innerHTML = '';  

    filteredPokemons.map((v) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p class="flex bg-[#FF0000] w-[36px] h-[34px] text-white justify-center pokemon-type">${v.num}</p>
            <h2 class="flex justify-center text-[20px] font-bold pokemon-name">${v.name}</h2>
            <img class="w-[100px] h-[107px] flex justify-center pokemon-image" src="${v.img}" alt="">
            <span class="flex justify-center text-[20px] bg-[#C4E4FF] rounded-[20px] pokemon-type">${v.type}</span>
            <p class="text-[16px] font-bold pokemon-height">Candy count: ${v.candy_count || "N/A"}</p>
            <p class="text-[20px] font-bold pokemon-weight">${v.spawn_chance}:kg</p>
            <p class="text-[14px] text-[#80007C] font-bold pokemon-candy">${v.weaknesses}</p>
            <p class="text-end pokemon-egg">${v.spawn_time}</p>
        `;
        wrapper.appendChild(div);
        div.classList.add("card");
        div.style.cssText = "font-size: 18px; background-color: yellow; width: 250px;height:350px; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 330px;";
    });
};

ReadPokemonsFunction();

let select_cattegories = document.querySelector('.select_cattegories');
const ReadCategories = () => {
    const uniqueTypes = new Set();
    pokemons.map((v) => {
        if (v.type && Array.isArray(v.type)) {
            uniqueTypes.add(v.type[0]);
        }
    });
    select_cattegories.innerHTML = '';
    uniqueTypes.forEach((type) => {
        let option = document.createElement('option');
        option.textContent = type;
        select_cattegories.appendChild(option);
    });
};
ReadCategories();

let select_cattegories2 = document.querySelector('.select_cattegories2');
const ReadCategories2 = () => {
    const uniqueTypes2 = new Set();
    pokemons.map((v) => {
        if (v.weaknesses && Array.isArray(v.weaknesses)) {
            uniqueTypes2.add(v.weaknesses[0]);
        }
    });

    select_cattegories2.innerHTML = '';  
    uniqueTypes2.forEach((type) => {
        let option2 = document.createElement('option');
        option2.textContent = type;  
        select_cattegories2.appendChild(option2);
    });
};
ReadCategories2();

const SearchFunction = () => {
    const searchQuery = searchInput.value.toLowerCase();  

    const filteredPokemons = pokemons.filter((v) =>
        v.name.toLowerCase().includes(searchQuery)  
    );

    ReadPokemonsFunction(filteredPokemons);  
};

searchInput.addEventListener('input', SearchFunction);

select_cattegories.addEventListener('change', () => {
    const selectedType = select_cattegories.value.toLowerCase();
    const filteredPokemonsByType = pokemons.filter((v) =>
        v.type && v.type.some(type => type.toLowerCase().includes(selectedType))
    );
    ReadPokemonsFunction(filteredPokemonsByType);
});

select_cattegories2.addEventListener('change', () => {
    const selectedWeakness = select_cattegories2.value.toLowerCase();
    const filteredPokemonsByWeakness = pokemons.filter((v) =>
        v.weaknesses && v.weaknesses.some(weakness => weakness.toLowerCase().includes(selectedWeakness))
    );
    ReadPokemonsFunction(filteredPokemonsByWeakness);
});

sortSelect.addEventListener('change', () => {
    const selectedSortOption = sortSelect.value;

    let sortedPokemons;
    if (selectedSortOption === 'largest') {
        sortedPokemons = pokemons.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
    } else if (selectedSortOption === 'smallest') {
        sortedPokemons = pokemons.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    }

    ReadPokemonsFunction(sortedPokemons);
});
