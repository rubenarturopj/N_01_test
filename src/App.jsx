import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Inscription } from "./pages/Inscription";
import { Merci } from "./pages/Merci";
import { NavBar } from "./Utilities/NavBar";

function App() {
    return (
        <>
            <NavBar />
            <Container>
                <Routes>
                    <Route path="/" element={<Inscription />} />
                    <Route path="/merci/:id" element={<Merci />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
