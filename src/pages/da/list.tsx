/* eslint-disable react-hooks/exhaustive-deps */
import { DataProps } from 'interface/type';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import useDebounce from '../hooks/debounce';

const ListData: React.FC = () => {
  const [newData, setNewData] = useState<DataProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page] = useState<number>(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const isFirstRender = useRef(true);

  // Función para obtener datos
  const getData = async (search?: string) => {
    try {
      const url = search
        ? `/api/datas?search=${search}&limit=20&page=${page}`
        : `/api/datas`;
      const res = await fetch(url);
      const datas = await res.json();
      setNewData(datas);
    } catch (error) {
      console.log(error);
    }
  };

  // Efecto para manejar la búsqueda
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    getData(debouncedSearchTerm);
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      const intervalId = setInterval(() => {
        getData();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [debouncedSearchTerm, page]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className='flex min-h-[90vh] flex-col items-center bg-gray-100 p-4'>
      <input
        type='text'
        placeholder='Search by name'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {newData.length ? (
        <div className='flex flex-row flex-wrap items-center justify-center gap-5'>
          {newData.map((data: DataProps) => (
            <div
              key={data._id}
              className='flex min-h-[200px] w-[200px] flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg'
            >
              <h1 className='mb-2 text-xl font-bold'>{data.name}</h1>
              <p className='text-gray-700'>First Value: {data.firstValue}</p>
              <p className='text-gray-700'>Second Value: {data.secondValue}</p>
              <p className='text-gray-700'>
                Create At: {formatDate(data.createdAt)}
              </p>
              <p className='text-gray-700'>
                Update At: {formatDate(data.updatedAt)}
              </p>
              <p
                className={`text-sm ${
                  data.status === 1 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {data.status === 1 ? 'Activo' : 'Inactivo'}
              </p>
              <Link
                className='mt-4 inline-block rounded bg-yellow-500 p-2 text-white hover:bg-yellow-700'
                href={`/da/${data._id}/edit`}
              >
                Editar
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Link
            className='absolute top-5 left-5 rounded bg-blue-500 p-2 text-white hover:bg-blue-700'
            href='/da/new'
          >
            Register Data
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListData;
