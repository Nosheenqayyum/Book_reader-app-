import React, { useEffect, useState } from 'react';
import colors from '../../../utils/colors';
import window from '../../../utils/window';
import filter from '../../assets/filter.png';
import SearchIcon from '../../assets/SearchIcon.png';
// import BooksMiddleware from '../../../middlewares/Books';
//mport AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';

import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  CheckBox,
} from 'react-native';
// import { black } from 'react-native-paper/lib/typescript/styles/colors';

export default ({ value, onChange }) => {
  const [isSelectedAllCategory, setSelectionAllCategory] = useState(false);
  const [isSelectedLittleBookSpecial, setSelectionLittleBookSpecial] = useState(false);
  const [isSelectedStoryWorkCollective, setSelectionStoryWorkCollective] = useState(false);
  const { navigate } = useNavigation();


  const [isSelectedEbook, setSelectionEbook] = useState(false);

  const [search, setSearch] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const onChangeSearch = (value) => {
    setSearch(value)
  }


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={false}

      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <View style={styles.dropStyle}>

              <ModalDropdown dropdownStyle={styles.dropStyle1} options={['option 1', 'option 2']} />
            </View>

          </View>
        </View>
      </Modal>

      <Image source={SearchIcon} style={styles.search} />

      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.seachBox}
        placeholder="Search"
      />

      {/* <TouchableOpacity
        onPress={() => navigate('filter')
        }

      >
        <Image
          source={filter} style={styles.filter}
        />

      </TouchableOpacity> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: window.width * 0.9,
    justifyContent: 'space-around',
    padding: 5,
  },
  dropStyle: {
    fontSize: 17,
    height: 46,
    width: 230,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 12,
    paddingBottom: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary,
  },
  dropStyle1: {
    fontSize: 17,
    width: 230,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 7,
    paddingBottom: 0,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: -15,
    marginTop: 20,

  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  search: {
    marginLeft: 10,
    color: colors.gray,
    width : 24,
    height : 24
  },
  filter: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
    zIndex: 2,
  },
  seachBox: {
    width: window.width * 0.7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  checkbox: {
  },
  label: {
    margin: 8,
  },
});
