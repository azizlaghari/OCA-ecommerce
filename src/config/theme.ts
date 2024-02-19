export interface Theme {
  primary: string;
  siderBg: string;
  headerBg: string;
  footerBg: string;
  border: string;
  white: string;
  constantWhite: string;
  black: string;
  constantBlack: string;
  borderLight: string;
  inputBorder: string;
  mainBlue: string;
  mainYellow: string;
  mainRed: string;
  gray: string;
  lightGray: string;
  darkGray: string;
  skyBlue: string;
  placeholder: string;
  mainGradient: string;
  boxShadow: string;
  textField: string;
  text: string;
  yellow: string;
  lightPink: string;
  darkGreen: string;
  lightGreen: string;
}

export const lightTheme: Theme = {
  primary: "#7E549F",
  siderBg: "#001529",
  headerBg: "rgba(255, 255, 255, 0.1)",
  footerBg: "#fff",
  border: "#f0f0f0",
  white: "#ffff",
  constantWhite: "#fff",
  black: "#000",
  constantBlack: "#000",
  borderLight: "#d9d9d9",
  inputBorder: "rgba(0, 0, 0, 0.10)",
  mainBlue: "#1E6CB6",
  mainYellow: "#FADD07",
  mainRed: "#F03D40",
  gray: "#E5E5E5",
  lightGray: "#F8F8F8",
  darkGray: "#718096",
  skyBlue: "#4DA8DD",
  placeholder: "#7A828A",
  // mainGradient: "linear-gradient(91deg, #F03D40 -0.73%, #FADD07 118.71%)",
  mainGradient:
    "linear-gradient(91deg, #73DDFF 13.08%, #3D67D4 71.93%, #8908A9 129.56%)",
  boxShadow: "0px 4px 15px 0px rgba(140, 140, 140, 0.50)",
  textField: "#F7F7F7",
  text: "#676767",
  yellow: "#FFC43A",
  lightPink: "#FFF4F4",
  darkGreen: "#007F00",
  lightGreen: "#CDFFCD",
};

export const darkTheme: Theme = {
  primary: "#7E549F",
  siderBg: "#001529",
  headerBg: "rgba(255, 255, 255, 0.5)",
  footerBg: "#fff",
  border: "#f0f0f0",
  white: "#ffff",
  constantWhite: "#fff",
  black: "#000",
  constantBlack: "#000",
  borderLight: "#d9d9d9",
  inputBorder: "rgba(0, 0, 0, 0.10)",
  mainBlue: "#1E6CB6",
  mainYellow: "#FADD07",
  mainRed: "#F03D40",
  gray: "#E5E5E5",
  lightGray: "#F8F8F8",
  darkGray: "#718096",
  skyBlue: "#4DA8DD",
  placeholder: "#7A828A",
  // mainGradient: "linear-gradient(91deg, #F03D40 -0.73%, #FADD07 118.71%)",
  mainGradient:
    "linear-gradient(91deg, #73DDFF 13.08%, #3D67D4 71.93%, #8908A9 129.56%)",
  boxShadow: "0px 4px 15px 0px rgba(140, 140, 140, 0.50)",
  textField: "#F7F7F7",
  text: "#676767",
  yellow: "#FFC43A",
  lightPink: "#FFF4F4",
  darkGreen: "#007F00",
  lightGreen: "#CDFFCD",
};
