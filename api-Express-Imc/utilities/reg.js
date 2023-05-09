const regemail =new RegExp (/([-_A-Za-z]){2,20}[@]{1}[A-Za-z]{1,5}[.]{1}[A-Za-z]{2,5}/);/*^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$*/ 
const regpassword= new RegExp(/[-/*+_0-9a-zA-Z]{2,15}/);/*^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$*/
const word = new RegExp(/^[A-Za-z0-9]+([,;:_\s]{1}[A-Za-z0-9]+)*[!.?]?$/)
const rate= new RegExp(/^[0-5]?$/)
const year= new RegExp(/^(-)?([0-9]){1,4}$/)
const userId= new RegExp(/[-a-zA-Z0-9]+/)
const weight= new RegExp(/^[1-9][0-9]{1,2}$/)
const height= new RegExp(/^[1-3][0-9]{1,2}$/)
const img= new RegExp(/[+*'\]\[@-_\\\/a-zA-Z0-9\s]+/) /* ^[^<>]*$ ^(?!.*\bchat\b).*$ */ /*interdiction element <>  interdiction de chat*/
const tabReg={
    mail:regemail,
    pass:regpassword,
    id:userId,
    nom:word,
    prenom:word,
    poid:weight,
    poids:weight,
    taille:height,
    genre:word,
    grade:rate,
    rating:rate,
    averageRating:rate,
    imageUrl:img
}

module.exports=tabReg;