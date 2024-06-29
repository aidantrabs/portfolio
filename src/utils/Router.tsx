import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1> NEW </h1>} />
        </Routes>
    </BrowserRouter>
);

export { Router };