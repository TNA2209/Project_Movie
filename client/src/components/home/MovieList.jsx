import { useEffect, useRef, useState } from "react"
import GlobalApi from "../../services/GlobalApi"
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HrMovieCard from "./HrMovieCard";

function MovieList({ genreID, index_ }) {
    const [movieList, setMovieList] = useState([]);
    const elementRef = useRef(null);

    useEffect(() => {
        getMovieByGenreId();
    }, [genreID]);

    const getMovieByGenreId = () => {
        GlobalApi.getMovieByGenreId(genreID).then(resp => {
            console.log(resp.data.results);
            setMovieList(resp.data.results);
        });
    };

    const sliderRight = (element) => {
        element.scrollLeft -= 500;
    };

    const sliderLeft = (element) => {
        element.scrollLeft += 500;
    };

    return (
        <div className="relative">
            <FaChevronLeft className={`text-[50px] text-white
           p-2 z-10 cursor-pointer 
            hidden md:block absolute
            ${index_ % 3 == 0 ? 'mt-[80px]' : 'mt-[150px]'} `} onClick={() => sliderRight(elementRef.current)} />
            <div ref={elementRef} className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth pt-5 px-3 pb-5">
                {movieList.map((item, index) => (
                    index_ % 3 === 0
                        ? <HrMovieCard key={item.id} movie={item} />
                        : <MovieCard key={item.id} movie={item} />
                ))}
            </div>
            <FaChevronRight className={`text-[50px] text-white hidden md:block
           p-2 cursor-pointer z-10 top-0
            absolute right-0 
            ${index_ % 3 == 0 ? 'mt-[80px]' : 'mt-[150px]'}`} onClick={() => sliderLeft(elementRef.current)} />
        </div>
    );
}

export default MovieList;