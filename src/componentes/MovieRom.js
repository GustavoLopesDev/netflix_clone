import React, { useState } from "react";
import './MovieRow.css';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_back" />

export default ({title, items}) => {
    const [ scrollX, setScrollX ] = useState (-400);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerHeight /2);
        if(x>0){
            x = 0;
        }
        setScrollX(x);
    }
    const handleRighArrow = () => {
        let x = scrollX - Math.round(window.innerHeight /2);
        let listW = items.results.length * 200;
        if((window.innerWidth  - listW) > x){
            x = (window.innerWidth  - listW) - 60;
        }
        setScrollX(x);
    }
    return(
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <span class="material-symbols-outlined">arrow_back</span>
            </div>
            <div className="movieRow--right" onClick={handleRighArrow}>
                <span class="material-symbols-outlined">arrow_forward</span>
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 200
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key}className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                        </div>   
                    ))}
                </div>
            </div>
        </div>
    );
}