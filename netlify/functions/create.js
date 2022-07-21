const headers = {
  Authorization: `Token ${process.env.BASEROW_WRITE}`,
  'Content-Type': 'application/json',
};

const POST = { method: 'POST', headers };
const maxLoops = 20;
const validUrl = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig;

const prepareEvent = ({ loops, ...rest }) => {
  const date = rest.date.split('T')[0];
  const { place: { city } = {} } = rest;

  return {
    ...rest,
    key: `${date}-${city}`,
    date,
    city,
    link: rest.link?.match(validUrl) ? rest.link : null,
    place: rest.place.label,
    postcode: rest.place.postcode,
    'place.json': JSON.stringify(rest.place, null, 2),
  };
};

const createEvent = async data => {
  const response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_EVENTS_TABLE}/?user_field_names=true`,
    {
      ...POST,
      body: JSON.stringify(data),
    },
  );

  return response.json();
};

const createLoop = event => async loop => {
  const response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_LOOPS_TABLE}/?user_field_names=true`,
    {
      ...POST,
      body: JSON.stringify({
        ...loop,
        key: `${event.date}-${event.city}-${loop.sport}-${loop.distance}`,
        event: [event.id],
      }),
    },
  );

  return response.json();
};

exports.handler = async ({ httpMethod, body }) => {
  if (!['POST'].includes(httpMethod)) {
    return {
      statusCode: 405, // Method Not Allowed
    };
  }

  const srcEvent = JSON.parse(body);

  if (!srcEvent.loops) {
    return {
      statusCode: 400, // Bad Request
      body: JSON.stringify({ message: 'At least 1 loop is required' }),
    };
  }

  if (srcEvent.loops.length >= maxLoops) {
    return {
      statusCode: 400, // Bad Request
      body: JSON.stringify({ message: 'Too many loops' }),
    };
  }

  try {
    const event = await createEvent(prepareEvent(srcEvent));
    const loops = await Promise.all(srcEvent.loops.map(createLoop(event)));

    return {
      statusCode: 201, // Created
      body: JSON.stringify({ event, loops }, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
