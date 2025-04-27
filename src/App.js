import React, {useEffect, useState}from "react";
import './App.css';
import Tmdb from './tmdb';
import MovieRom from './componentes/MovieRom';
import FeaturedMovie from "./componentes/FeaturedMovie";
import Header from './componentes/Header';

export default () => {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);
        useEffect(()=>{
            
            // Adicionando o link para o Google Fonts (Material Icons)
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
            document.head.appendChild(link);

            const LoandAll = async ()=> {
                //PEGANDO A LISTA
                let list = await Tmdb.getHomeList();
                setMovieList(list)
                    
                //PEGANDO O FEATURED
                let originals = list.filter(i=>i.slug === 'action');
                let randowChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
                let  chosen = originals[0].items.results[randowChosen];
                let chosenInfo= await Tmdb.getMovieInfor(chosen.id, 'movie')
                setFeaturedData(chosenInfo);
            }
            LoandAll();
        }, []);

        useEffect(()=> {
             const scrolllistener = () =>{
                if(window.scrollY > 10){
                    setBlackHeader(true)
                }else{
                    setBlackHeader(false)
                }
             }

             window.addEventListener('scroll', scrolllistener);

             return()=> {
                window.removeEventListener('scroll', scrolllistener);
             }
        }, [])

    return(
        <div className="page">

            <Header  black = {blackHeader}/>

            {featuredData &&
            <FeaturedMovie  item={featuredData} />
            
            }
            
            <section className="lists">
                {movieList.map((item, key)=> ( 
                    <MovieRom key={key} title={item.title} items={item.items}/>
                ))}
            </section>

            <footer>
                Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web<br/>
                Direitos de imagem para Netflix<br/>
                Dados pegos do site Themoviedb.org
            </footer>
        
        </div>
    );
}