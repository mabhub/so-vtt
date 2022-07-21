exports.handler = async event => {
  if (!['POST'].includes(event.httpMethod)) {
    return { statusCode: 405 };
  }

  return {
    statusCode: 200,
    body: event.body,
  };
};
