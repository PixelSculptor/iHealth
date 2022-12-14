import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/database'
var storage = firebase.storage();
var storageRef = storage.ref();
import { ref } from 'vue'

const loadImage = (e) => {
  let file = e.target.files[0];
  var storageRef = firebase.storage().ref('images/' + file.name);
  let uploadTask = storageRef.put(file);


  uploadTask.on('state_changed', function (snapshot) {
}, function (error) {
}, function()  {
uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL)  {
  console.log('File available at', downloadURL);
});
});
  console.log(e.target.files[0]);
}

const useImage = () => {
  return { loadImage } 
}


export default useImage