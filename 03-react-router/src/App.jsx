import { Route, Routes } from "react-router";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { lazy, Suspense, useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const Detail = lazy(() => import("./pages/Detail.jsx"));
const ContactPage = lazy(() => import("./pages/Contact.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

function App() {
    return (
        <div className="App">
            <Header />
            <Suspense fallback={<div className="spinner" aria-busy="true"></div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/jobs/:id" element={<Detail />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute redirectTo="/login">
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
            <Footer />
        </div>
    );
}

export default App;
