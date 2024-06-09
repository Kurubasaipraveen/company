import React, {useState, useEffect} from 'react'

const TransactionTable = ({
  month,
  search,
  page,
  setPage,
  setMonth,
  setSearch,
}) => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://run.mocky.io/v3/2ba98125-e510-4867-aea0-797a48306707`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        let filteredTransactions
        if (month === 0) {
          // If All months is selected, display all transactions
          filteredTransactions = data
        } else {
          // Otherwise, filter transactions by selected month
          filteredTransactions = data.filter(transaction => {
            const transactionMonth =
              new Date(transaction.dateOfSale).getMonth() + 1
            return transactionMonth === month
          })
        }
        setTransactions(filteredTransactions)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [month])

  const filteredTransactions = transactions.filter(
    transaction =>
      transaction.title.toLowerCase().includes(search.toLowerCase()) ||
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.price.toString().includes(search),
  )

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * 10,
    page * 10,
  )

  return (
    <div>
      <h2>Transaction Table</h2>
      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price.toFixed(2)}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>
                {transaction.image ? (
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    width="50"
                  />
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * 10 >= filteredTransactions.length}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TransactionTable
