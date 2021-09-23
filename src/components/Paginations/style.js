import styled from "styled-components";

// export const ModalFulllB = styled.section`

// `;
export const FigurePagination = styled.div`
  margin-right: 5px;
  margin-bottom: 50px;
  width: 100%;
  max-width: 160px;
  /* max-width: 350px; */
  height: auto;
  background-color: #fff;
`;
export const DfiguregP = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  max-width: 130px;
  margin-right: 60px;
  /* background-color: red; */
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const ImgcardP = styled.img`
  max-width: 180px;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #f3f3f3;
  @media (max-width: 1200px) {
    max-width: 130px;
    display: flex;
  }
`;
export const DobtnP = styled.div`
  width: 100%;
  max-width: 99%;
  margin: 2px;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #f3f3f3;
`;
export const PagP = styled.div`
  position: relative;
  background-color: #810101;
  color: #fff;
  width: 30px;
  /* margin-left: 15px; */
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DobtImageP = styled.img`
  position: relative;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAotJREFUSEvFls1NAzEQhbMSd0gFhAoIFRAqACogVECogFABSQUkFQAVECoAKiBUANw4IIX3oTFyvLbXgEQsjdbaHc+befPjrVorWtWKcFs/Al4sFl05ui/pmOD33OSmqqqH0kAagQW2IWMnkoGEPevZwNjjxKa9f9VzJBnLCfbJlQUW6IFOXhrgVM9rySw0as719A39Iwmgx9JDP7qSwDJGhBeSR8lARma5CNw3ncMBot62c+PYuSiwB0qUgGZpCw0bA4AT/anOs19aNWCj90paUx3ol0SZ0pGtiYHvhYwtAZunT1KmeHq5SKWLUxuxaDzaKUZStC7Z8e2FwEMpnElqHkboxGBLxno5Viznt9I5ly72v1YITC6vcxRbpPSyA6Ry6eFkBRvl+9Jp14BtONzrw2HKiIHSXqTiw4ys6Ukf587RZtQNdH8Nme+IZdTR3E7lVjrQ29H3jk+vRQRT0aitdl58un3gCfSFRgMAgDels+W/L9kLnDROdJb5sBQxRrPF4lGNEX8uY5CeTy5j69u+H3EjMFYNnJy5uQ3t5JgRCWvRlQPm0O4faGSG41AKOEn1UCfo4VxxYZi2OPatK5o51KeAm4qrq8NN7eTaAqB3Ca2EQHeSaq826u1k+SsZIIA74RhFRnHl8kub0TGuLmqTy9H97yMTj6CRiwLw5HVoVyftUbvyXP4tt8xpRmU3eUkY3S6P0LdURNFyzbwsvhY9T5ku/H2QNy7y3/wIcL6fKrqSXx+KB/BZScR2DQJKl0T/PrBT8rNH1FzkPKnOu5ABy+WuRUiquL36OWdLf2+hHsEBlj+ricy1yZv2FNuoKT2NwD69dme7OQ0gi1S4/mdftH4EXGSxUGllwJ9CglEuqzBeFQAAAABJRU5ErkJggg==");
  width: 100%;
  max-width: 50%;
  height: 50%;
  /* background: red; */
  background-repeat: no-repeat;
  background-size: contain;
`;

export const TxtcardsP = styled.div`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  /* background-color: red; */
`;
export const TxcardP = styled.text`
  width: 100%;
  max-width: 100%;
  font-size: 15px;
  color: #000;
  font-weight: 800;
  height: 20px;
  padding: 2px 5px;
  /* background-color: #fff; */
`;
export const Txtcard_fillP = styled.text`
  width: 100%;
  max-width: 100%;
  font-size: 10px;
  color: #4d4c4c;
  padding: 5px 5px;
  /* background-color: #fff; */
`;

export const NumberPaginations = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ResultPaginations = styled.div`
  width: 100%;
  max-width: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ListPagination = styled.li`
  text-decoration: none;
  list-style-type: none;
  width: 20px;
  margin-right: 30px;
  font-weight: 900;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PaginationBox = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const InformL = styled.button`
  position: relative;
  background-color: #810101;
  color: #fff;
  width: 40px;
  max-width: 20px;
  margin-right: 5px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  min-width: 100%;
  max-width: 100%;
  background-color: #ccc;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

export const PaginationButton = styled.div`
  display: flex;
  min-width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationItem = styled.div`
  margin: 0 10px;
  cursor: pointer;

  ${(props) =>
    props.isSelect && {
      background: "#000",
      color: "#fff",
      padding: "0 5px",
    }}
`;
