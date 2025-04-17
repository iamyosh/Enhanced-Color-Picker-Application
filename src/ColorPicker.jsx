import React, {useState, useEffect} from "react"
import tinycolor from "tinycolor2";

function ColorPicker(){

    const [color, setColor] = useState("#FFFFFF");
    const [color2, setColor2] = useState("#000000");
    const [colorHistory, setColorHistory] = useState([]);
    const [Favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("Favorites")) || []);
    const [darkMode, setDarkMode] = useState();
    


    const handleColorChange = (event) => setColor(event.target.value);

    const handleSecondColorChange = (event) => setColor2(event.target.value);

    const generateRandomColor = () =>
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`);
        
    const copyToClipboard = () => navigator.clipboard.writeText(color);

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


            
        </div>

    );

}


export default ColorPicker