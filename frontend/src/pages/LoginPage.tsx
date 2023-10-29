import styled from "@emotion/styled";
import {useStore} from "../hooks/useStore.ts";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header.tsx";
import {blueTriangles} from "../assets/particles.ts";
import ParticlesBackground from "../components/ParticlesBackground.tsx";

export default function LoginPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = useStore((state) => state.login);

    const [registerPage, setRegisterPage] = useState(false);

    const [userNameReg, setUserNameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const register = useStore((state) => state.register);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,128}$/;
    const forbiddenCharacters = [":","‗","【","】","﹕","≔"," "]
    const validUserName = userNameReg.length >= 3 && userNameReg.length <= 16 && !containsForbiddenCharacters();

    function handleSubmitLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        login(userName, password, navigate);
    }

    function handleSubmitRegistration(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(!validUserName || !regex.test(passwordReg) || passwordReg !== repeatedPassword) return;
        register(userNameReg, passwordReg, question, answer, setRegisterPage, navigate);
        setPasswordReg("");
        setRepeatedPassword("");
        setUserNameReg("");
    }

    function containsForbiddenCharacters(){
        for(const char of forbiddenCharacters) {
            if (userNameReg.includes(char)){
                return true;
            }
        }
        return false;
    }

    function passWordColor() {
        if (passwordReg === "") {
            return "ghostwhite";
        }
        if (regex.test(passwordReg)) {
            return "#6ed298";
        } else {
            return "#e17b88";
        }
    }

    function repeatedPasswordColor() {
        if (repeatedPassword === "") {
            return "ghostwhite";
        }
        if (passwordReg === repeatedPassword) {
            return "#6ed298";
        } else {
            return "#e17b88";
        }
    }

    function userNameColor() {
        if (userNameReg === "") {
            return "ghostwhite";
        }
        if (validUserName) {
            return "#6ed298";
        } else {
            return "#e17b88";
        }
    }

    const questionColor = question.length > 0 ? "#6ed298" : "ghostwhite";
    const answerColor = answer.length > 0 ? "#6ed298" : "ghostwhite";

    return (
        <Wrapper className="login-background">
            <ParticlesBackground options={blueTriangles}/>
            <Header/>
            {!registerPage && <StyledForm onSubmit={handleSubmitLogin}>
                <InputField value={userName} onChange={(e) => setUserName(e.target.value)}
                            type="text" name="userName" placeholder="username" maxLength={16}/>

                <InputField value={password} onChange={(e) => setPassword(e.target.value)}
                            type="password" name="password" placeholder="password"/>

                <LoginPageButton type="submit"><ButtonSpan>LOGIN</ButtonSpan></LoginPageButton>
                <RegisterButton style={{marginTop: "50px"}} type="button"
                                onClick={() => setRegisterPage(true)}><ButtonSpan>REGISTER</ButtonSpan></RegisterButton>
            </StyledForm>}

            {registerPage && <StyledForm2 onSubmit={handleSubmitRegistration}>

                <div>
                    <InputFieldRegister value={userNameReg} onChange={(e) => setUserNameReg(e.target.value)}
                                type="text" name="userName" placeholder="username" maxLength={16}
                                style={{backgroundColor: `${userNameColor()}`}}
                    />
                    <br/>
                    <StyledInfo>3 - 16 characters</StyledInfo>
                </div>
                <div>
                    <InputFieldRegister value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)}
                                type="password" name="password" placeholder="password"
                                style={{backgroundColor: `${passWordColor()}`}}
                    />
                    <br/>
                    <StyledInfo>
                        6+ characters, cont. numbers & letters
                    </StyledInfo>
                </div>
                <InputFieldRegister value={repeatedPassword} onChange={(e) => setRepeatedPassword(e.target.value)}
                            type="password" name="RepeatPassword" placeholder="repeat password"
                            style={{backgroundColor: `${repeatedPasswordColor()}`}}/>
                <InputFieldRegister value={question} onChange={(e) => setQuestion(e.target.value)}
                                    type="text" name="Question" placeholder="safety question"
                                    style={{backgroundColor: `${questionColor}`}}/>
                <InputFieldRegister value={answer} onChange={(e) => setAnswer(e.target.value)}
                                    type="text" name="Answer" placeholder="answer (pw recovery)"
                                    style={{backgroundColor: `${answerColor}`}}/>
                <ButtonContainer>
                    <BackButton type="button"
                                onClick={() => setRegisterPage(false)}><ButtonSpan>BACK</ButtonSpan></BackButton>
                    <LoginPageButton type="submit"><ButtonSpan>REGISTER</ButtonSpan></LoginPageButton>
                </ButtonContainer>

            </StyledForm2>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(0px, 0px); // has to be here for the particles to work ???
`;

export const LoginPageButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 0;
  background: #D9D9D9;
  font-family: Pixel Digivolve, sans-serif;
  font-size: 20px;
  color: #0c0c0c;
  box-shadow: 6px 12px 1px 0 rgb(0, 0, 0);
  transition: all 0.15s ease;

  &:hover {
    background: lightgray;
    transform: translateY(1px);
    box-shadow: 4px 8px 1px 0 rgba(0, 0, 0, 0.9);
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #f8f8f8;
    transform: translateY(2px);
    box-shadow: 2px 4px 1px 0 rgba(0, 0, 0, 0.8);
  }
`;

export const InputField = styled.input`
  width: 280px;
  height: 60px;
  flex-shrink: 0;
  border: none;
  color: #070707;
  background: ghostwhite;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.25) inset;
  font-family: 'Naston', sans-serif;
  font-size: 26px;
  text-align: center;
  margin-bottom: 3px;
  transform: skewX(-15deg);

  :focus {
    outline: none;
  }

`;

export const InputFieldRegister = styled(InputField)`
  font-size: 22px;
  width: 300px;
    height: 50px;
`;

const StyledForm = styled.form`
  margin-top: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    gap: 20px;
  }
`;

const StyledForm2 = styled.form`
  margin-top: 45px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 767px) {
    gap: 20px;
    margin-top: 35px;
  }
`;

const StyledInfo = styled.span`
  font-family: 'Naston', sans-serif;
  font-size: 15px;
`;

const RegisterButton = styled(LoginPageButton)`
  background-color: black;
  color: ghostwhite;
  border-right: 1px solid rgba(25, 25, 26, 0.55);
  border-bottom: 1px solid rgba(25, 25, 26, 0.55);

  &:hover {
    background: #061025;
  }

  &:active {
    background: #08183a;
  }
`;

const BackButton = styled(RegisterButton)`
  width: 110px;
  margin-right: 45px;
`;

const ButtonSpan = styled.span`
  font-family: 'Pixel Digivolve', sans-serif;
  letter-spacing: 1px;
`;

const ButtonContainer = styled.div`
margin-top: 50px;
  @media (max-width: 767px) {
    margin-top: 32px;
  }
`;
