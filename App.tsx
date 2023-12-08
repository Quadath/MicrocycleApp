import React, {useState, useEffect} from 'react'
import {Text, View, Pressable, TextInput, ActivityIndicator, FlatList, SafeAreaView} from 'react-native'

import ExerciseItem from './Components/ExerciseItem'

import styles from './Styles/App'

type Exercise = {
    name: string,
    _id: string
}

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Exercise[]>([]);
  const [text, setText] = useState('');

  const getExercises = async () => {
    try {
      const response = await fetch('http://95.31.196.92:3000/exercises');
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
  <SafeAreaView>
    <View>
    <Text style={styles.header_text}>Exercises</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
        <FlatList
          data={data}
          keyExtractor={({_id}) => _id}
          renderItem={({item}) => (
          <ExerciseItem name={item.name}/>
          )}
        />
            <View style={styles.new_exercise_block}>
             <TextInput
                    style={styles.input}
                    onChangeText={text => setText(text)}
                    value={text}
                    placeholder="New exercise"
                  />
              <Pressable>
                <Text>+</Text>
              </Pressable>
             </View>
        </View>
      )}
    </View>
  </SafeAreaView>

  );
};


module.exports = App;