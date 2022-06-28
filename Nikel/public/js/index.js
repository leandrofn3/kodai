const myModal = new bootstrap.Modal("#register-Modal");
let logged= sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//Logar no sistema

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email= document.getElementById("email-input").value;
    const passaword= document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account= getAccount(email);

    if(!account){
        alert("opps! Verifique o usuário ou a senha.");
        return
    }

    if(account) {
        if(account.passaword !== passaword){
            alert("opps! Verifique o usuário ou a senha.")
            return;
}        
        
        saveSession(email, checkSession);

        window.location.href= "home.html";
    }
      
});

//criar conta

document.getElementById("create-form").addEventListener("submit",function(e) { 
    e.preventDefault();

   
    const email= document.getElementById("email-create-input").value;
    const passaword= document.getElementById("password-create-input").value;
    
    if(email.length < 5) { 
        alert("preencha o campo com um e-mail válido.");
        return;
    }

    if (passaword.length < 8) {
        alert("Preencha a senha com no mínimo 8 digitos.");
        return;
    }

    saveAccount( {
        login: email,
        passaword: passaword,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso.")
});

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html"
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key); 

    if(account) {
        return JSON.parse(account);
    }
    return"";
}
    

   