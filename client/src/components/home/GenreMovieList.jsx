
import GenresList from '../../constants/GenresList'
import MovieList from '../../components/home/MovieList'

function GenreMovieList() {
  return (
    <div>
      {GenresList.genere.map((item, index) => index <= 4 && (
        <div className='p-8 px-8 md:px-16' key={index}>
          <h2 className='text-[20px] text-white font-bold'>{item.name}</h2>
          <MovieList genreID={item.id} index_={index} />
        </div>
      ))}
    </div>
  )
}

export default GenreMovieList