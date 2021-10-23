import {StyleSheet} from 'react-native';
import {color, style} from './default';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: color.white,
    padding: 20,
  },

  input: {
    backgroundColor: color.darkGrey,
    padding: style.paddingTextInput,
    borderRadius: 5,
    marginVertical: style.marginTextInput,
    color: color.white,
    fontSize: 14,
  },
  underBtnContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  underBtnText: {
    color: color.fbColor,
    textDecorationLine: 'underline',
  },
  underBtnText1: {
    width: 150,
    color: color.black,
    paddingVertical: 10,
  },
  underBtnText2: {
    color: color.darkGrey,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 30,
  },
  bottomContainer: {
    marginTop: 50,
    justifyContent: 'flex-start',
  },

  checkBox: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  submit: {
    backgroundColor: color.fbColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    color: color.white,
    fontSize: 14,
  },

  submit1: {
    backgroundColor: color.white,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    color: color.darkGrey,
    fontSize: 14,
    borderWidth: 1,
  },
});

export default styles;
