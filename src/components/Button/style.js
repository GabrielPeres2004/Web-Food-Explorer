import styled from "styled-components";

export const Container = styled.button`
width: 100%;
height: 5.6rem;
padding: 1rem;
border: none;
border-radius: 1rem;
background-color: ${({ theme }) => theme.COLORS.RED};

color: ${({ theme }) => theme.COLORS.WHITE};

display: flex;
align-items: center;
justify-content: center;

> div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  i {
    display: flex;
    align-items: center;
    justify-content: center;
  }


}


&:disabled {
    opacity: .8;

    i {
      display: none;
    }

    .count{
      display: none;
    }
  }

  .spin {
    animation: spin 3s linear infinite;
    color: black;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`