module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-algorithm-trainer/" : "/",
  devServer: {
    host: process.env.PUBLIC_IP,
  },
};