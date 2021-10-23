import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {color} from '../style/default';
import styles from '../style/field';
import axios from 'axios';

const List = ({navigation}) => {
  const [page, setpage] = useState(1);
  const [offset, setoffset] = useState(7);
  const [datas, setDatas] = useState([]);

  console.log('page', page);

  useEffect(() => {
    loadUser();
  }, [page]);

  const loadUser = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: 'http://maimaid.id:8002/user/read',
        data: {
          page,
          offset,
        },
      });
      if (datas.length !== 0) {
        setDatas([...datas, ...data.data.rows]);
      } else {
        setDatas(data.data.rows);
      }
    } catch (error) {
      console.log('err', error);
      alert('load failure', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: 1,
            paddingVertical: 50,
          }}>
          <Text style={styles.underBtnText1}>{item.fullname}</Text>

          <Text style={styles.underBtnText1}>{item.email} </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Update', {id: item.id});
            }}>
            <Text style={styles.underBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  console.log('length data', datas.length);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderWidth: 1,
        }}>
        <Text style={styles.underBtnText1}>Name</Text>
        <Text style={styles.underBtnText1}>Email</Text>
        <Text style={styles.underBtnText}> </Text>
      </View>
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index.toString()}
        onEndReachedThreshold={1}
        onEndReached={() => {
          console.log('reached');
          if (datas.length == page * offset) {
            setpage(page + 1);
          }
        }}
      />
    </View>
  );
};

export default List;
