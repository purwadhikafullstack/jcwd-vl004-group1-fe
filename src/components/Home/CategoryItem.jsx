import styled from "styled-components";
import { mobile } from "../../assets/styles/responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 30vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10%;
  box-shadow: 5px 10px 8px #888888;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(193deg, rgba(1,1,1,0.7796160700608368) 0%, rgba(255,255,255,0.2950222325258228) 100%);
  background-blend-mode: soft-light;
  border-radius: 20px;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
    font-weight: bold;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color: teal;
    cursor: pointer;
    font-weight: 600;
    border-radius: 15px;
    box-shadow: 3px 3px 2px black;
    &:hover {
      background-color:turquoise;
      color: white;
      opacity: 0.9
    }
`;


const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to="/catalog" state={item.id}>
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
