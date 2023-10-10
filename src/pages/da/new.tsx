import { DataProps } from 'interface/type';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RegisterRack: React.FC = () => {
  const { query, push } = useRouter();
  const [newData, setNewData] = useState<DataProps>({
    name: '',
    firstValue: 0,
    secondValue: 0,
    status: 1,
  });
  const getData = async () => {
    try {
      const res = await fetch(`/api/datas/${query.id}`);
      const { data } = await res.json();
      setNewData({
        name: data.name,
        firstValue: data.firstValue,
        secondValue: data.secondValue,
        status: data.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getData();
    }
  }, [query.id]);

  const createData = async () => {
    try {
      const response = await fetch(`/api/datas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        push('/da/list');
        console.log('response', response);
        toast.success('Data registrado');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      const response = await fetch(`/api/datas/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        push('/da/list');
        console.log('response', response);
        toast.success('Data actualizado');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setNewData({ ...newData, [id]: value });
  };

  const handleStatusChange = () => {
    setNewData({ ...newData, status: newData.status === 1 ? 0 : 1 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.id) {
      await updateData();
    } else {
      await createData();
    }
  };
  return (
    <div className='text m-auto flex h-full min-h-[90vh] w-full flex-col items-center justify-center px-10 py-4 sm:w-2/5  '>
      <form onSubmit={handleSubmit}>
        <div className='flex w-full flex-col items-center justify-center gap-5 '>
          <h1 className='-bold self-start text-3xl font-bold'>
            {query.id ? 'Update Data' : 'Register Data'}
          </h1>
          <h1 className='self-start text-lg  text-gray-400'>Nombre</h1>
          <input
            id='name'
            onChange={handleChange}
            value={newData.name}
            className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2 sm:h-2/6'
            type='text'
            placeholder='Name'
          />
          <h1 className='self-start text-lg  text-gray-400'>First Value</h1>
          <input
            id='firstValue'
            onChange={handleChange}
            value={newData.firstValue}
            className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2 sm:h-2/6'
            type='number'
            placeholder='First Value'
            min={0}
          />
          <h1 className='self-start text-lg  text-gray-400'>Second Valuer</h1>
          <input
            id='secondValue'
            onChange={handleChange}
            value={newData.secondValue}
            className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2 sm:h-2/6'
            type='text'
            placeholder='Second Value'
            min={0}
          />
          {query.id ? (
            <div className='flex items-center justify-between'>
              <label className='relative inline-flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  className='peer sr-only'
                  checked={newData.status === 1}
                  onChange={handleStatusChange}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                <span className='ml-3 text-sm font-medium text-gray-900'>
                  {newData.status === 1 ? 'Activo' : 'Inactivo'}
                </span>
              </label>
            </div>
          ) : null}

          <button
            type='submit'
            className='h-[50px] w-[300px] rounded-md bg-primary text-white'
          >
            {query.id ? 'Update' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterRack;
