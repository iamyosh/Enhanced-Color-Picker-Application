import React, {useState, useEffect} from "react"
import tinycolor from "tinycolor2";
import bg from "./assets/background-image2.jpg"

function ColorPicker(){
    const [color, setColor] = useState("#FFFFFF");
    const [color2, setColor2] = useState("#000000");
    const [colorHistory, setColorHistory] = useState([]);
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("Favorites")) || []);
    const [darkMode, setDarkMode] = useState(true);
    
    // Toggle Dark mode/Light mode
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Set color history
    useEffect(() => {
        if(!colorHistory.includes(color)){
            setColorHistory((prev) => [color, ...prev.slice(0,4)]);
        }
    }, [color]);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }, [favorites]);

    const handleColorChange = (event) => setColor(event.target.value);
    const handleSecondColorChange = (event) => setColor2(event.target.value);

    // Generating a random color
    const generateRandomColor = () =>
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`);
        
    const copyToClipboard = () => {
        navigator.clipboard.writeText(color);
        alert(`Copied ${color} to clipboard!`);
    };

    // Favorites
    const toggleFavorites = () => {
        if(favorites.includes(color)){
            setFavorites(favorites.filter((fav) => fav !== color));
        }else{
            setFavorites([...favorites, color]);
        }
    };

    const getContrastColor = (hex) => tinycolor(hex).isLight() ? '#000' : '#fff';
    const getColorName = (hex) => tinycolor(hex).toName() || 'Custom';

    return(
        <div className= "background-wrap" style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120vh',
    }}>

        <div className="color-picker-container">
            <h1>🎨 Enhanced Color Picker <span className="text2">- "every color tells a story"...</span></h1>
            
            {/* Left Column - Main Color Picker */}
            <div className="main-section">
                <div 
                    className="color-display" 
                    style={{backgroundColor: color, color: getContrastColor(color)}} 
                    onClick={copyToClipboard} 
                    title="Click to copy HEX code"
                >
                    <p>{color} | {tinycolor(color).toRgbString()} | {getColorName(color)}</p>
                </div>
                
                <div className="color-controls">
                    <label>Pick a Color (First Color): </label>
                    <span className="color-picker-box"><input type="color" value={color} onChange={handleColorChange}></input></span>
                </div>
                
                <div className="action-buttons">
                    <button onClick={generateRandomColor}>✨ Random Color</button>
                    <button onClick={toggleFavorites}>
                        {favorites.includes(color) ? '⭐ Remove from Favorites' : '🌟 Add to Favorites'}
                    </button>
                    
                </div>
            </div>
            
            {/* Right Column - Additional Features */}
            <div className="features-section">
                <div className="feature-card">
                    <h3>🕒 Recent Colors</h3>
                    <div className="color-grid">
                        {colorHistory.map((c, index) => (
                            <button 
                                key={index} 
                                className="color-box"
                                style={{backgroundColor: c}}
                                onClick={() => setColor(c)}
                                title={c}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="feature-card">
                    <h3>⭐ Favorites</h3>
                    <div className="color-grid">
                        {favorites.map((fav, index) => (
                            <button 
                                key={index} 
                                className="color-box favorite-box"
                                style={{backgroundColor: fav}}
                                onClick={() => setColor(fav)}
                                title={fav}
                            />
                        ))}
                        {favorites.length === 0 && (
                            <p>Add colors to your favorites!</p>
                        )}
                    </div>
                </div>
                
                <div className="feature-card">
                    <h3>🌈 Gradient View</h3>
                    <div className="color-controls">
                        <label>Second Color: </label>
                        <input type="color" value={color2} onChange={handleSecondColorChange}></input>
                    </div>
                    
                    <div 
                        className="gradient-preview"
                        style={{background: `linear-gradient(90deg, ${color}, ${color2})`}}
                    />
                    
                    <p style={{fontFamily: "monospace"}}>
                        CSS: <code>linear-gradient(90deg, {color}, {color2})</code>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ColorPicker;