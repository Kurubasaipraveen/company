// src/components/Statistics.js
import React, {useState, useEffect} from 'react'

const Statistics = ({month}) => {
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    totalSoldItem: 0,
    totalNotSoldItem: 0,
  })

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/2ba98125-e510-4867-aea0-797a48306707',
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()

        const monthFilteredTransactions =
          month === 0
            ? data
            : data.filter(transaction => {
                const transactionMonth =
                  new Date(transaction.dateOfSale).getMonth() + 1
                return transactionMonth === month
              })

        const totalSale = monthFilteredTransactions.reduce(
          (sum, transaction) => sum + transaction.price,
          0,
        )
        const totalSoldItem = monthFilteredTransactions.filter(
          transaction => transaction.sold,
        ).length
        const totalNotSoldItem =
          monthFilteredTransactions.length - totalSoldItem

        setStatistics({
          totalSale,
          totalSoldItem,
          totalNotSoldItem,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchStatistics()
  }, [month])

  return (
    <div className="statistics-container">
      <h2>Transactions Statistics</h2>
      <div className="statistics-box">
        <p>Statistics for Month {month === 0 ? 'All' : month}</p>
        <p>Total sale: ${statistics.totalSale.toFixed(2)}</p>
        <p>Total sold items: {statistics.totalSoldItem}</p>
        <p>Total not sold items: {statistics.totalNotSoldItem}</p>
      </div>
    </div>
  )
}

export default Statistics
