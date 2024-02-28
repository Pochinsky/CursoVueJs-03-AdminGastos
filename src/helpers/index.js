export const formatQuantity = (quantity) =>
  Number(quantity).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

export const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const formatDate = (date) => {
  const newDate = new Date(date);
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return newDate.toLocaleDateString("es-CL", dateOptions);
};
