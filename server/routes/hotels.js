const express = require('express')
const { getSearchCurrentResults, searchHotels } = require('../controllers/hotelsSearch')
const router = express.Router()

// /search initiates the search method, that goes to the mockAPI and starts getting the data.
router.get('/search', (req, res, next) => {

  console.log('/search')

  const { location, groupSize, toDate, fromDate } = req.query
  // const userId = req.user.id
  try {
    const searchSucceeded = searchHotels({ location, groupSize, fromDate, toDate, userId: req.user?.id ?? 0 })
    if (!searchSucceeded) {
      throw new Error('Search failed')
    }
    return res.send('ok')
  } catch (error) {
    return res.status(500).send('An error occured', error.message)
  }
  // send the user if everything is ok
})

// /fetch-results return the current-state of the search results
router.get('/fetch-results', (req, res, next) => {
  const { user: id } = req

  console.log('/fetch-results')

  const results = getSearchCurrentResults(id)
  if (!results) {
    return res.status(404).send('No results found')
  }
  return res.send(results)
})

module.exports = router