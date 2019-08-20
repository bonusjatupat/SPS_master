import { StyleSheet } from "react-native";

export default StyleSheet.create({
  blackScreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000"
  },
  grayScreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1D1D1D"
  },
  whiteScreen: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  logoSizing: {
    width: 150,
    height: 26
  },
  whiteText: {
    color: "#FFFFFF",
    backgroundColor: "transparent"
  },
  backgroundVideo__overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  },
  backgroundVideo__video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.4,
    zIndex: -2
  },
  profileImageButton: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  profileImageButton__dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D0021B",
    position: "absolute",
    top: 0,
    right: 0
  },
  profileImageButton__image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden"
  },
  editProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  editProfileImage__changeBtn: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#F5A623",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  editProfileImage__image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden"
  },
  seperator: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  seperator_right: {
    alignItems: "flex-end"
  },
  seperator__line: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: 1,
    backgroundColor: "#E4E4E4"
  },
  seperator__text: {
    color: "#9B9B9B",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    fontWeight: "bold"
  },
  seperator__link: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15
  },
  seperator__link_text: {
    color: "#9B9B9B",
    fontWeight: "bold"
  }
});
