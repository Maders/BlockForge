import { join } from 'path';
import crypto from 'crypto';
import {
  createWriteStream,
  promises as fsPromises,
  constants as fsConstants,
} from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

import { DB_DIR_NAME } from '~/features/editor/constatns';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const json = req.body;

    const hash = crypto
      .createHash('md5')
      .update(JSON.stringify(json))
      .digest('hex');

    const dataDir = join(process.cwd(), DB_DIR_NAME);
    const filePath = join(dataDir, `${hash}.json`);

    try {
      await fsPromises.access(filePath, fsConstants.F_OK);
      return res
        .status(200)
        .json({ message: 'File already exists', name: hash });
    } catch {}

    await fsPromises.mkdir(dataDir, { recursive: true });

    const writeStream = createWriteStream(filePath);
    writeStream.write(JSON.stringify(json, null, 2));
    writeStream.end();

    return res
      .status(200)
      .json({ message: 'The wall saved successfully', name: hash });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}
