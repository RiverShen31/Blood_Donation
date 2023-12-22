import TeddyImg from "../../assets/giftItem/teddy.png";
import BagImg from "../../assets/giftItem/bag.jpg";
import BowlSetImg from "../../assets/giftItem/bowl-set.jpg";
import CactusImg from "../../assets/giftItem/cactus.png";
import GlassesImg from "../../assets/giftItem/glasses.png";
import HelmetImg from "../../assets/giftItem/helmet.png";
import LaptopBagImg from "../../assets/giftItem/laptop-bag.jpeg";
import ShampooImg from "../../assets/giftItem/shampoo.png";
import SucculentImg from "../../assets/giftItem/succulent.png";
import SuperTepidImg from "../../assets/giftItem/super-tepid.png";
import TeaSetImg from "../../assets/giftItem/tea-set.png";
import TeddyOctopusImg from "../../assets/giftItem/teddy-octopus.jpg";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

const imgArray = [
    TeddyImg,
    BagImg,
    BowlSetImg,
    CactusImg,
    GlassesImg,
    HelmetImg,
    LaptopBagImg,
    ShampooImg,
    SucculentImg,
    SuperTepidImg,
    TeaSetImg,
    TeddyOctopusImg
];

const Gift = () => {
    const {user} = useSelector((state) => state.auth);
    const [data, setData] = useState([]);

    const getGift = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}