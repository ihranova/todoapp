
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Fire {
    constructor(callback){
        this.init(callback)
    }
    init(callback){
        auth().onAuthStateChanged((user)=>{
            console.log(user);
            if(user){
                callback(null, user);
 
            }else{
                auth().signInAnonymously()
                .then(() => {
                  console.log('User signed in anonymously');
                })
            }
        })
    }

    addList(list){
        let ref = this.ref;
        ref.add(list);
    }
    updateList(list){
          let ref = this.ref;
          ref.doc(list.id).update(list);
    }

    //current user
    get userId(){
        return auth().currentUser.uid;
    }
    get ref(){
      return firestore().collection('users').doc(this.userId).collection("lists");
    }
    //get all lists
    getLists(callback){
        let ref = this.ref.orderBy('name');
        
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];
            snapshot.forEach(doc => {
                console.log('List ID: ', doc.data());
                
                lists.push({id:doc.id,...doc.data()})
              });
              callback(lists);
        });
    
    }
   

    detach(){
        this.unsubscribe();
    }
    
}
export default Fire;