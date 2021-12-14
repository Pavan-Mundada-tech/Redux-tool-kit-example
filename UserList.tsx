import React, {FunctionComponent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store';
import {FlatList, StyleSheet, Text, View,Image} from 'react-native';
import {fetchUsers, User} from './userListSlice';

const UserList: FunctionComponent = () => {
  const dispatch = useDispatch();
  const screenState = useSelector((state: RootState) => state.userList);

  useEffect(() => {
    dispatch(fetchUsers({page: 1}));
  }, []);

  const handleOnEndReached = () => {
    if (!screenState.loading) {
      dispatch(fetchUsers({page: screenState.nextPage}));
    }
  };
  return (
    <>
      {!screenState.loading && !screenState.error && <Text>Loading</Text>}
      {screenState.error && <Text>Error</Text>}
      {screenState.users && !screenState.error && <Text>UserList</Text>}
      <FlatList
        data={screenState.users}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        renderItem={({item}) => {
          return <UserListItem user={item}/>
        }}
        onEndReached={handleOnEndReached}
      />
    </>
  );
};

const UserListItem: FunctionComponent<{user: User}> = ({user}) =>{
    return (
        <View style={styles.container}>
        <Image style={styles.thumbnail} source = {{ uri: user.picture.thumbnail}}/> 
        <Text style={styles.nameText}>{user.name.first}</Text>

      </View>
    )
}

const styles = StyleSheet.create({
    nameText : {
        padding:15
    },
    container:{
        flexDirection:'row',
        padding:15,
        alignItems:'center'
    },
    thumbnail:{
        width:50,
        height:50,
        borderRadius:30,
        borderColor:'purple',
        borderWidth:3,
    }
})

export default UserList;
