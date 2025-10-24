import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import Home from "./pages/Home"; // REMOVE regular imports for lazy-loaded components
// ... and all other page imports

// 1. Replace regular imports with lazy()

const Politics = lazy(() => import("./pages/Politics"));
const Culture = lazy(() => import("./pages/Culture"));
const Economy = lazy(() => import("./pages/Economy"));
const Science = lazy(() => import("./pages/Science"));
const Technology = lazy(() => import("./pages/Technology"));
const Travel = lazy(() => import("./pages/Travel"));
const World = lazy(() => import("./pages/World"));
const Sport = lazy(() => import("./pages/Sport"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const CreatePost = lazy(() => import("./pages/CreatePostPage"));
const ReportNews = lazy(() => import("./pages/ReportNews"));
const Becomeanauthor = lazy(() => import("./pages/BecomeAuthor"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PostCreatedPage = lazy(() => import("./pages/PostCreatedPage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const AuthorProfilePage = lazy(() => import("./pages/AuthorProfilePage"));

// Keep regular imports for components like Navbar, Footer, and Contexts
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { SearchProvider } from "./Components/SearchContext";
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <Navbar />
          {/* 3. Wrap Routes with Suspense */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* 2. Update Routes to use the lazy-loaded components */}
              <Route
                path="/authorprofile/:creatorId"
                element={<AuthorProfilePage />}
              ></Route>
              <Route
                path="/postdetailspage/:postId"
                element={<PostDetailsPage />}
              ></Route>
              <Route path="/postcreated" element={<PostCreatedPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route
                path="/becomeanauthor"
                element={<Becomeanauthor />}
              ></Route>
              <Route path="/report" element={<ReportNews />}></Route>
              <Route path="/create" element={<CreatePost />}></Route>
              <Route path="/loginpage" element={<LoginPage />}></Route>
              <Route path="/signuppage" element={<SignupPage />}></Route>
              <Route path="/" element={<Home />} />
              <Route path="/politics" element={<Politics />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/economy" element={<Economy />} />
              <Route path="/science" element={<Science />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/world" element={<World />} />
              <Route path="/sport" element={<Sport />} />
            </Routes>
          </Suspense>
        </SearchProvider>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import Home from "./pages/Home";
// import Politics from "./pages/Politics";
// import Culture from "./Pages/Culture";
// import Economy from "./pages/Economy";
// import Science from "./pages/Science";
// import Technology from "./pages/Technology";
// import Travel from "./pages/Travel";
// import World from "./pages/World";
// import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer/Footer";
// import SignupPage from "./Pages/SignupPage";
// import LoginPage from "./Pages/LoginPage";
// import CreatePost from "./Pages/CreatePost";
// import ReportNews from "./Pages/ReportNews";
// import Becomeanauthor from "./Pages/BecomeAuthor";
// import ProfilePage from "./Pages/ProfilePage";
// import PostCreatedPage from "./Pages/PostCreatedPage";
// import PostDetailsPage from "./Pages/PostDetailsPage";
// import AuthorProfilePage from "./Pages/AuthorProfilePage";
// import Sport from "./Pages/Sport";
// import { SearchProvider } from "./Components/SearchContext";
// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <SearchProvider>
//           <Navbar />
//           <Routes>
//             <Route
//               path="/authorprofile/:creatorId"
//               element={<AuthorProfilePage />}
//             ></Route>
//             <Route
//               path="/postdetailspage/:postId"
//               element={<PostDetailsPage />}
//             ></Route>
//             <Route path="/postcreated" element={<PostCreatedPage />}></Route>
//             <Route path="/profile" element={<ProfilePage />}></Route>
//             <Route path="/becomeanauthor" element={<Becomeanauthor />}></Route>
//             <Route path="/report" element={<ReportNews />}></Route>
//             <Route path="/create" element={<CreatePost />}></Route>
//             <Route path="/loginpage" element={<LoginPage />}></Route>
//             <Route path="/signuppage" element={<SignupPage />}></Route>
//             <Route path="/" element={<Home />} />
//             <Route path="/politics" element={<Politics />} />
//             <Route path="/culture" element={<Culture />} />
//             <Route path="/economy" element={<Economy />} />
//             <Route path="/science" element={<Science />} />
//             <Route path="/technology" element={<Technology />} />
//             <Route path="/travel" element={<Travel />} />
//             <Route path="/world" element={<World />} />
//             <Route path="/sport" element={<Sport />} />
//           </Routes>
//         </SearchProvider>
//         <Footer />
//       </BrowserRouter>
//     </>
//     // <Home />
//   );
// }

// export default App;
