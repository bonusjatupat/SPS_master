const ENDPOINT_SERVER = {
  PROTOCOL: "http",
  HOST: "10.17.246.141",
  SUBDIR: "",
  PORT: 3030
};
const SOCKET_SERVER = {
  PROTOCOL: "http",
  HOST: "10.17.246.141",
  PORT: 3031
};
const IMAGE_SERVER = {
  PROTOCOL: "http",
  HOST: "10.17.246.141",
  SUBDIR: "",
  PORT: 3030
};
var API_ENDPOINT_URL = `${ENDPOINT_SERVER.PROTOCOL}://${ENDPOINT_SERVER.HOST}${
    ENDPOINT_SERVER.PORT == 80 ? "" : ":" + ENDPOINT_SERVER.PORT
  }${ENDPOINT_SERVER.SUBDIR ? "/" + ENDPOINT_SERVER.SUBDIR : ""}`,
  IMAGE_SERVER_URL = `${IMAGE_SERVER.PROTOCOL}://${IMAGE_SERVER.HOST}${
    IMAGE_SERVER.PORT == 80 ? "" : ":" + IMAGE_SERVER.PORT
  }${IMAGE_SERVER.SUBDIR ? "/" + IMAGE_SERVER.SUBDIR : ""}`,
  WEB_URL = `${ENDPOINT_SERVER.PROTOCOL}://${ENDPOINT_SERVER.HOST}${
    ENDPOINT_SERVER.PORT == 80 ? "" : ":" + ENDPOINT_SERVER.PORT
  }`,
  SOCKET_DOMAIN = `${SOCKET_SERVER.PROTOCOL}://${SOCKET_SERVER.HOST}${
    SOCKET_SERVER.PORT == 80 ? "" : ":" + SOCKET_SERVER.PORT
  }`;
export default {
  API_ENDPOINT_URL,
  IMAGE_SERVER_URL,
  WEB_URL,
  SOCKET_DOMAIN,
  GOOGLE_PLACE_API_KEY: "AIzaSyAAxTAPRoE1jq1qq3G0fdpzE0TsAoxd9Wo"
  //GOOGLE_PLACE_API_KEY: "AIzaSyAgllGbgAK5jkHBIvf2NwdwVChIvOWVC9k" // "AIzaSyAAxTAPRoE1jq1qq3G0fdpzE0TsAoxd9Wo" // 'AIzaSyAgllGbgAK5jkHBIvf2NwdwVChIvOWVC9k'
};
