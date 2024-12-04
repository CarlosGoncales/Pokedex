const FPokemonName   = document.querySelector('.pokemon__name');
const FPokemonNumber = document.querySelector('.pokemon__number');
const FPokemonImage  = document.querySelector('.pokemon__image');
const FForm          = document.querySelector('.form');
const FInupt         = document.querySelector('.input__search');
const FButtonPrev    = document.querySelector('.btn-prev');
const FButtonNex     = document.querySelector('.btn-next');
let   FBuscaPokemon   = '1';

const fetchPokemon = async(aPokemon) =>{
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${aPokemon}`);
    if(ApiResponse.status == 200){
        const data = await ApiResponse.json();
        return data;
    }
}

const renderPokemon = async (aPokemon) =>{
    FPokemonName.innerHTML   ='Carregando...';
    FPokemonNumber.innerHTML ='';
    const data             = await fetchPokemon(aPokemon);
    if(data){
        FPokemonImage.style.display ='block';
        FPokemonName.innerHTML      = data.name;
        FPokemonNumber.innerHTML    = data.id;
        FPokemonImage.src           = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];    
        FInupt.value                = '';
        FBuscaPokemon               = data.id;
    }else{
        FPokemonImage.style.display ='none'; 
        FPokemonName.innerHTML      ='Not Found :('; 
    }
}

FForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(FInupt.value.toLowerCase());
});

FButtonPrev.addEventListener('click',()=>{
    if(FBuscaPokemon > 1){
       FBuscaPokemon -= 1;
       renderPokemon(FBuscaPokemon );
    }  
  });
  
  FButtonNex.addEventListener('click',()=>{
    FBuscaPokemon += 1;
    renderPokemon(FBuscaPokemon );
});

renderPokemon(FBuscaPokemon)
