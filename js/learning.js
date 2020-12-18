//create: tao document


function addData() {
    firebase.firestore().collection('users').add({
        name: "Khiemssssss",
        email: "Khiem@gmail.com",
        password: "123456"
    });
}
//get all
async function read() {
    let data = await firebase.firestore().collection('users').get();
    let parserData = data.docs.map(function (doc) {
        let dataDoc = doc.data()
        dataDoc = { ...dataDoc, id: doc.id }
        return dataDoc;
    })
    console.log(parserData)
}
//search by 
async function searchUserByName(keyword) {
    let data = await firebase.firestore().collection("users").where('name', '==', keyword).get()
    console.log(data)
}
//find Id
async function findOneUser(id) {
    let data = await firebase.firestore().collection('users').doc(id).get();
    console.log(data.data())
}

//update
async function updateUser(data, id) {
    await firebase.firestore().collection("users").doc(id).update({
        name: data
    })
}
// updateUser("khiem", "EWmeSC0Lx05Znv4WZFmx")
//delete
async function deleteUser(id) {
    await firebase.firestore().collection("users").doc(id).delete()
}