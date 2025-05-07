import { update,ref,onValue } from "firebase/database";
import { db } from "./firebase";

 export const lockBike = async (uid: string) => {

    try {
    //   update(ref(db,`settings/mobile/${pathdb}`), updates);
      update(ref(db,"locked"), { uid: true });
      return 
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating uid:', error.message);
      } else {
        console.error('Error updating uid:', error);
      }
      return
    }
  };


  export const unLockBike = async (uid: string) => {

    try {
    //   update(ref(db,`settings/mobile/${pathdb}`), updates);
      update(ref(db,"locked"), { uid: false });
      return 
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating uid:', error.message);
      } else {
        console.error('Error updating uid:', error);
      }
      return
    }
  };

    

  export const isBikeLocked = async (uid: string) => {
    try {
      const bikeRef = ref(db, `locked/${uid}`);
      onValue(bikeRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          console.log('Bike is locked:', data);
          return true
        } else {
          console.log('Bike is not locked');
          return false
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error checking bike lock status:', error.message);
        return false
      } else {
        console.error('Error checking bike lock status:', error);
        return false
      }
    }
  }
