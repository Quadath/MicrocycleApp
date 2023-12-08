import React, {useState} from 'react'
import {Text, Pressable, View, StyleSheet} from 'react-native'

const ExerciseItem = ({name}) => {
    const [counter, setCounter] = useState(0);
    return (
        <View style={styles.element}>
            <Text style={styles.name_text}>{name}</Text>
            <View style={styles.button_block}>
                <Pressable onPress={() => console.log("pressed")} style={styles.patch_button}>
                    <Text style={styles.button_text}>Edit</Text>
                </Pressable>
                 <Pressable onPress={() => console.log("pressed")} style={styles.delete_button}>
                    <Text style={styles.button_text}>Delete</Text>
                 </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    element: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        height: 30
    },
    name_text: {
        fontSize: 18
    },
    button_block: {
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'stretch',
        zIndex: 10,
    },
    delete_button: {
        flex: 1,
        ...this.button,
        backgroundColor: "#ff4444",
    },
    patch_button: {
        flex: 1,
        ...this.button,
        backgroundColor: "#4444ff",
    },
    button_text: {
        textAlign: "center"
    }
})

export default ExerciseItem;