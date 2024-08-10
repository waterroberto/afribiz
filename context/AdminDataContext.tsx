import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/config/firebase.config";
import { UserDataType } from "@/interface";


type IAuthAdmin = {
  users: UserDataType []
  withdrawalRequests?: any []
  depositRequests?: any []
  loginsData?: any
  fetchingData: boolean

}

const initialState: IAuthAdmin = {
  users: [],
  withdrawalRequests: [],
  depositRequests: [],
  loginsData: [],
  fetchingData: false
};

const AdminDataContext = createContext(initialState);

export const AdminDataProvider = ({ children }: {children:React.ReactNode}) => {
  const [users, setUsers] = useState<UserDataType []>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState(null);
  const [depositRequests, setDepositRequests] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("isAdmin", "==", false));

        const q3 = query(collection(db, "submittedLogins"));

        const USERS:  UserDataType[]  = [];

        const userSnapshot = await getDocs(q);
        userSnapshot.forEach((doc) => {
          const body = doc.data() as UserDataType
          USERS.push(body);
        });





        setUsers(USERS);
      }
      setFetchingData(false);
    });
  }, [auth]);



  return (
    <AdminDataContext.Provider
      value={{ users, fetchingData } }
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export default AdminDataContext;
