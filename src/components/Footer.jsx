import styled from "styled-components";
import { mobile } from "../assets/styles/responsive.js";
import { Link} from "react-router-dom";


const Container = styled.div`
  display: flex;
  margin: 0px 10px;
  border-radius: 15px;
  background: linear-gradient(355deg, rgba(1,1,1,0.9084676106770834) 0%, rgba(49,104,121,0.9868989832261029) 100%);
  box-shadow: 5px 5px 5px grey;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: white;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  color: white;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  color: white;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>SHOESSHOP</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Link to="">
              <i className="fab fa-facebook-f"></i>
            </Link>
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Link to="">
              <i className="fab fa-instagram"></i>
            </Link>
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Link to="">
              <i className="fab fa-youtube"></i>
            </Link>
          </SocialIcon>
          <SocialIcon color="E60023">
            <Link to="">
              <i className="fab fa-pinterest-p"></i>
            </Link>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Jordan Shoes</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Golf Shoes</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Running SHoes</ListItem>
          <ListItem>Catalog</ListItem>
          <ListItem>Basketball Shoes</ListItem>
          <ListItem>About Us</ListItem>
          <ListItem>Lifestyle Shoes</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          +62 818 356 890
        </ContactItem>
        <ContactItem>
        customerservice@shoesshop.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
