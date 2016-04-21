module.exports = function () {
  switch(process.env.NODE_ENV){
    case 'development':
      return {
        host: "localhost",
        port: 8080
      }

    case 'production':
      return {
        host: "ec2-52-37-104-20.us-west-2.compute.amazonaws.com",
        port: 80
      }

    default:
      return {
        host: "ec2-52-37-104-20.us-west-2.compute.amazonaws.com",
        port: 80
      }
  }
};
