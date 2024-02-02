import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import AllRecipesPage from "./Pages/AllRecipesPage/AllRecipesPage";
import Footer from "./components/Footer/Footer";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import AddRecipePage from "./Pages/AddRecipePage/AddRecipePage";
import { AddRecipeProvider } from "./context/AddRecipeContext";
import RecipeListing from "./components/RecipeListing/RecipeListing";
import PageNotExists from "./Pages/PageNotExists/PageNotExists";
import { AddDataProvider } from "./context/DataContext";
import Test from "./components/Test/Test";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

function App() {
  return (
    <div className="App-container">
      <AddDataProvider>
        <AddRecipeProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/recipe" element={<AllRecipesPage />} />
              <Route path="/category" element={<CategoriesPage />} />
              <Route path="/add-recipe" element={<AddRecipePage />} />
              <Route path="/recipe-listing" element={<RecipeListing />} />
              <Route path="/recipe/:recipe_id" element={<RecipeDetails />} />
              <Route path="/test" element={<Test />} />
              <Route path="/*" element={<PageNotExists />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AddRecipeProvider>
      </AddDataProvider>
    </div>
  );
}

export default App;
