/**
 * Write data to a temporary "file" (localStorage)
 * Returns the key used to store the data
 */
export const writeTempFile = (data: any, fileName = "tempFormData"): string => 
{
  const content = JSON.stringify(data);
  localStorage.setItem(fileName, content);
  return fileName;
};

/**
 * Append data to an existing temporary "file"
 */
export const appendTempFile = (fileName: string, newData: any) => 
{
  const existingData = readTempFile(fileName) || {};
  const updatedData = { ...existingData, ...newData };
  localStorage.setItem(fileName, JSON.stringify(updatedData));
};

/**
 * Read data from a temporary "file"
 */
export const readTempFile = (fileName: string): any | null => 
{
  const content = localStorage.getItem(fileName);
  return content ? JSON.parse(content) : null;
};

/**
 * Delete a temporary "file"
 */
export const deleteTempFile = (fileName: string) => 
{
  localStorage.removeItem(fileName);
};
