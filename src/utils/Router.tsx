import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, NotFound } from "@pages";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export { Router };