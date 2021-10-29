import * as React from 'react'
import { Link } from 'gatsby'
import Table from '../components/Table'

import Navbar from '../components/Layout/Navbar'

const IndexPage = ({ serverData }) => {
  // Sort countries from api response
  const sortedCountries = serverData['response'].sort((a: any, b: any) =>
    a.continent > b.continent ? 1 : -1
  )

  // Define column headers for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Continent',
        accessor: 'continent'
      },
      {
        Header: 'Country',
        accessor: 'country',
        Cell: (e: any) => (
          <Link to={`/country/${e.value}`}>
            <p className='cursor-pointer hover:bg-indigo-500 max-w-min p-1 hover:text-white rounded-md'>
              {e.value}
            </p>
          </Link>
        )
      },
      {
        Header: 'Total Cases',
        accessor: 'cases.total'
      },
      {
        Header: 'Active Cases',
        accessor: 'cases.active'
      },

      {
        Header: 'Last Update',
        accessor: 'time',
        Cell: (e: any) => {
          let lastUpdate = e.value.replace('T', ' ')
          lastUpdate = lastUpdate.slice(0, lastUpdate.length - 9)
          return <p>{lastUpdate}</p>
        }
      },
      {
        Header: 'Population',
        accessor: 'population'
      }
    ],
    []
  )

  return (
    <>
      <Navbar />
      <div className='w-full m-auto min-h-screen bg-gray-100 flex justify-center overflow-x-hidden'>
        <title>COVID-19</title>
        <div className='w-full flex-col px-2 md:px-0 justify-center max-w-max'>
          <h1 className='text-4xl font-bold mt-10'>COVID CASES</h1>
          <p className='mt-2 text-gray-500 mb-1 break-words'>
            Click on the name of a country to find the details about it.
          </p>
          <p className='mt-2 text-gray-500 mb-7 break-words'>
            Also, click on the header of the column to sort it.
          </p>
          <div className='w-full mb-10 flex-col justify-center mt-10 px-5 lg:px-0'>
            <Table columns={columns} data={sortedCountries} />
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage

export async function getServerData() {
  try {
    const res = await fetch('https://covid-193.p.rapidapi.com/statistics', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': '67f1b9b329msh37f1aaceb84a3aep18c5fejsn7dd88e237824'
      }
    })
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json()
    }
  } catch (error) {
    return {
      headers: {
        status: 500
      },
      props: {}
    }
  }
}
