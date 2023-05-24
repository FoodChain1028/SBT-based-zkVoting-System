import styled from 'styled-components'

export const VotingCon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	/* background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(119,9,121,0.6181066176470589) 35%, rgba(78,8,161,1) 100%); */
    /* background: white; */
    background: transparent;
    width: 100vw;
`

export const VotingCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    background: white;
    border-radius: 15px;
    color: black;
`

export const Button = styled.div`
    cursor: pointer;
    min-width: 100px;
    min-height: 60px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transition: .2s;
    border-radius: 5px;
    margin: 10px;

    &:hover{
        transform: scale(1.1);
    }
`
