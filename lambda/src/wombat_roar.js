/*
  This function roars. Like a wombat.
*/
exports.handler = (event, context, callback) => {
  console.log('Roaring.', event);

  const wombat_response = {
    event,
    message: 'Rawr, mate.'
  };

  callback(null, wombat_response);
};
