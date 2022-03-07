import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import ThankYou from "./ThankYou";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="thank-you" element={<ThankYou />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
