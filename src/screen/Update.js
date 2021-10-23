import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {color} from '../style/default';
import styles from '../style/field';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const Update = ({route, navigation}) => {
  const {id} = route.params;

  useEffect(() => {
    userDetails();
  }, []);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  const [fixDate, setFixDate] = useState('');
  const [open, setOpen] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [form, setForm] = useState({
    fullname: true,
    email: true,
    password: false,
    confirmPassword: false,
    fixDate: true,
  });

  const userDetails = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: 'http://maimaid.id:8002/user/view',
        data: {
          id,
        },
      });

      setFullname(data.data.fullname);
      setEmail(data.data.email);
      setGender(data.data.gender);

      const darr = data.data.dob.split('-');
      const ISOFormat = new Date(
        parseInt(darr[2]),
        parseInt(darr[1]) - 1,
        parseInt(darr[0]),
      );
      setDate(ISOFormat);
    } catch (error) {
      console.log('err', error);
    }
  };

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

  const handleUpdate = async () => {
    try {
      await axios({
        method: 'POST',
        url: 'http://maimaid.id:8002/user/update',
        data: {
          id,
          fullname,
          email,
          password,
          gender,
          dob: fixDate,
        },
      });

      navigation.navigate('List');
      console.log('success');
    } catch (error) {
      console.log('err', error);
      alert('Update Fail', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setFullname(text)}
        onEndEditing={() => checkName()}
        value={fullname}
        // placeholder={details.fullname}
        placeholderTextColor={color.white}
      />
      <TextInput
        style={styles.input}
        onChangeText={email => setEmail(email)}
        onEndEditing={() => checkEmail()}
        value={email}
        // placeholder={details.email}
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

      <TouchableOpacity
        disabled={
          form.fullname &&
          form.email &&
          form.password &&
          form.confirmPassword &&
          form.fixDate
            ? false
            : true
        }
        style={
          form.fullname &&
          form.email &&
          form.password &&
          form.confirmPassword &&
          form.fixDate
            ? styles.submit
            : styles.submit1
        }
        onPress={() => handleUpdate()}>
        <Text style={styles.underBtnText2}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Update;
