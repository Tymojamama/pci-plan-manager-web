module.exports = function () {
  var result = {};
  switch(process.env.NODE_ENV){
    case 'development':
      result.host = "localhost";
      result.port = 8080;
      break;
    default:
      result.host = "ec2-52-37-104-20.us-west-2.compute.amazonaws.com";
      result.port = 80;
      break;
  }
  return result;
};
