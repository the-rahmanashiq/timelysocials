// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modifyPayload = (values: any) => {
  const obj = { ...values };
  const file = obj.file;
  delete obj.file;
  const data = JSON.stringify(obj);
  const formData = new FormData();
  if (file) formData.append("file", file as Blob);
  formData.append("data", data);

  return formData;
};
