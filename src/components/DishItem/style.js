import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;
  background-color: ${({ theme, $isNew }) => $isNew ? "transparent" : theme.COLORS.LIGHT_600};
  border: ${({ theme, $isNew }) => $isNew ? `1px dashed ${theme.COLORS.LIGHT_500}` : "none"};
  


  button { 
    display:flex; 
    align-items:center; 

    border: none;
    background: none;
    color: ${({ theme }) => theme.COLORS.WHITE};
    padding: .5rem ;
  }
  

input {
    background: transparent;
    padding: .5rem;
    
    color: ${({ theme, $isNew }) => $isNew ? theme.COLORS.LIGHT_400 : theme.COLORS.WHITE};
        
    outline: none; 
    border: none;

    &::placeholder {
    color: ${({ theme }) => theme.COLORS.LIGHT_100};
}

}
`


