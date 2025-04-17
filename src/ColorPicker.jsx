import React, {useState, useEffect} from "react"
import tinycolor from "tinycolor2";

function ColorPicker(){

    const [color, setColor] = useState("#FFFFFF");
    const [color2, setColor2] = useState("#000000");
    const [colorHistory, setColorHistory] = useState([]);
    const [Favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("Favorites")) || []);
    const [darkMode, setDarkMode] = useState(false);
    

    //Toggle Dark mode/Light mode
    useEffect(() => {
        document.body.style.backgroundColor = darkMode ? "#222" : "#fff";
        document.body.style.color = darkMode ? "#eee" : "#000";
    }, [darkMode]);

    //set color history
    useEffect(() => {
        if(!colorHistory.includes(color)){
            setColorHistory((prev) => [color, ...prev, slice(0,4)]);
        }
    }, [color]);

    //adding useEffect for Favorites
    useEffect(() => {
        localStorage.setItem("Favorites", JSON.stringify(Favorites));
    }, [Favorites]);


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
                {colorHistory.map((c, index) => (   
                    //.map() is used to loop over the history array. 'c' - color
                    <button key = {index} style={{backgroundColor: c,width: "30px", height: "30px"}} onClick={() => setColor(c)}>
                    </button>
                ))} 
            </div>


            <h3>Favorites</h3>
            <div style={{display:"flex", gap: "10px"}}>
                {Favorites.map((fav,index) => (
                    <button key={index} style={{backgroundColor: fav, width: "30px", height:"30px", border:"2px solid gold"}} onClick={() => setColor(fav)}></button>
                ))}
                </div>

                <h3>Gradient View</h3>
                <label>Second Color: </label>
                <input type="color" value={color2} onChange={handleSecondColorChange}></input>
                <div style={{width: "300px", height: "100px", borderRadius: "12px", border:"2px solid gray", margin:"1rem 0", background:`linear-gradient(90deg, ${color}, ${color2})`}}></div>

                <p style={{fontFamily:"monospace"}}>CSS: <code>linear-gradient(90deg,{color},{color2})</code></p>

            </div>

    );

}


export default ColorPicker