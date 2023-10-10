/* eslint-disable @typescript-eslint/no-explicit-any */
import Data from 'models/Data';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        let allDatas;
        if (query.search) {
          const search = query.search.toString();
          const limit = query.limit ? parseInt(query.limit.toString()) : 20;
          const page = query.page ? parseInt(query.page.toString()) : 1;
          allDatas = await Data.find({ name: new RegExp(search, 'i') })
            .limit(limit)
            .skip((page - 1) * limit);
        } else {
          allDatas = await Data.find({}); // Retorna todos los datos si no hay parámetro de búsqueda
        }
        return res.status(200).json(allDatas);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newData = new Data(body);
        const savedData = await newData.save();
        return res.status(201).json(savedData);
      } catch (error: any) {
        console.error('Error stack:', error.stack);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default handler;
