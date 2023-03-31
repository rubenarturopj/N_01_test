import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Box } from "@mui/material";

export function Merci() {
    // start of retriving name from url *********
    const userName = window.location.pathname.replace("/merci/", "");
    // console.log(userName);
    // end of retriving name from url *********

    // start of changing the name of the tab/page *********
    const title = `Merci, ${userName}`;
    document.title = title.toUpperCase();
    // end of changing the name of the tab/page *********

    // start of retrieve from localStorage ***************
    const userInfoJSON = localStorage.getItem("userInfo");
    const jsonified = JSON.parse(userInfoJSON);
    const userFirstName = jsonified.questions[0].fields[0].name;
    // end of retriving from localStorage **************

    // Start of changing the name with input ******************
    const [newName, setNewName] = useState("");
    const [shouldRewriteName, setShouldRewriteName] = useState(false);

    const handleNameChange = (event) => {
        event.preventDefault();

        if (event.target.value.length === 0) {
            setShouldRewriteName(false);
            setNewName("");
        } else {
            setNewName(event.target.value);
            setShouldRewriteName(true);
        }
    };
    // End of changing the name with input ******************

    return (
        <>
            <Paper className="MainContentContainer MainCenter">
                <Container>
                    <Player
                        autoplay
                        loop
                        src="https://assets4.lottiefiles.com/packages/lf20_hgvbg30i.json"
                        style={{
                            width: "200px",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    >
                        <Controls
                            visible={false}
                            buttons={["play", "repeat", "frame", "debug"]}
                        />
                    </Player>
                    <Box>
                        <h4>C'est fait!</h4>
                        <h1>
                            Merci,{" "}
                            <strong id="name">
                                {!shouldRewriteName ? userName : newName}
                            </strong>
                            , pour votre inscription.
                        </h1>
                        <Form
                            style={{
                                marginTop: "2.5rem",
                                marginBottom: "2rem",
                            }}
                        >
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>
                                    Changez votre prénom en temps réel ici !
                                </Form.Label>
                                <Box id="changeNameinput">
                                    <Form.Control
                                        type="text"
                                        placeholder="Prénom"
                                        value={newName}
                                        onChange={handleNameChange}
                                    />
                                </Box>
                            </Form.Group>
                        </Form>
                    </Box>
                </Container>
            </Paper>
        </>
    );
}
