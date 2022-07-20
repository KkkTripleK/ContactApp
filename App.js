const readKeyboardData = require('readline-sync');
const fs = require('fs');

let getData = require('./Data.json');
let Data = getData;
let Name;
let Phone = 0;
let index;
let mode;
let err = 0;

function menu(){
    console.clear();
    mode = ['Add','Modify','Delete','ShowAll','Find'];
    index = readKeyboardData.keyInSelect(mode,'Select what do you want to do:')+1;
    if(index != 0){
        console.log(`Command ${mode[index-1]}`);
        main();
    }
    else{
        console.log("OK see you!");
        return 0;
    }
}

function convertToString_Send(newData){
    convertObject = JSON.stringify(newData);
    fs.writeFileSync("Data.json",convertObject);
    console.log("Write success!");
}
    

function showList(){
    console.log("User Infomation:");
    Data.Contact.forEach(showFunction);
        function showFunction(content,index){
            console.log(`Num${index+1} Name: ${content.Name} Phone: ${content.Phone}`);
        }
}

function check(key){
    i = 0;
    result = Data.Contact.filter(function (localData){
        if(typeof key == "string"){
            console.log(localData.Name.toUpperCase());
            if(localData.Name.toUpperCase().includes(key.toUpperCase()) || localData.Phone.includes(key)){
                console.log("OK");
                i++;
                return localData;
            }
        }
    })
    if (i == 0 ){
        console.log("Empty");
    }
    console.log(typeof key);
    console.log(result);
}

function checkInputRule(inputName, inputPhone){
    err=0;
    for(i =0; i <= inputName.length; i++){
        let h = inputName.charAt(i);
        if (i == 0){
            if(h != (h.toUpperCase())){
                err ++;
            }
        }else if(h ==" "){
            if(inputName[i+1] != (inputName[i+1].toUpperCase())){
                err ++;
            }
        }else if(i != 0 && inputName[i-1] != " "){
            if(h != h.toLowerCase()){
                {
                    err++;
                }
            }
        }
    }
    if(inputPhone.length >= 8 && inputPhone.length <= 10){
        for (i = 0; i <= inputPhone.length; i++){
            if(isNaN(+inputPhone)){
                err++;
            }
        }
    }else{
        err++;
    }
    if (err != 0 ){
    console.log("Your infomation is not correct! Pls try again.");
    } 
    return err;
}

function main(){
    switch (index){
        case 1: {  //Add
            do{
                console.log("Name: ");
                Name = readKeyboardData.prompt();
                console.log("Phone: ");
                Phone = readKeyboardData.prompt();    
                //checkInputRule(Name);
                err = checkInputRule(Name, Phone);
            }while(err != false)
            //Convert String to Obj
            let newInfo = JSON.parse(`{"Name": "${Name}","Phone": "${Phone}"}`);
            Data.Contact.push(newInfo);
            console.log(Data.Contact);
            convertToString_Send(Data);
            break;
        }
        case 2:{ //Modify
            showList();
            //Enter the number of list
            console.log(`Select the user to Modify (From 1... ${Data.Contact.length}): `);
            input = readKeyboardData.prompt();
            do{
                console.log("Name: ");
                Name = readKeyboardData.prompt();
                console.log("Phone: ");
                Phone = readKeyboardData.prompt();    
                //checkInputRule(Name);
                err = checkInputRule(Name, Phone);
            }while(err != false)
                
                //Convert String to Obj
                let newInfo = JSON.parse(`{"Name": "${Name}","Phone": "${Phone}"}`);
                Data.Contact.splice(input - 1, 1, newInfo);
                convertToString_Send(Data);
            break;
        }
        case 3:{ //Delete
            showList();
            //Enter the number of list
            console.log(`Select the user to Delete (From 1... ${Data.Contact.length}): `);
            input = readKeyboardData.prompt();
            Data.Contact.splice(input - 1, 1);
            convertToString_Send(Data);
            break;
        }
        case 4:{ //ShowAll
            showList();
            break;
        }
        case 5:{ //Find
            console.log("Enter the key word: ");
            Finder = readKeyboardData.prompt();
            console.log('Result: ');
            check(Finder);
            break;
        }
        default:    
            console.log("Not Found!");``
            break;
    }
    console.log(" "); 
    if(readKeyboardData.keyInYN("Do you want to go to the Menu?")){
        menu();
    }else{
        console.log("Thank you!");
        return 0;
    }
}
menu();

