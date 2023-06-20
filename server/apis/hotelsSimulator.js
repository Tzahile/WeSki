const axios = require('axios');

const mockURL = "https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator"

const getHotelsMock = async ({ location, fromDate, toDate, groupSize }) => {
  const res = await axios.post(mockURL, {
    query: {
      "ski_site": location,
      "from_date": fromDate,
      "to_date": toDate,
      "group_size": groupSize
    }
  })
  return res.data
}

module.exports = {
  getHotelsMock
}