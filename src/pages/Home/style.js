import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";

export const Container = styled.div`

display: grid; 
grid-template-columns: auto 1fr; 
grid-template-rows: auto 1fr; 
grid-template-areas: 
  "menu header"
  "menu content";

  width: 100%;
  height: 100vh;
  overflow: hidden;

main {
  display: flex;
  flex-direction: column;
  grid-area: content;
  padding: 1.2rem;

  overflow-y: auto;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    gap: .6rem;

    margin-top: 3.2rem;


    .imgDish {
      display: flex;
      align-items: center;
      flex-direction: column;

      padding: 1.6rem;

      width: 100%;

      text-align: center;

      color: ${({ theme }) => theme.COLORS.WHITE};

      background-color: ${({ theme }) => theme.COLORS.DARK_600};

      border-radius: 1rem;

      h3 {
        font-size: 2.4rem;
        font-weight: 600;
        color: ${({ theme }) => theme.COLORS.WHITE};
      }

      p {
        margin-block: 2rem;
        font-size: 1.6rem;
      }

    }

    .options-Dish {
      width: 100%;

      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      padding-left: 3rem;

      margin-top: 2.6rem;

    }


    label {
      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.COLORS.WHITE};

      cursor: pointer;

      span {
        font-size: 2rem;
      }

    }

  }

  .Snack, .Drinks, .Desserts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 2.2rem;

    z-index: 0;
    
    h2 {
      font-size: 2.4rem;
      font-weight: 500;

      color: ${({ theme }) => theme.COLORS.WHITE};
      margin-top: 3.2rem;
      margin-left: 3.6rem;
    }
    
    
    .mySwiper {
      padding-bottom: 4rem;
      padding-inline: 2rem;
      width: 100%;

      h2 {
        color: white;
      }
      
      .mySwiperSlide {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .swiper-pagination-bullet {
        background-color: white;
      }
      
      .swiper-pagination-bullet-active {
        background-color: ${({ theme }) => theme.COLORS.ORANGE};
      }
      .swiper-button-prev, .swiper-button-next {
        color: ${({ theme }) => theme.COLORS.ORANGE}; 
      }
      
      .swiper-button-prev::after, .swiper-button-next::after {
        transition: filter .5s;
        font-size: 3rem;
      }
      
      .swiper-button-prev {
        left: .2rem; 
      }
      
      .swiper-button-next {
        right: .2rem; 
      }
      
      .swiper-button-prev:hover::after, .swiper-button-next:hover::after {
        filter: brightness(0.6);
      }
      
    }
  }
    
    @media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
      padding: 1.4rem 6.4rem;

      header {
        flex-direction: column;

        .options-Dish {
          flex-direction: row;
        }

        .imgDish {

          p {
            font-size: 2rem;
          }

        }


      }

    }

    
    
    
  }
  

`
