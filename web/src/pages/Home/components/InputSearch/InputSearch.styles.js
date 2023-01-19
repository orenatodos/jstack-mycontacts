import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.04));

  input {
    width: 100%;
    background: #FFF;
    border: 0;
    border-radius: 25px;
    height: 50px;
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`
