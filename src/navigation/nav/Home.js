import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Animated,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { logOut } from "../../redux/actions";
import { colors, fonts } from "../../themes/themes";
const { width, height } = Dimensions.get("window");

let currentUser;

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    username: "",
    qrtext: "",
    showQRCode: false,
    user: {}
  };
  AnimatedScale = new Animated.Value(1);
  componentDidMount() {
    this.getCurrentUser();
    this.animate();

    console.log("About to mount");
  }

  getCurrentUser = () => {
    Auth.currentSession().then(
      function(session) {
        // console.log(JSON.stringify(session));
      },
      function(err) {
        console.log(err);
      }
    );
    Auth.currentAuthenticatedUser().then(user => {
      this.setState({ user: user });
      // console.log("USER: " + JSON.stringify(user));
    });
  };
  logout() {
    Auth.signOut()
      .then(() => {
        this.props.dispatchLogout();
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  generateQRCode = () => {
    //this.setState({ showQRCode: !this.state.showQRCode });
  };

  navigate() {
    this.props.navigation.navigate("Route1");
  }
  animate() {
    Animated.timing(this.AnimatedScale, {
      toValue: 0.8,
      duration: 1250,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(this.AnimatedScale, {
        toValue: 1,
        duration: 1250,
        useNativeDriver: true
      }).start(() => this.animate());
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.welcome}>{this.state.user.username}</Text>
          <Animated.Image
            source={require("../../assets/boomboxcropped.png")}
            style={{
              tintColor: colors.primary,
              width: width / 2,
              height: width / 2,
              transform: [{ scale: this.AnimatedScale }]
            }}
            resizeMode="contain"
          />

          <Text
            onPress={() => {
              this.generateQRCode();
            }}
            style={styles.welcome}
          >
            Generate your QR Code
          </Text>

          <Text
            onPress={() => {
              this.generateQRCode();
            }}
            style={styles.welcome}
          >
            Scan Vendor QR Code
          </Text>

          <Text onPress={this.logout.bind(this)} style={styles.welcome}>
            Logout
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  homeContainer: {
    alignItems: "center"
  },
  welcome: {
    fontFamily: fonts.light,
    color: "rgba(0, 0, 0, .85)",
    marginBottom: 26,
    fontSize: 22,
    textAlign: "center"
  },
  registration: {
    fontFamily: fonts.base,
    color: "rgba(0, 0, 0, .5)",
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
