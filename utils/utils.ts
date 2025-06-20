import { readFile, writeFile } from 'fs/promises';

export async function readJSON<T>(path: string): Promise<T> {
  try {
    const data: string = await readFile(path, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON:', error);
    throw error;
  }
}

export async function writeJSON<T>(path: string, data: T): Promise<string> {
  try {
    await writeFile(path, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
    return 'Data success saved';
  } catch (error) {
    console.error('Error writing JSON:', error);
    throw error;
  }
}

export function createTimeStampWithSkipDays(): Date {
  const skipDays = parseInt(process.env.SKIP_DAYS_COUNT || '0', 10);

  const now = new Date();

  now.setDate(now.getDate() + skipDays);

  return now;
}

export function createTimeStamp(): string {
  return createTimeStampWithSkipDays().toISOString();
}
