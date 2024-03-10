import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, ComingSoon, NotFound } from "@pages";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export { Router };