import styled from 'styled-components';


export const Wrapper = styled.div`
    max-width: 1100px;
    background: rgba(216, 247, 247, 0.4);
    border-radius: 10px;
    border: 2px solid €0085a3;
    padding: 20px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
    text-align: center;

    p {
        font-size: 1rem;
    }
`;

type ButtonWrapperProps = {
    correct: boolean,
    userClicked: boolean;
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    :hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 1.3rem;
        width: 100%;
        height: 50px;
        margin: 5px 0;
        background: ${({ correct, userClicked }) => 
            correct 
            ? 'linear-gradient(90deg, #56FFA4, #59BC86)' 
            : !correct && userClicked
            ? 'linear-gradient(90deg, #FF5656, #c16868)' 
            : 'linear-gradient(90deg, #56ccff, #6eafb4)'
        };
        border: 3px solid rgba(236, 226, 231, 0.8);
        box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1)
        border-radius: 5px;
        color: #fff;
        text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25)
    }
`