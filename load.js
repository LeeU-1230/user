firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let ref = db.collection('Users');

let login_account = document.getElementById('login_account');
let login_password = document.getElementById('login_password');
let login_btn = document.getElementById('login_btn');
let create_account = document.getElementById('create_account');
let create_password = document.getElementById('create_password');
let creat_btn = document.getElementById('creat_btn');

login_btn.addEventListener('click', function () {
    let user = {
        email: login_account.value,
        pwd: login_password.value
    };

    firebase.auth().signInWithEmailAndPassword(user.email, user.pwd)
        .then((u) => {
            console.log(u.user.uid);
            // 取得登入當下的時間
            let date = new Date();
            let now = date.getTime();

            // 記錄相關資訊到 Cloud Firestore
            ref.doc(u.user.uid).set({
                signup: now,
                email: user.email
            }).then(() => {
                // 登入成功後顯示訊息
                alert('成功登入');
            });
        }).catch(err => {
            // 登入失敗時顯示錯誤訊息
            alert(err.message);
        });

        login_account.value = '';
        login_password.value = '';
})

creat_btn.addEventListener('click', function () {
    let user = {
        email: create_account.value,
        pwd: create_password.value
    };

    firebase.auth().createUserWithEmailAndPassword(user.email, user.pwd)
        .then((u) => {
            console.log(u.user.uid);
            // 取得註冊當下的時間
            let date = new Date();
            let now = date.getTime();

            // 記錄相關資訊到 Cloud Firestore
            ref.doc(u.user.uid).set({
                signup: now,
                email: user.email
            }).then(() => {
                // 儲存成功後顯示訊息
                alert('使用者建立完成');
            });
        }).catch(err => {
            // 註冊失敗時顯示錯誤訊息
            alert(err.message);
        });

        create_account.value = '';
        create_password.value = '';
})
