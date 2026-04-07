const BASE_URL = "https://69cc08610b417a19e07bb791.mockapi.io/products";

export async function getProducts() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("No se encontró el recurso");
      }

      if (res.status >= 500) {
        throw new Error("Error del servidor");
      }

      throw new Error(`Error HTTP: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("Error al traer productos:", error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error al traer producto:", error);
    return null;
  }
}