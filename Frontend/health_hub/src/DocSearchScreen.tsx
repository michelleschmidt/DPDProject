import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";

function DocSearch() {
  return (
    <div>
      <Header />

      <div>
        <Form buttonLink="/find"></Form>
      </div>

      <Footer />
    </div>
  );
}
export default DocSearch;
