import MainMenuButton from "../components/MainMenuButton.tsx";
import Header from "../components/Header.tsx";
import PatchnotesAndDisclaimer from "../components/PatchnotesAndDisclaimer.tsx";
import MenuBackgroundWrapper from "../components/MenuBackgroundWrapper.tsx";
import {Stack} from "@mui/material";

export default function MainMenu() {

    return (
        <MenuBackgroundWrapper>
            <Stack gap={5}>
                <Header/>
                <MainMenuButton name={"Find game"} path={"/lobby"}/>
                <MainMenuButton name={"Deckbuilder"} path={"/deckbuilder"}/>
                <MainMenuButton name={"Profile"} path={"/profile"}/>
                <MainMenuButton name={"LOGOUT"} path={"/login"}/>
            </Stack>
            <PatchnotesAndDisclaimer/>
        </MenuBackgroundWrapper>
    );
}
