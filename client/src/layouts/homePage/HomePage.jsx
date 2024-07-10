import Footer from "../../components/home/Footer";
import GenreMovieList from "../../components/home/GenreMovieList";
import Header from "../../components/home/Header";
import ProductionHouse from "../../components/home/ProductionHouse";
import Slider from "../../components/home/Slider";

function HomePage() {
    return (
        <div>
            <Header />
            <Slider />
            <ProductionHouse />
            <GenreMovieList />
            <Footer />
        </div>
    );
}

export default HomePage;
