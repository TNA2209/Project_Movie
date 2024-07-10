import { useEffect, useRef, useState } from 'react'
import GlobalApi from '../../services/GlobalApi'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"
const screenWidth = window.innerWidth

function Slider() {
    const [movieList, setMovieList] = useState([])
    const elementRef = useRef();

    useEffect(() => {
        getTrendingMovies()
    }, [])

    const getTrendingMovies = () => {
        GlobalApi.getTrendingVideos.then(resp => { // Gọi hàm getTrendingVideos() để lấy Promise
            console.log(resp.data.results)
            setMovieList(resp.data.results)
        }).catch(error => {
            console.error('Error fetching trending movies:', error);
        });
    }

    const sliderRight = (element) => {
        element.scrollLeft -= screenWidth - 110
    }

    const sliderLeft = (element) => {
        element.scrollLeft += screenWidth - 110
    }

    return (
        <div>
            <FaChevronLeft className='hidden md:block text-white text-[30px] absolute mx-8 mt-[160px] cursor-pointer' onClick={() => sliderRight(elementRef.current)} />
            <FaChevronRight className='hidden md:block text-white text-[30px] absolute mx-8 mt-[160px] cursor-pointer right-0' onClick={() => sliderLeft(elementRef.current)} />

            <div className='flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth' ref={elementRef}>
                {movieList.map((item, index) => (
                    <img key={index} src={IMAGE_BASE_URL + item.backdrop_path} className='min-w-full md:h-[420px] object-cover object-left-top mr-5 rounded-md hover:border-[4px] border-gray-100' />
                ))}
            </div>
        </div>
    )
}

export default Slider