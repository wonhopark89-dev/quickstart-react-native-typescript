const YELLOW_COLOR = '#ffa801';
const BLACK_COLOR = '#1e272e';
const DARK_GREY = '#d2dae2';
const LIGHT_GREY = '#808e9b';

export const getTheme = (isDark) => {
  if (isDark === true) {
    return darkTheme;
  } else {
    return lightTheme;
  }
};

const darkTheme = {
  tabBar: BLACK_COLOR,
  tabBarActiveTint: YELLOW_COLOR,
  tabBarInactiveTint: DARK_GREY,
  header: BLACK_COLOR,
  headerTitle: 'white',
};

const lightTheme = {
  tabBar: 'white',
  tabBarActiveTint: BLACK_COLOR,
  tabBarInactiveTint: LIGHT_GREY,
  header: 'white',
  headerTitle: BLACK_COLOR,
};
