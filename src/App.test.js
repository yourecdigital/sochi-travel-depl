"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
//import { render, screen } from '@testing-library/react';
var App_1 = __importDefault(require("./App"));
test('renders learn react link', function () {
    render((0, jsx_runtime_1.jsx)(App_1.default, {}));
    var linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
