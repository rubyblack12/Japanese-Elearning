console.log("day la router")

var root = null;
var useHash = true; // Defaults to: false
// var hash = '#!'; // Defaults to: '#'
// var router = new Navigo(root, useHash, hash);
var router = new Navigo(root, useHash);

router.on('/sign-up', function() {
    console.log('this is dang ky ')
    document.getElementById('body').innerHTML = `<register-screen></register-screen>`
}).resolve();

router.on('/sign-in', function() {
    console.log("trang dang nhap")
    document.getElementById('body').innerHTML = `<login-screen></login-screen>`
}).resolve();

router.notFound(function() {
    document.getElementById("body").innerHTML = `<h1>Trang khong ton tai</h1>`
})
router.on(function() {
    // router.navigate("/sign-in")
    document.getElementById("body").innerHTML = `<index-screen></index-screen>`
}).resolve()

router.on('/index', function() {
    // router.navigate("/sign-in")
    document.getElementById("body").innerHTML = `<index-screen></index-screen>`
}).resolve()

router.on('/create-course', function() {
    // router.navigate("/sign-in")
    document.getElementById("body").innerHTML = `<create-course-screen></create-course-screen>`
}).resolve()
router.on('/course', function() {
    // router.navigate("/sign-in")
    document.getElementById("body").innerHTML = `<course-screen></course-screen>`
}).resolve()
router.on('/course/', function() {
    // router.navigate("/sign-in")
    document.getElementById("body").innerHTML = `<course-screen></course-screen>`
}).resolve()
router.on('/register-course', function() {
    // router.navigate("/sign-in")
    document.getElementById("body").innerHTML = `<register-screen-course></register-screen-course>`
}).resolve()
router.on('/N1', function() {
    document.getElementById("body").innerHTML = "<lesson-list course='n1'></lesson-list>"
}).resolve()
router.on('/N2', function() {
    document.getElementById("body").innerHTML = "<lesson-list course='n2'></lesson-list>"
}).resolve()
router.on('/N3', function() {
    document.getElementById("body").innerHTML = "<lesson-list course='n3'></lesson-list>"
}).resolve()
router.on('/N4', function() {
    document.getElementById("body").innerHTML = "<lesson-list course='n4'></lesson-list>"
}).resolve()
router.on('/N5', function() {
    document.getElementById("body").innerHTML = "<lesson-list course='n5'></lesson-list>"
}).resolve()
window.router = router;