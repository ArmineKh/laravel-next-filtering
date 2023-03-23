import Head from 'next/head'
import axios from 'axios'
import { useState, useEffect } from 'react'

export async function getStaticProps(){
  const data = await axios.get('http://localhost:8000/api/apartments')
              
  return {
    props: {
    apartments: data.data
      }
  }
}
const priceValues = [
  { range: '1000-10000', text: '$1000 - $10000' },
  { range: '10000-100000', text: '$10000 - $100000' },
];

export default function Home({apartments}) {

  const [query, setQuery] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [storeys, setstoreys] = useState('');
  const [garages, setGarages] = useState('');
  const [priceRangeValue, setPriceRangeValue] = useState('');

  const apartmentSearch = (array) => {
    return array
    .filter((el) =>
    el.name.toLowerCase().includes(query.toLowerCase())
    )
    .filter((item) => item.bedrooms.indexOf(bedrooms) != -1)
    .filter((item) => item.bathrooms.indexOf(bathrooms) != -1)
    .filter((item) => item.storeys.indexOf(storeys) != -1)
    .filter((item) => item.garages.indexOf(garages) != -1)
    .filter((item) => item.price > priceRangeValue.split('-')[0] && item.price < priceRangeValue.split('-')[1])
    
  } 

  const filtered = apartmentSearch(apartments);

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

    return (
        <>
          <Head>
            <title>Laravel</title>
          </Head>

          <div className='w-11/12 m-auto mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0'>
            <input onchange={handleChange} type='text' name="name" placeholder='Apartment name...' value={query} />
            <input onchange={(e) => setBedrooms(e.target.value)} type='text' name="bedrooms" placeholder='Bedrooms...' value={bedrooms} />
            <input onchange={(e) => setBathrooms(e.target.value)} type='text' name="bathrooms" placeholder='Bathrooms...' value={bathrooms} />

            <input onchange={(e) => setstoreys(e.target.value)} type='text' name="storeys" placeholder='Storeys...' value={storeys} />
            <input onchange={(e) => setGarages(e.target.value)} type='text' name="garages" placeholder='Garages...' value={garages} />
            <select
              value={priceRangeValue}
              onChange={(e) => {
                setPriceRangeValue(e.target.value);
              }}
            >
              {priceValues.map((option, index) => (
                <option value={option.range}>{option.text}</option>
              ))}
              
            </select>
          </div>

            <div className='w-11/12 m-auto md:grid mt-10 gap-10 md:grid-cols-4 flex flex-col'>

              { filtered.map((country) => (
                <div className='bg-white shadow-lg rounded-md overflow-hidden h-[25rem] cursor-pointer'>
                  <span className='px-3 py-2 block font-bold text-xl'>{country.name}</span>
                  <span className='px-3 py-2 block'><span className='font-bold'>Bedrooms:</span> <span className='font-light'>{country.bedrooms}</span></span>
                  <span className='px-3 py-2 block'><span className='font-bold'>Bathrooms:</span> <span className='font-light'>{country.bathrooms}</span></span>
                  <span className='px-3 py-2 block'><span className='font-bold'>Storeys:</span> <span className='font-light'>{country.storeys}</span></span>
                  <span className='px-3 py-2 block'><span className='font-bold'>Garages:</span> <span className='font-light'>{country.garages}</span></span>
                  <span className='px-3 py-2 block'><span className='font-bold'>Price:</span> <span className='font-light'>{country.price}</span></span>
                </div>
              ))}
            </div>            
        </>
    )
}
