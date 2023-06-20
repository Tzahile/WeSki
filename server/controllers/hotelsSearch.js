const { getHotelsMock } = require("../apis/hotelsSimulator")

let requestDetails = {}
let isSearching = false

const searchHotels = ({ location, groupSize, fromDate, toDate, userId }) => {
  // We want to perforem multiple requests with various group size
  requestDetails[userId] = {}
  isSearching = true

  const searchPromises = [0, 1, 2, 3].map(async groupSizeVariations => {
    const searchResult = await getHotelsMock({ location, fromDate, toDate, groupSize: groupSize + groupSizeVariations })
    const accommodations = searchResult?.body?.accommodations ?? []

    accommodations.forEach(accommodation => {
      if (!requestDetails[userId][accommodation.HotelCode]) requestDetails[userId][accommodation.HotelCode] = accommodation
    })
    // requestDetails[userId].push(...accommodations)
    console.log("after pushing, requestDetails is: ", requestDetails[userId])
  })
  Promise.allSettled(searchPromises).then(() => {
    console.log("All search requests are done")
    isSearching = false
  })
  return true
}

const getSearchCurrentResults = (userId = 0) => {
  console.log("fetching, requestDetails is: ", requestDetails[userId])
  return {
    values: Object.values(requestDetails[userId]),
    done: !isSearching
  }
}

module.exports = {
  searchHotels,
  getSearchCurrentResults
}
