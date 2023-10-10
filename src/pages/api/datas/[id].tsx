/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import Data from 'models/Data';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req: any, res: any) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await Data.findById(id);
        return res.status(200).json({ data });
      } catch (error: any) {
        return res.status(500).json({ msg: error.message });
      }
    case 'PUT':
      try {
        const updateData = await Data.findByIdAndUpdate(id, body);
        if (!updateData) return res.status(404).end(`Data not found`);
        return res.status(200).json({ updateData });
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    case 'DELETE':
      try {
        const deleteRack = await Data.findByIdAndDelete(id);
        if (!deleteRack) return res.status(404).end(`Data not found`);
        return res.status(204).json({ deleteRack });
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
