import { BASE_URL } from "./constants"
import { IUser } from "./userInterface"
import { order } from "./usersEnum";

const getUsers = async (limit: number | undefined , sort: order | undefined): Promise<IUser[]> => {
  if (limit !== undefined && sort !== undefined) {
    const response: Response = await fetch(`${BASE_URL}?limit=${limit}&sort=${sort}`);
    const data: IUser[] = await response.json();
    return data;
  }

  if (limit !== undefined) {
    const response: Response = await fetch(`${BASE_URL}?limit=${limit}`);
    const data: IUser[] = await response.json();
    return data;
  }

  if (sort !== undefined) {
    const response: Response = await fetch(`${BASE_URL}?sort=${sort}`);
    const data: IUser[] = await response.json();
    return data;
  }

  const response: Response = await fetch(`${BASE_URL}`);
  const data: IUser[] = await response.json();
  return data;
}

export {
  getUsers,
}