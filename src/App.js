// src/App.js
import React, {useState, useEffect} from 'react'
import TransactionTable from './components/TransactionTable'
import Statistics from './components/Statistics'
import BarChartComponent from './components/BarChart'
import './App.css'

const App = () => {
  const [month, setMonth] = useState(0) // Default to 0 for All months
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [chartData, setChartData] = useState([])

  // Function to fetch and set chart data
  const fetchChartData = async selectedMonth => {
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/2ba98125-e510-4867-aea0-797a48306707',
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      const monthFilteredTransactions =
        selectedMonth === 0
          ? data
          : data.filter(transaction => {
              const transactionMonth =
                new Date(transaction.dateOfSale).getMonth() + 1
              return transactionMonth === selectedMonth
            })

      const priceRanges = [
        {range: '$0 - $50', count: 0},
        {range: '$51 - $100', count: 0},
        {range: '$101 - $150', count: 0},
        {range: '$151 - $200', count: 0},
        {range: '$201 - $250', count: 0},
        {range: '$251 - $300', count: 0},
        {range: '$301+', count: 0},
      ]

      monthFilteredTransactions.forEach(transaction => {
        if (transaction.price <= 50) {
          priceRanges[0].count += 1
        } else if (transaction.price <= 100) {
          priceRanges[1].count += 1
        } else if (transaction.price <= 150) {
          priceRanges[2].count += 1
        } else if (transaction.price <= 200) {
          priceRanges[3].count += 1
        } else if (transaction.price <= 250) {
          priceRanges[4].count += 1
        } else if (transaction.price <= 300) {
          priceRanges[5].count += 1
        } else {
          priceRanges[6].count += 1
        }
      })

      setChartData(priceRanges)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Fetch chart data when month changes
  useEffect(() => {
    fetchChartData(month)
  }, [month])

  return (
    <div className="container">
      <header className="header">
        <div>
          <select
            id="month"
            value={month}
            onChange={e => setMonth(parseInt(e.target.value))}
          >
            <option value="0">All</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <input
            type="text"
            id="search-box"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input"
          />
          <button onClick={() => setPage(1)} className="button">
            Search
          </button>
        </div>
      </header>

      <TransactionTable
        month={month}
        setMonth={setMonth}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
      />
      <Statistics month={month} />
      <BarChartComponent data={chartData} />
    </div>
  )
}

export default App
