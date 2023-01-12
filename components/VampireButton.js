import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function VampireButton(props) {
    const { text, size, type, fnc } = props;
    const getSizes = () => {
        var sizes = [
            {
                id: "large",
                props: {
                    width: windowWidth * .9,
                    height: windowHeight * .1,
                },
            },
            {
                id: "medium",
                props: {
                    width: windowWidth * .6,
                    height: windowHeight * .07,
                },
            },
            {
                id: "small",
                props: {
                    width: windowWidth * .4,
                    height: windowHeight * .05,
                }
            }
            
        ];
        let found = sizes.find(({id}) => size == id);
        return found.props;
    }
    const getSizesText = () => {
        var sizes = [
            {
                id: "large",
                props: {
                    fontSize:32,
                },
            },
            {
                id: "medium",
                props: {
                    fontSize:24,
                },
            },
            {
                id: "small",
                props: {
                    fontSize:18,
                }
            }
            
        ];
        let found = sizes.find(({id}) => size == id);
        return found.props;
    }
    const getType = () => {
        var types = [
            {
                id: "primary",
                props: {
                    backgroundColor: "red",
                },
            },
            {
                id: "secondary",
                props: {
                    backgroundColor: "black",
                },
            },
            {
                id: "third",
                props: {
                    backgroundColor: "gray",
                }
            }
            
        ];
        let found = types.find(({id}) => type == id);
        return found.props;
    }
    return (
        <TouchableOpacity style={[styles.button, getSizes(), getType()]} onPress={fnc}>
            <Text style={[styles.buttonText, getSizesText()]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin:3,
    },
    buttonText:{
        color:"white",
    },
});
