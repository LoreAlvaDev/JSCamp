import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Route } from "./components/Route.jsx";
import { ContactPage } from "./pages/Contact.jsx";
import { HomePage } from "./pages/Home.jsx";
// import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { SearchPage } from "./pages/Search.jsx";
// import { useRouter } from "./hooks/useRouter.jsx";

function App() {
    // let page = <NotFoundPage />;
    // const { currentPath } = useRouter();
    // if (currentPath === "/") {
    //     page = <HomePage />;
    // } else if (currentPath === "/search") {
    //     page = <SearchPage />;
    // }

    return (
        <div className="App">
            <Header />
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/contact" component={ContactPage} />
            <Footer />
        </div>
    );
}

export default App;
