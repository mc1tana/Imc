
const uuid=require('uuid');
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3001

const fs = require('fs');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser.json());
app.use(cors());

const saveUser = data => {
    fs.writeFileSync("user.json", JSON.stringify(data));
};
const saveImc = data => {
    fs.writeFileSync("Imc.json", JSON.stringify(data));
};
const getImc = () => {
    const contentImcJson = fs.readFileSync("Imc.json");
    const Imcs = JSON.parse(contentImcJson);
    return Imcs;
};
const getImcByMail = (mail) => {
    const contentImcJson = fs.readFileSync("Imc.json");
    const Imcs = JSON.parse(contentImcJson);
    let imcsUser=[];
    Imcs.forEach((elt)=>{
        if(elt.id==mail){
            imcsUser.push(elt)
        }
    })
    return imcsUser;
};
const getUsers = () => {
    const contentUserJson = fs.readFileSync("user.json");
    const users = JSON.parse(contentUserJson);
    return users;
};
const getUserByMail=(mail)=>{
    const contentUserJson = fs.readFileSync("user.json");
    const users = JSON.parse(contentUserJson);
    let user
    users.forEach((e)=>{if(e.mail==mail){
        user=e;
    } })  
    return user;
};

app.post("/Connexion", (req, res) => {
    var userConnect=req.body;
    let u=getUserByMail(userConnect.mail);
   if(u==undefined){
    return res.json({msg : 'erreur Mail!!', error:true})
   }else if(u.pass!=userConnect.pass){
    return res.json({msg : 'erreur Password!!', error:true})
   }else
   return res.json({msg : 'Connexion Ok!!', error:false,u})
  
});

app.post("/creationUser", (req, res) => {
    const long1 = getUsers().length;
    var user = req.body;
    user.id=uuid.v4();
    console.log(user);
    var result = "c good";
const Vmail = VerifMailExist(user.mail ,  getUsers());
   console.log(Vmail);
   if(Vmail==false){
    var listuser = [...getUsers(), user]
    saveUser(listuser);
    var long2 = getUsers().length;
    if (long1 < long2) {
        result = "Enregistrement ok";
    } else {
        result = "Enregistrement ko";
    }
}else{
    result="Cette Adresse Mail Est Deja Utilisé!!!"
}
    return res.json({ msg: result });
});
app.post("/creation", (req, res) => {
    const long1 = getTodos().length;
    const todo = req.body;
    console.log(todo);
    var result = "c good";
    const listTodo = [...getTodos(), todo]
    saveTodo(listTodo);
    const long2 = getTodos().length;
    if (long1 < long2) {
        result = "Enregistrement ok";
    } else {
        result = "Enregistrement ko";
    }
    return res.json({ msg: result });
});

app.post("/ImcSaisi", (req, res) => {
    
    const long1 = getImc().length;
    var imcelt = req.body;
    var ImcEtat =EtatImc(imcelt.Poids/Math.pow(imcelt.Taille/100,2));
    console.log(ImcEtat)
    var imc={
        date:new Date().toLocaleDateString(),
        imc: imcelt.Poids/Math.pow(imcelt.Taille/100,2),
        id:imcelt.id,
        poids:imcelt.Poids,
        taille:imcelt.Taille,
        etat:ImcEtat
    }
   
    var listimc = [...getImc(), imc]
    saveImc(listimc);
    var long2 = getImc().length;
    if (long1 < long2) {
        result = "Enregistrement ok";
    } else {
        result = "Enregistrement ko";
    }
    return res.json({ msg: result });
});

app.post("/ImcSemaine", (req, res) => {
    var Mail=req.body;
    var userImcs=getImcByMail(Mail.mail);
    var dateToDay= Date.now()
    var ImcSemaine=[];
   userImcs.forEach((e)=>{
    // console.log(e)
    var tdate=e.date.split('/')
    var d =new Date(tdate[2], tdate[1],  tdate[0])
   
    if((dateToDay-(86400000*7))<d.getTime()){
        ImcSemaine.push(e)      
    }
  })
         return res.json({ImcSemaine,error:false});
});


