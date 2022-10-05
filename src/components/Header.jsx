const Header = () => {  
        let imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    return (
        
        <header>
            <div>
            <img 
            src= {imgUrl}
            alt="pokeapi-logo"
            className="header-image"/>
            </div>
        </header>

    );
};


export default Header 

