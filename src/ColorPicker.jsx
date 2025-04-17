import React, {useState, useEffect} from "react"
import tinycolor from "tinycolor2";

function ColorPicker(){

    const [color, setColor] = useState("#FFFFFF");
    const [color2, setColor2] = useState("#000000");
    const [colorHistory, setColorHistory] = useState([]);
    const [Favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("Favorites")) || []);
    const [darkMode, setDarkMode] = useState();
    

    //Toggle Dark mode/Light mode
    useEffect(() => {
        document.body.style.backgroundColor = darkMode ? "#222" : "#fff";
        document.body.style.color = darkMode ? "#eee" : "#000";}, [darkMode]);


    const handleColorChange = (event) => setColor(event.target.value);
    const handleSecondColorChange = (event) => setColor2(event.target.value);

    //Generating a random color
    const generateRandomColor = () =>
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`);
        
    const copyToClipboard = () => navigator.clipboard.writeText(color);

    //Favorites
    const toggleFavorites = () => {
        if(Favorites.includes(color)){
            setFavorites(Favorites.filter((fav) => fav !== color));
        }else{
            setFavorites([...Favorites,color]);
        }
    };

    const getContrastColor = (hex) => tinycolor(hex).isLight()? '#000' : '#fff';
    const getColorName = (hex) => tinycolor(hex).toName() || 'Unknown';



    return(
        <div className="color-picker-container">
            <h1>🎨 Enhanced Color Picker</h1>

            <div className="color-display" style={{backgroundColor:color, color:getContrastColor(color)}} onClick={copyToClipboard} title="Click to copy HEX code">

            <p>{color} | {tinycolor(color).toRgbString()} | {getColorName(color)}</p>
            </div>

            <label>Pick a Color: </label>
            <input type="color" value={color} onChange={handleColorChange}></input>

            <div>
                <button onClick={generateRandomColor}>✨Random Color</button>
                <button onClick={toggleFavorites}>{Favorites.includes(color)? '⭐Unfavorite' : '🌟Favorite'}</button>

                <button onClick={setDarkMode(!darkMode)}>{darkMode? '🌞 Light Mode' : '🌙 Dark Mode'}</button>
            </div>


            <h3>Recent Colors</h3>
            <div style={{display: "flex", gap: "10px"}}>
                {history.map((c, index) => (   
                    //.map() is used to loop over the history array. 'c' - color
                    <button key = {index} style={{backgroundColor: c,width: "30px", height: "30px"}} onClick={() => setColor(c)}>
                    </button>
                ))} 
            </div>
        </div>

    );

}


export default ColorPicker