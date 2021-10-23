import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {color} from '../style/default';
import styles from '../style/field';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import md5 from 'md5';

const List = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('1');
  const [date, setDate] = useState(new Date());
  const [fixDate, setFixDate] = useState('');
  const [open, setOpen] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [form, setForm] = useState({
    fullname: false,
    email: false,
    password: false,
    confirmPassword: false,
    fixDate: false,
  });

  const checkName = () => {
    console.log('fullname ====', fullname === '');

    if (/^[a-zA-Z\s]*$/.test(fullname)) {
      if (fullname.length < 4 || fullname === '') {
        Alert.alert('your Name Must be more than 3 Character');
        setForm(prevState => ({
          ...prevState,
          fullname: false,
        }));
      } else {
        console.log('accepted');
        setForm(prevState => ({
          ...prevState,
          fullname: true,
        }));
      }
    } else {
      Alert.alert('Your Name must be Letters');
      setForm(prevState => ({
        ...prevState,
        fullname: false,
      }));
    }
  };

  const checkEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)) {
      console.log('accepted');
      setForm(prevState => ({
        ...prevState,
        email: true,
      }));
    } else {
      Alert.alert('Your Email Must Valid');
      setForm(prevState => ({
        ...prevState,
        email: false,
      }));
    }
  };

  const checkPassword = () => {
    if (/^(?=.*\d)(?=.[a-zA-Z])[0-9a-zA-Z]{6,}$/.test(password)) {
      console.log('accepted');
      setForm(prevState => ({
        ...prevState,
        password: true,
      }));
    } else {
      Alert.alert('must contain letter and number and 6 character');
      setForm(prevState => ({
        ...prevState,
        password: false,
      }));
    }
  };

  const checkConfirmPassword = () => {
    if (password === confirmPassword) {
      console.log('accepted');
      setForm(prevState => ({
        ...prevState,
        confirmPassword: true,
      }));
    } else {
      Alert.alert('must same to password');
      setForm(prevState => ({
        ...prevState,
        confirmPassword: false,
      }));
    }
  };

  const dateValidation = dob => {
    const e = dob.toISOString().slice(0, 10);
    setDate(dob);
    setFixDate(e);
    setForm(prevState => ({
      ...prevState,
      fixDate: true,
    }));
  };

  const Submit = async () => {
    try {
      const md5Pass = md5(password);
      await axios({
        method: 'POST',
        url: 'http://maimaid.id:8002/user/create',
        data: {
          fullname,
          email,
          password: md5Pass,
          gender,
          dob: fixDate,
        },
      });
      alert('Input Data Success');
      console.log('success');
    } catch (error) {
      console.log('err', error);
      alert('submit failure', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setFullname(text)}
        onEndEditing={() => checkName()}
        value={fullname}
        placeholder="Full Name"
        placeholderTextColor={color.white}
      />
      <TextInput
        style={styles.input}
        onChangeText={email => setEmail(email)}
        onEndEditing={() => checkEmail()}
        value={email}
        placeholder="Email"
        placeholderTextColor={color.white}
      />
      <TextInput
        style={styles.input}
        onChangeText={password => setPassword(password)}
        onEndEditing={() => checkPassword()}
        value={password}
        placeholder="Password"
        placeholderTextColor={color.white}
      />
      <TextInput
        style={styles.input}
        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        onEndEditing={() => checkConfirmPassword()}
        value={confirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor={color.white}
      />

      <Text style={styles.underBtnText1}>Select Your Gender</Text>

      <Picker selectedValue={gender} onValueChange={setGender}>
        <Picker.Item label="Male" value="1" />
        <Picker.Item label="Female" value="2" />
      </Picker>

      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.underBtnText}>
          {' '}
          {fixDate ? 'Date Of Birth : ' + fixDate : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>

      <DatePicker
        mode={'date'}
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          dateValidation(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <View style={styles.checkBox}>
        <Text>Agree With Term and Condition</Text>

        <CheckBox
          disabled={
            form.fullname &&
            form.email &&
            form.password &&
            form.confirmPassword &&
            form.fixDate
              ? false
              : true
          }
          value={toggleCheckBox}
          onValueChange={value => setToggleCheckBox(value)}
        />
      </View>

      <TouchableOpacity
        disabled={toggleCheckBox ? false : true}
        style={toggleCheckBox ? styles.submit : styles.submit1}
        onPress={() => Submit()}>
        <Text style={styles.underBtnText2}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default List;
