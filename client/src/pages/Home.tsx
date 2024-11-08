import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

function Home() {
  const slides = [
    { image: "https://pixelixe.com/blog/images/250/e-commerce-banner-strategy.jpg" },
    { image: "https://static.vecteezy.com/system/resources/thumbnails/004/707/502/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" },
    { image: "https://www.shutterstock.com/image-vector/3d-yellow-great-discount-sale-260nw-2056851839.jpg" },
    { image: "https://www.shutterstock.com/image-vector/ecommerce-web-banner-3d-smartphone-260nw-2069305328.jpg" }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-15 bg-black">
        <div className="max-w-lg">
          <Carousel slides={slides} autoSlide={true} />
        </div>
      </div>
      <ProductList heading="Trending Products"/>
      <Footer />
    </div>
  );
}

export default Home;