app.post("/ImcMois", (req, res) => {
    var Mail=req.body;
    var userImcs=getImcByMail(Mail.mail);
    var dateToDay= Date.now()
    var ImcMois=[];
   userImcs.forEach((e)=>{
    // console.log(e)
    var tdate=e.date.split('/')
    var d =new Date(tdate[2], tdate[1],  tdate[0]) 
    if((dateToDay-(86400000*30))<d.getTime()){
        ImcMois.push(e)      
    }
  })
  
         return res.json({ImcMois,error:false});
});
app.post("/ImcLast", (req, res) => {
    var lastImc;
    var Mail=req.body;
    var dVerif=new Date();
    var userImcs=getImcByMail(Mail.mail);
   userImcs.forEach((e)=>{
    // console.log(e)
    var tdate=e.date.split('/')
    
    var d =new Date(tdate[2], tdate[1],  tdate[0]) 

    if(dVerif.getTime()<d.getTime()){
        dVerif=new Date(d);
        lastImc=e.imc;  
        console.log(lastImc);         
        console.log("imcdjs");         
    }
  })
 
         return res.json({lastImc,error:false});
});

app.listen(port, () => {
    console.log(`Connexion sur le port ${port}`)
})

function VerifMailExist(stringMail , listUser){
    let verif=false;
listUser.forEach(element => {
    if(stringMail==element.mail && stringMail!=''){
        verif = !verif
    }
});
 return verif;
}
function VerifPassExist(stringPass , listUser){
    let verif=false;
    let i=1;
    console.log(listUser);
listUser.forEach(element => {
    if(stringPass==element.pass && i ==1){
        verif = !verif
        i++    
    }
});
 return verif;
}
function EtatImc(imc){
     var etat={};
     console.log(imc);
  if( imc<18.5 ){ 
    etat={
        imcEtat:"maigreur",
        descriptionImc:"Votre poids apparaît trop faible par rapport à votre taille. Ce faible indice de masse corporel (IMC) est peut-être la conséquence d'une pathologie, mais elle-même peut exposer à un certain nombre de risques pour votre santé (carences, anémie, ostéoporose...). Parlez-en avec votre médecin traitant. Il pourra rechercher la cause de cette maigreur et vous conseiller."
    };}else if(imc>=18.5 && imc<25){
        etat={
            imcEtat:"normal",
            descriptionImc:"Votre poids est adapté à votre taille. Gardez vos habitudes alimentaires pour conserver un indice de masse corporel (IMC) idéal et un poids qui vous assure un état de santé optimal. Une alimentation équilibrée, sans excès de matières grasses, associée à une activité physique régulière vous aideront à maintenir votre poids idéal."
        };} else if(imc>=25 &&imc<30){
            etat={
                imcEtat:"surpoids",
                descriptionImc:"Votre poids commence à devenir trop élevé par rapport à votre taille. A long terme, un indice de masse corporel (IMC) élevé a des conséquences sur la santé. L'excès de poids entraîne un risque accru de maladies métaboliques (diabète), cardiaques, respiratoires, articulaires et de cancer. Si vous souhaitez commencer un régime pour perdre du poids, parlez-en au préalable avec votre médecin traitant. Au-dessus de 30, l'indice de masse corporelle peut indiquer une obésité."
            };}else if(imc>=30){
        etat={
            imcEtat:"obésité",
            descriptionImc:"Votre poids est trop élevé par rapport à votre taille. Du point de vue médical, l'obésité est un excès de masse grasse ayant des conséquences sur la santé. L'excès de poids entraîne un risque accru de maladies métaboliques (diabète), cardiaques, respiratoires, articulaires et de cancer. Si vous souhaitez commencer un régime pour perdre du poids, parlez-en au préalable avec votre médecin traitant."
        };}
  console.log(etat)
 return etat;
}