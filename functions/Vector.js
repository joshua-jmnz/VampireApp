import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let Vectores = {};

Vectores.vw = (num) => {
    return windowWidth * num / 100;
};
Vectores.vh = (num) => {
    return windowHeight * num / 100;
};
export default Vectores;