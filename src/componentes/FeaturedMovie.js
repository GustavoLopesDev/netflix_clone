import React from "react";
import './FeaturedMovie.css'

export default ({item}) => {

    let firstDate = new Date(item.release_date);
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name );
    }

    let description = item.overview && item.overview.trim() !== "" ? item.overview : "Sem descrição disponível";
    if(description.length > 200){
        description = description.substring(0, 200 )+ '....'
    }

    console.log(item)
    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_title}</div>
                    <div className="feature--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--white"> ► Assistir</a>
                        <a href={`/list/add/${item.id}`}className="featured--black"> + Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                                        
                </div>
            </div>
        
        </section>
    )
}