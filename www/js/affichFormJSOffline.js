
var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var resultObject="";
var resultObjectContacts;
var resultObjectLookup; // List of record with lookup
var resultObjectContact;
var id_attribut= new Array;
var name_attribut = new Array;
var lookup_bool = new Array;
var chaine_attribut="";
var IdContactPrincipal=0;
var resultContact;
var table=new Array;
var tableau;
var dataview= new Array;
var entityLookupName;
var idLookup;
var entityIdLookup;
var tabAttributKey=new Array;
var tabAttributValue=new Array;	
var tabFormattedtKey=new Array;
var tabLookup=new Array;
var tabFormattedValue=new Array;
var customerLookup=0;
var changeCustomer=0;
var onglet_en_cours=1;
var plan=new Array;
var form_plan=new Array;


// ***************************    Entite associé       **********************************
function goRelatedEntity(e)
{

	sessionStorage.setItem('entiteassocie', e.id);
	window.location = "entiteassocie.html";
    	
}

function affichageOnglet(e)
{
var elm=document.getElementById("div1"+e.id.substring(5,3));

if(elm.style.display=='none')
{
elm.style.display='block';
document.getElementById("img"+e.id.substring(5,3)).src='img/down.png';

}else
{
elm.style.display='none';
document.getElementById("img"+e.id.substring(5,3)).src='img/regroup.png';

}


}

function affDate(elm)
{

   var now = new Date();
    $('#'+elm.id).mobiscroll().datetime({
        minDate: new Date(1980, now.getMonth(), now.getDate()),
        theme: 'android',
        lang: 'fr',
        display: 'bottom',
        mode: 'scroller'
    });

}
var taille_onglet=0;
// ajout formulaire

function ajout()
{
	//window.location="FormModification.html";
var form=document.getElementById("form")	;
form.innerHTML=" ";
	var reg_form_plan= new RegExp("@", "g");
	 form_plan=resultObject.split(reg_form_plan);
    var reg = new RegExp("=", "g");
	
	  tableau = form_plan[1].split(reg);
	
    
    var interm;
    var interm1;
    var interm2;
    var interm3;
    var interm4;
    var nbre = 0;
	var total=0;
	var reg_plan = new RegExp(">", "g");
	   var reg1 = new RegExp("#", "g");
    var reg2 = new RegExp(";", "g");
    var reg3 = new RegExp("/", "g");

	 var reg_section = new RegExp("#", "g");
	 plan =form_plan[0].split(reg_plan);
	nbre_onglet=plan.length-1;
	var premier_onglet=plan[0].split(reg);
	taille_onglet=plan.length-1;
ongletAfficher=0;
	for (var j = 0; j < plan.length-1; j++)
	{
nbreAttributsParOnglet = 0;
	plan_onglet=plan[j].split(reg);
	if(j==0)
	{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/down.png" ><b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'" style="margin-left: 20;display:block;"></div> <br id=div2'+j+'> ');
}else
{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'"  style="margin-left: 20;display:none;" > </div> <br id=div2'+j+'>');

}		  
	section=plan_onglet[1].split(reg_section);
	
var x=j+1;
	
	//section
nbreAttributsParSection = 0;
		for(var l= 0; l < section.length; l++)	
		{
		var id_section="s"+section.length*j+j+l;
		
		if(section[l]=="notshowlabel")
		{
		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ></div>');
		}
		else
		{
			

		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ><b><FONT size="2"><U>'+section[l]+'</U></Font></b></div>');
//$('#'+id_section).append('<br></br>');
		}		
		//
 var indice= -1;		
		for (var i = 0; i < tableau.length; i++) {

       interm = tableau[i].split(reg1);
	   indice= -1;
for( var b=0; b<tabAttributKey.length;b++)
	   {
		
		  if (tabAttributKey[b]==interm[1])
		   {
		    indice=b;
			  break;
		    }
	   }


	  
	var _section = document.getElementById(id_section);
       if ((interm[1] != 'ownerid')&&(interm[1] != 'statecode')) {
	  
           if (interm.length == 5) {
		if((interm[4]==l) && (interm[3]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
		nbreAttributsParOnglet =nbreAttributsParOnglet+1;
		  if(interm[1]=='regardingobjectid')
	  {
	  
	       lookup_bool[i] = "o";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[2] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
                   champ9.name = interm[0];
                   champ9.type = "text";
                   champ9.id = interm[1];
                   champ9.disabled = "disabled";
				   
   if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ9.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ9.value=""; }	 		


			if (interm[2] == '1') 
				   {
                       champ9.required = "required";
                   }
              
                  // bloc1.appendChild(champ9); 
				   
              _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                //  _section.appendChild(champB);
	  }
	  else
	  {
               lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;

               var bloc = document.createElement("p");
               if (interm[2] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
              var champ = null;
			      if((interm[1]=="description")||(interm[1]=="hli_compterendu"))
			   {
			     champ = document.createElement("textarea");
			   champ.style.height="200px";
			   champ.style.width="100%";
			   champ.disabled = "disabled"; 
			   champ.type="textarea";
			   }else
			   {
                champ = document.createElement("input");
               }
			   champ.name = interm[0];
               champ.type = "text";
               champ.id = interm[1];
               if (interm[2] == '1') {
                   champ.required = "required";
               }
			    
			     if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ.value=" "; }
	   champ.disabled = "disabled";         
		bloc.appendChild(champ);
               bloc.appendChild(champ);
               _section.appendChild(bloc);
                _section.appendChild(champ);
           
		   }
		   
		   
		   }
		   
		   }
		   if (interm.length == 6)  {
		 	if((interm[5]==l) && (interm[4]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
			nbreAttributsParOnglet =nbreAttributsParOnglet+1;
                lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;
	
	var reg4 = new RegExp(" ", "g");
	var reg5 = new RegExp("/", "g");



	var bloc = document.createElement("p");
               if (interm[3] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
               var champ = document.createElement("input");
 if(interm[2]=="date")
 {
               champ.id = interm[1];
	          champ.title="date"; 
			  champ.className="i-txt";
			  champ.onmouseover=function(){ affDate(this);}; 
			   champ.disabled = "disabled";
          if(indice!=-1)
			  {
	

	var date_time=tabAttributValue[indice].split(reg4);

	var date=date_time[0].split(reg5);
var date_heure="";
	if(date_time[1] != null)
	{
	date_heure=date_time[0]+" "+date_time[1];
              champ.value=date_heure;  

	}
	else
	{
	date_heure=date_time[0];	
	champ.value=date_heure; 

	}	//date_heure=date_heure.replace(",","  ");
//alert(date_heure);
	
              champ.value=date_heure;  
			  }
  }
 if(interm[2]=="money")
{
             champ.id = interm[1];
	          champ.title="money"; 
			   champ.disabled = "disabled";
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
					       var regMoney = new RegExp(" ", "g");
// supprimer sigle du devise
						   var valMoneyTab=	tabAttributValue[indice];
var valMoney =	valMoneyTab.split(regMoney);				  
						  champ.value=valMoney[0];
						   }
						   }
						     else
						   {
						   champ.value="";
						   
						   }
} 
 if(interm[2]=="decimal")
{
             champ.id = interm[1];
	          champ.title="decimal"; 
			   champ.disabled = "disabled";
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
						     else
						   {
						   champ.value="";
						   
						   }
} 
  
   if(interm[2]=="int")
{
             champ.id = interm[1];
	          champ.title="int"; 
			   champ.disabled = "disabled";
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
						   else
						   {
						   champ.value="";
						   
						   }
} 
  
  
			 		   bloc.appendChild(champ);
			    _section.appendChild(bloc);
                _section.appendChild(champ);
	
		   }
		   
		   }
          if (interm.length == 7) {
  if((interm[6]==l) && (interm[5]==j)){ 
 nbreAttributsParSection = nbreAttributsParSection +1;
 	nbreAttributsParOnglet =nbreAttributsParOnglet+1;
			 if (interm[2] == 'radio') {
                    lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   interm1 = interm[3].split(reg2);
                   interm2 = interm1[0].split(reg3);
                   interm3 = interm1[1].split(reg3);
                   var champ5 = document.createElement("label");
                   // nom de l'attribut en francais
                   champ5.innerText = interm[0] + " : ";
                  // radio1
                   id_attribut[nbre] = interm[1] + "0";
                   nbre = nbre + 1;
                   // label1
                   var champ3 = document.createElement("label");
                   champ3.innerText = interm2[0];
                   var champ1 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ1.name = interm[0];
                   champ1.type = "radio";
                   champ1.id = interm[1] + "0";
				    champ1.disabled = "disabled";
                   // valeur de l'attribut 
                   champ1.value = interm2[1];
				    // valeur de l'attribut 
                   champ1.value = interm2[1];
				   
				    if(tabAttributValue[indice]==interm2[0])
				   {
				 champ1.checked=true;
				   
				   }
				   
				
				   
                   // radio 2
                   id_attribut[nbre] = interm[1] + "1";
                   nbre = nbre + 1;
                   // label2
                   var champ4 = document.createElement("label");
                   champ4.innerText = interm3[0];
                   var champ2 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ2.name = interm[0];
                   champ2.type = "radio";
				    champ2.disabled = "disabled";
                   //champ2.innerText = interm3[0];
                   champ2.id = interm[1] + "1";
              
               // valeur de l'attribut 
                   champ2.value = interm3[1];
                   if(tabAttributValue[indice]==interm3[0])
				   {
				 champ2.checked=true;
				   
				   }
                   var bloc1 = document.createElement("p");
                   bloc1.appendChild(champ1);
                   bloc1.appendChild(champ2);
                   _section.appendChild(bloc1);
                   _section.appendChild(champ5);
                    _section.appendChild(champ3);
                   _section.appendChild(champ1);
                   _section.appendChild(champ4);
                    _section.appendChild(champ2);
               }

               if (interm[2] == 'picklist') {
				  lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
				   
                   interm1 = interm[3].split(reg2);
                   // select
                   var champ6 = document.createElement("select");
                   // id attribut
                   champ6.id = interm[1];
                   // name
                   champ6.name = interm[0];
                  // requi
                   if (interm[4] == '1') {
                       champ6.required = "required";
                   }
				   // disabled
				    champ6.disabled = "disabled";
                   // label
                   var champ7 = document.createElement("label");
                   champ7.innerText = interm[0] + " : ";
                   // balise <p>
                   var bloc2 = document.createElement("p");
                   bloc2.appendChild(champ6);
                   bloc2.appendChild(champ7); 
champ6.length++;				   
			    champ6.options[0].text = " ";
                   for (var n = 1; n < interm1.length+1; n++) {
                 
					
					
                           interm2 = interm1[n-1].split(reg3);
                           champ6.length++;
                           champ6.options[champ6.length - 1].text = interm2[0];
						   champ6.options[champ6.length - 1].title=interm2[1];

						   
                 						   if(interm2[0]==tabAttributValue[indice])
{
champ6.selectedIndex=champ6.length - 1;
}
  
				   
				   
				   }
				   
				  
                  
                  _section.appendChild(bloc2);
                   _section.appendChild(champ7);
                   _section.appendChild(champ6);
               }
  
  // look up
			   
               if (interm[2] == 'lookup') {
	               var idChamp=-1;
				 
				
				
			
                   lookup_bool[i] = "o";

                   // id
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[4] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
				  champ9.name = interm[3];
                   champ9.type = "text";
                   champ9.id = interm[1];
				    champ9.disabled = "disabled";
				   champ9.disabled="disabled";
    if(indice!= -1){
               			champ9.value=tabAttributValue[indice];
						champ9.title ="not" ;
			   				}
			   			else { champ9.value=" "; 
						        champ9.title ="not" ;
						}				
                   if (interm[2] == '1') {
                       champ9.required = "required";
                   }
                   var bloc = document.createElement("p");                  
      
                   //bloc1.appendChild(champ9);                      
                    _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                 
			   }
           }
         }
	   
	   
   }
		
		
		
		
		
		}
		
		if( nbreAttributsParSection == 0)
		{
		
		//$("#@420"+id_section).remove();
		$('#'+id_section).remove();
		}
		else
		{
		
		$('#'+id_section).append('<br>');
		}
		
		}
 		if(nbreAttributsParOnglet ==0)
 {

 $('#div'+j).remove();
 $('#div1'+j).remove();
 $('#div2'+j).remove();
 }
	}

	
		 if(form_plan[2]=="")
	{
	}
	else{
var	entAss="Entitées Associées";
$('#form').append('<div id="div'+nbre_onglet+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+nbre_onglet+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <FONT size="20">  <b style="font-size:20;color:blue;">'+"Entit\351es Associ\351es"+' </b></Font> <div id="div1'+nbre_onglet+'" style="margin-left: 20;display:none;" > </div></div> <br></br>');
	$('#div1'+nbre_onglet).append('<br></br>');
	 var reg_entite = new RegExp(",", "g");
	 var reg_entite_logical = new RegExp("/", "g");
	
	var entiteAss =form_plan[2].split(reg_entite);
	  
	for (var h = 0; h < entiteAss.length; h++)
	{

	var _ent=entiteAss[h].split(reg_entite_logical);
	 $('#div1'+nbre_onglet).append('<a id="'+_ent[1]+'" style="width: 200;" data-inline= "false" onclick="goRelatedEntity(this);"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">' +_ent[0]+ '</span></span></a><br></br> ');

	}
	
	}


	
 $('#busy').hide();	

 setTimeout(function(){myScroll.refresh();},100);
  
}


function modification()
{
	resultObject=window.localStorage.getItem(sessionStorage.getItem("EntityName"));
	if((sessionStorage.getItem("EntityName")=="account")||(sessionStorage.getItem("EntityName")=="quote")||(sessionStorage.getItem("EntityName")=="opportunity"))
		{
		ajout();
		}
		else
		{
		ModifyingData();
        }

	}


/******************************************Lookup Customer***************************************/
/***************************** Closing Virtual Frame ********************************************/
function CloseButton()
{
customerLookup=0;
document.getElementById('viewALLContact').innerHTML='';	
}
/*********************************************************************** Back to account Form **********************************************/
function retour()
{

if((sessionStorage.getItem("EntityName")=="task") || (sessionStorage.getItem("EntityName") =="phonecall") ||(sessionStorage.getItem("EntityName")=="hli_alerte") ||(sessionStorage.getItem("EntityName")=="hli_sms"))
{
window.location="activities.html";
}else
{
window.location=sessionStorage.getItem("EntityName")+"View.html";
}
}
/************************************************************************* Update Record ***************************************************/
/************************************************************************** RetrieveRecord***************************************************/
function ServiceFailed(result) {
    //alert('Service call failed: ' + result.status + '' + result.statusText);
	$('#busy').hide();
	var div=document.getElementById('List');
	div.innerHTML="erreur de chargement";
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function doretrieve() {

	//var guid=sessionStorage.getItem("guidEntity");
	var Entityname=sessionStorage.getItem("EntityName");

  entityRecord =$.parseJSON(sessionStorage.getItem("CurrentRecord"));     

	// inter =$.parseJSON(sessionStorage.getItem("CurrentRecord")); 
	
			for(var i in entityRecord.Attributes)
				{
			  	 tabAttributKey[i]=entityRecord.Attributes[i].key; 
		    
			if(entityRecord.Attributes[i].value=="[object Object]")
			  		 {
	
				  		tabAttributValue[i]=entityRecord.Attributes[i].value.Name;
				  		tabLookup[i]=entityRecord.Attributes[i].value.Id;
					 }					
					else{
				  		tabAttributValue[i]=entityRecord.Attributes[i].value;
						}
				}						
			for( var i in entityRecord.FormattedValues)
				{
				tabFormattedtKey[i]=entityRecord.FormattedValues[i].key;
				tabFormattedValue[i]=entityRecord.FormattedValues[i].value;
				}   
				// Corriger le probleme avec les picklist
				for (var i=0; i<tabFormattedtKey.length;i++)
				{
				for (var j in tabAttributKey)
					{
					if(tabFormattedtKey[i]==tabAttributKey[j])
						{	
							tabAttributValue[j]=tabFormattedValue[i];
							break;
						}
					}
				}
		     modification();
}
/*****************Geolocalisation****************/
function goGeo()
{
IdEntity= sessionStorage.getItem("guidEntity");
	
sessionStorage.setItem("guidEntity",IdEntity);
window.location="gps.html";
//window.location="gps.html";
}
/***********Form modification***********/

function ModifyingData()
{
	//window.location="FormModification.html";
var form=document.getElementById("form")	;
form.innerHTML=" ";
	var reg_form_plan= new RegExp("@", "g");
	 form_plan=resultObject.split(reg_form_plan);
    var reg = new RegExp("=", "g");
	
	  tableau = form_plan[1].split(reg);
	 
    
    var interm;
    var interm1;
    var interm2;
    var interm3;
    var interm4;
    var nbre = 0;
	var total=0;
	var reg_plan = new RegExp(">", "g");
	   var reg1 = new RegExp("#", "g");
    var reg2 = new RegExp(";", "g");
    var reg3 = new RegExp("/", "g");

	 var reg_section = new RegExp("#", "g");
	 plan =form_plan[0].split(reg_plan);
	nbre_onglet=plan.length-1;
	var premier_onglet=plan[0].split(reg);
	taille_onglet=plan.length-1;

	for (var j = 0; j < plan.length-1; j++)
	{
nbreAttributsParOnglet = 0;
	plan_onglet=plan[j].split(reg);
	if(j==0)
	{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/down.png" ><b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'" style="margin-left: 20;display:block;"></div> <br id=div2'+j+'> ');
}else
{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'"  style="margin-left: 20;display:none;" > </div> <br id=div2'+j+'>');

}		  
	section=plan_onglet[1].split(reg_section);
	
var x=j+1;
	
	//section
nbreAttributsParSection = 0;
		for(var l= 0; l < section.length; l++)	
		{
		var id_section="s"+section.length*j+j+l;
		
		if(section[l]=="notshowlabel")
		{
		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ></div>');
		}
		else
		{
			

		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ><b><FONT size="2"><U>'+section[l]+'</U></Font></b></div>');
//$('#'+id_section).append('<br></br>');
		}		
		//
 var indice= -1;		
		for (var i = 0; i < tableau.length; i++) {

       interm = tableau[i].split(reg1);
	   indice= -1;
for( var b=0; b<tabAttributKey.length;b++)
	   {
		
		  if (tabAttributKey[b]==interm[1])
		   {
		    indice=b;
			  break;
		    }
	   }


	  
	var _section = document.getElementById(id_section);
       if ((interm[1] != 'ownerid')&&(interm[1] != 'statecode')) {
	  
           if (interm.length == 5) {
		if((interm[4]==l) && (interm[3]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
		nbreAttributsParOnglet =nbreAttributsParOnglet+1;
		  if(interm[1]=='regardingobjectid')
	  {
	  
	       lookup_bool[i] = "o";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[2] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
                   champ9.name = interm[0];
                   champ9.type = "text";
                   champ9.id = interm[1];
                   champ9.disabled = "disabled";
   if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ9.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ9.value=" "; }	 		


			if (interm[2] == '1') 
				   {
                       champ9.required = "required";
                   }
                   var bloc = document.createElement("p");                  
                  
                  // bloc1.appendChild(champ9); 
				   
              _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                
	  }
	  else
	  {
               lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;

               var bloc = document.createElement("p");
               if (interm[2] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
              var champ = null;
			      if((interm[1]=="description")||(interm[1]=="hli_compterendu"))
			   {
			     champ = document.createElement("textarea");
			   champ.style.height="200px";
			   champ.style.width="100%";
			   
			   champ.type="textarea";
			   }else
			   {
                champ = document.createElement("input");
               }
			   champ.name = interm[0];
               champ.type = "text";
               champ.id = interm[1];
               if (interm[2] == '1') {
                   champ.required = "required";
               }
			    
			     if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ.value=" "; }
               bloc.appendChild(champ);
               bloc.appendChild(champ);
               _section.appendChild(bloc);
                _section.appendChild(champ);
           
		   }
		   
		   
		   }
		   
		   }
		   if (interm.length == 6)  {
		 	if((interm[5]==l) && (interm[4]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
			nbreAttributsParOnglet =nbreAttributsParOnglet+1;
                lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;
	
	var reg4 = new RegExp(" ", "g");
	var reg5 = new RegExp("/", "g");



	var bloc = document.createElement("p");
               if (interm[3] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
               var champ = document.createElement("input");
 if(interm[2]=="date")
 {
               champ.id = interm[1];
	          champ.title="date"; 
			  champ.className="i-txt";
			  champ.onmouseover=function(){ affDate(this);}; 
          if(indice!=-1)
			  {
	

	var date_time=tabAttributValue[indice].split(reg4);

	var date=date_time[0].split(reg5);
var date_heure="";
	if(date_time[1] != null)
	{
	date_heure=date_time[0]+" "+date_time[1];
              champ.value=date_heure;  

	}
	else
	{
	date_heure=date_time[0];	
	champ.value=date_heure; 

	}	
	
              champ.value=date_heure;  
			  }
  }
 if(interm[2]=="money")
{
             champ.id = interm[1];
	          champ.title="money"; 
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
					       var regMoney = new RegExp(" ", "g");
// supprimer sigle du devise
						   var valMoneyTab=	tabAttributValue[indice];
var valMoney =	valMoneyTab.split(regMoney);				  
						  champ.value=valMoney[0];
						   }
						   }
						     else
						   {
						   champ.value="";
						   
						   }
} 
 if(interm[2]=="decimal")
{
             champ.id = interm[1];
	          champ.title="decimal"; 
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
						     else
						   {
						   champ.value="";
						   
						   }
} 
  
   if(interm[2]=="int")
{
             champ.id = interm[1];
	          champ.title="int"; 
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
						     else
						   {
						   champ.value="";
						   
						   }
} 
  
  
			 		   bloc.appendChild(champ);
			    _section.appendChild(bloc);
                _section.appendChild(champ);
	
		   }
		   
		   }
          if (interm.length == 7) {
  if((interm[6]==l) && (interm[5]==j)){ 
 nbreAttributsParSection = nbreAttributsParSection +1;
 	nbreAttributsParOnglet =nbreAttributsParOnglet+1;
			 if (interm[2] == 'radio') {
                    lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   interm1 = interm[3].split(reg2);
                   interm2 = interm1[0].split(reg3);
                   interm3 = interm1[1].split(reg3);
                   var champ5 = document.createElement("label");
                   // nom de l'attribut en francais
                   champ5.innerText = interm[0] + " : ";
                  // radio1
                   id_attribut[nbre] = interm[1] + "0";
                   nbre = nbre + 1;
                   // label1
                   var champ3 = document.createElement("label");
                   champ3.innerText = interm2[0];
                   var champ1 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ1.name = interm[0];
                   champ1.type = "radio";
                   champ1.id = interm[1] + "0";
                   // valeur de l'attribut 
                   champ1.value = interm2[1];
				    // valeur de l'attribut 
                   champ1.value = interm2[1];
				   
				    if(tabAttributValue[indice]==interm2[0])
				   {
				 champ1.checked=true;
				   
				   }
				   
				
				   
                   // radio 2
                   id_attribut[nbre] = interm[1] + "1";
                   nbre = nbre + 1;
                   // label2
                   var champ4 = document.createElement("label");
                   champ4.innerText = interm3[0];
                   var champ2 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ2.name = interm[0];
                   champ2.type = "radio";
                   //champ2.innerText = interm3[0];
                   champ2.id = interm[1] + "1";
              
               // valeur de l'attribut 
                   champ2.value = interm3[1];
                   if(tabAttributValue[indice]==interm3[0])
				   {
				 champ2.checked=true;
				   
				   }
                   var bloc1 = document.createElement("p");
                   bloc1.appendChild(champ1);
                   bloc1.appendChild(champ2);
                   _section.appendChild(bloc1);
                   _section.appendChild(champ5);
                    _section.appendChild(champ3);
                   _section.appendChild(champ1);
                   _section.appendChild(champ4);
                    _section.appendChild(champ2);
               }

               if (interm[2] == 'picklist') {
				  lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
				   
                   interm1 = interm[3].split(reg2);
                   // select
                   var champ6 = document.createElement("select");
                   // id attribut
                   champ6.id = interm[1];
                   // name
                   champ6.name = interm[0];
                  // requi
                   if (interm[4] == '1') {
                       champ6.required = "required";
                   }
                   // label
                   var champ7 = document.createElement("label");
                   champ7.innerText = interm[0] + " : ";
                   // balise <p>
                   var bloc2 = document.createElement("p");
                   bloc2.appendChild(champ6);
                   bloc2.appendChild(champ7); 
champ6.length++;				   
			    champ6.options[0].text = " ";
                   for (var n = 1; n < interm1.length+1; n++) {
                 
					
					
                           interm2 = interm1[n-1].split(reg3);
                           champ6.length++;
                           champ6.options[champ6.length - 1].text = interm2[0];
						   champ6.options[champ6.length - 1].title=interm2[1];

						   
                 						   if(interm2[0]==tabAttributValue[indice])
{
champ6.selectedIndex=champ6.length - 1;
}
  
				   
				   
				   }
				   
				  
                  
                  _section.appendChild(bloc2);
                   _section.appendChild(champ7);
                   _section.appendChild(champ6);
               }
  
  // look up
			   
               if (interm[2] == 'lookup') {
	               var idChamp=-1;
				 
				
				
			
                   lookup_bool[i] = "o";

                   // id
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[4] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
				  champ9.name = interm[3];
                   champ9.type = "text";
                   champ9.id = interm[1];
				   champ9.disabled="disabled";
    if(indice!= -1){
               			champ9.value=tabAttributValue[indice];
						champ9.title ="not" ;
			   				}
			   			else { champ9.value=" "; 
						        champ9.title ="not" ;
						}				
                   if (interm[2] == '1') {
                       champ9.required = "required";
                   }
                   var bloc = document.createElement("p");                  
                
                                
                    _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                  
			   }
           }
         }
	   
	   
   }
		
		
		
		
		
		}
		
		if( nbreAttributsParSection == 0)
		{
		
		//$("#@420"+id_section).remove();
		$('#'+id_section).remove();
		}
		else
		{
		
		$('#'+id_section).append('<br>');
		}
		
		}
 		if(nbreAttributsParOnglet ==0)
 {

 $('#div'+j).remove();
 $('#div1'+j).remove();
 $('#div2'+j).remove();
 }
	}

	
		 if(form_plan[2]=="")
	{
	}
	else{
var	entAss="Entitées Associées";
$('#form').append('<div id="div'+nbre_onglet+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+nbre_onglet+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <FONT size="20">  <b style="font-size:20;color:blue;">'+"Entit\351es Associ\351es"+' </b></Font> <div id="div1'+nbre_onglet+'" style="margin-left: 20;display:none;" > </div></div> <br></br>');
	$('#div1'+nbre_onglet).append('<br></br>');
	 var reg_entite = new RegExp(",", "g");
	 var reg_entite_logical = new RegExp("/", "g");
	
	var entiteAss =form_plan[2].split(reg_entite);
	  
	for (var h = 0; h < entiteAss.length; h++)
	{

	var _ent=entiteAss[h].split(reg_entite_logical);
	 $('#div1'+nbre_onglet).append('<a id="'+_ent[1]+'" style="width: 200;" data-inline= "false" onclick="goRelatedEntity(this);"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">' +_ent[0]+ '</span></span></a><br></br> ');

	}
	
	}


	var update=document.getElementById("update");
	update.style.display="block";
 $('#busy').hide();	

 setTimeout(function(){myScroll.refresh();},100);
  
}


function DetectChange(e)
{

if(sessionStorage.getItem("EntityName") =="appointment")
{
if(e.id=="scheduledstart")
{
document.getElementById("scheduledend").value=document.getElementById("scheduledstart").value;
}
if(e.id=="scheduledend")
{
document.getElementById("scheduledstart").value=document.getElementById("scheduledend").value;
}
}

}
 
/********************************retour à l'accueil offline*****************************/

	function goHome()
	{
	window.location="offline.html";	
	}

/*********************************************************************** Back to account Form **********************************************/
function retour()
{
window.location=sessionStorage.getItem("EntityName")+"ViewOffline.html";
}
/************************************************************************* Update Record ***************************************************/
var erreur=0;
function getAttr_val() {

 
   var j = 0;
    for (var i = 0; i < id_attribut.length; i++) {
        var paragraph = document.getElementById(id_attribut[i]);
              if(paragraph.type=='select-one')
              {
      	if (paragraph.selectedIndex != 0)
					
					{
					
                      var strUser = paragraph.options[paragraph.selectedIndex].title;
                      chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(strUser);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat("OptSet");
                      // "OptSet"
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat("Select");
                      chaine_attribut = chaine_attribut.concat("#");
}
                      j = j + 1;

                  
              }
			  
            if(paragraph.type=='text')
          {
	
			
if((paragraph.required == true) &&  (paragraph.value=="")  ){

if((paragraph.id=="customerid")|| (paragraph.id=="regardingobjectid"))
{
affichAlert("veuillez remplir "+name_attribut[i],paragraph.id);
}
else
{
affichAlert("veuillez remplir "+paragraph.name,paragraph.id);

}
erreur=1;
	  
		  
		  }
		  else
		  {
		  
		  if(paragraph.value!="")
		  {
		  			if(paragraph.id=="regardingobjectid")
			 {
			 if(paragraph.title !="")
			 {
               chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.title);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.name);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
			  }
			  }
			  
			  else if (paragraph.title=="") {
              
			
                      chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.value);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
                  
				
				  
				  
				  
				 
              
			  }
			  
			  
			  
             
			  
                
else if(paragraph.title=="date") {


	
if((paragraph.value == "")&&(paragraph.required==true))
{

affichAlert("Veuillez remplir l'heure du "+paragraph.name,paragraph.id+"date");
}
else{
if(paragraph.value !="")
{
var date_heure= paragraph.value;
date_heure=date_heure.replace("/","-");
date_heure=date_heure.replace("/","-");
chaine_attribut = chaine_attribut.concat("date"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(date_heure);
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;
if(paragraph.id=="scheduledstart")
{

if(document.getElementById("scheduledend") != null){
var date_d = paragraph.value;
date_d =date_d.replace("-","/");
heure_debut=date_d.substring(11,20);
tab_heure_debut=heure_debut.split(':');

date_debut=date_d.substring(0,10);


 var StartDate = new Date();
 var tab_date_debut=date_debut.split('/')
 StartDate.setSeconds('00');
 StartDate.setMinutes(tab_heure_debut[1]);
StartDate.setHours(tab_heure_debut[0]);
 StartDate.setDate(tab_date_debut[0]);
StartDate.setMonth(tab_date_debut[1]);
StartDate.setYear(tab_date_debut[2]);

var date_f = document.getElementById("scheduledend").value;
date_f =date_f.replace("-","/");

heure_fin=date_f.substring(11,20);
tab_heure_fin=heure_fin.split(':');

date_fin=date_f.substring(0,10);

var tab_date_fin=date_fin.split('/');

 var EndDate = new Date();

  EndDate.setSeconds('00');
 EndDate.setMinutes(tab_heure_fin[1]);
EndDate.setHours(tab_heure_fin[0]);
 
 EndDate.setDate(tab_date_fin[0]);
EndDate.setMonth(tab_date_fin[1]);
EndDate.setYear(tab_date_fin[2]);
if (EndDate < StartDate) 
{
affichAlert("Heure de d\351but doit \351tre inf\351rieur \340 l'Heure de Fin ",paragraph.id);

}




}


}
if(paragraph.id=="scheduledend")
{

if(document.getElementById("scheduledstart") != null){
var date_d = document.getElementById("scheduledstart").value;
date_d =date_d.replace("-","/");
heure_debut=date_d.substring(11,20);
tab_heure_debut=heure_debut.split(':');

date_debut=date_d.substring(0,10);


 var StartDate = new Date();
 var tab_date_debut=date_debut.split('/')
 StartDate.setSeconds('00');
 StartDate.setMinutes(tab_heure_debut[1]);
StartDate.setHours(tab_heure_debut[0]);
 StartDate.setDate(tab_date_debut[0]);
StartDate.setMonth(tab_date_debut[1]);
StartDate.setYear(tab_date_debut[2]);

var date_f = paragraph.value;
date_f =date_f.replace("-","/");

heure_fin=date_f.substring(11,20);
tab_heure_fin=heure_fin.split(':');

date_fin=date_f.substring(0,10);

var tab_date_fin=date_fin.split('/');

 var EndDate = new Date();

  EndDate.setSeconds('00');
 EndDate.setMinutes(tab_heure_fin[1]);
EndDate.setHours(tab_heure_fin[0]);
 
 EndDate.setDate(tab_date_fin[0]);
EndDate.setMonth(tab_date_fin[1]);
EndDate.setYear(tab_date_fin[2]);
if (EndDate < StartDate) 
{
affichAlert("l'Heure de Fin  doit \351tre sup\351rieur \340 l'Heure de d\351but ",paragraph.id);

}




}



}
					 

					 

					 
					 
					 }
}
					  
					  
					  

					  }

else if(paragraph.title=="int")
{
if(paragraph.value !="")
{

chaine_attribut = chaine_attribut.concat("int"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.value );
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}
else if(paragraph.title=="decimal")
{
if(paragraph.value !="")
{

chaine_attribut = chaine_attribut.concat("decimal"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.value );
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}
else if(paragraph.title=="money")
{
if(paragraph.value !="")
{

chaine_attribut = chaine_attribut.concat("money"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.value );
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}					  
					  
					  

					  
					  
					  else
{
              
				if (paragraph.value != "") {
				  
				if(paragraph.title !="")
				{
				if (paragraph.title != "not")
				{
                      chaine_attribut = chaine_attribut.concat(paragraph.id);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.title);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.name);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
}                } 
				 }
              
			  
			  
			  }
			  
          
          
	}
		  }
		  
		  
		  
		  
		  }
		  
		  
		  
		  

          if (paragraph.type == 'radio') 
          {
              if (paragraph.checked) {
                
                  var id_att = id_attribut[i].substring(0, id_attribut[i].length - 1)
                  chaine_attribut = chaine_attribut.concat(id_att);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat(paragraph.value);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat("OptSet");
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat("Radio");
                  chaine_attribut = chaine_attribut.concat("#");
              }
          }
            
            }
	if(document.getElementById("description") != null)
{

if(document.getElementById("description").value != null)
{
          chaine_attribut = chaine_attribut.concat("description");
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(document.getElementById("description").value);
                      chaine_attribut = chaine_attribut.concat("#");
}
}	

	if(document.getElementById("hli_compterendu") != null)
{
if(document.getElementById("hli_compterendu").value != "")
{
          chaine_attribut = chaine_attribut.concat("hli_compterendu");
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(document.getElementById("hli_compterendu").value);
                      chaine_attribut = chaine_attribut.concat("#");
}
}



chaine_attribut = chaine_attribut.substring(0, chaine_attribut.length - 1)

    }
	 function affichAlert(_erreur,id)
 {
  alert(_erreur);
  $('#'+id).addClass('error');
 erreur=1;
 
 }

function update()

{  
 $('#busy').show();
	chaine_attribut="entityName="+sessionStorage.getItem("EntityName")+"#id="+sessionStorage.getItem("guidEntity")+"#";
	erreur=0;
getAttr_val();


if(erreur==0){
 $('#busy').hide();

window.location=sessionStorage.getItem("EntityName")+"ViewOffline.html";
   //update offline

   var offlineRecordChange = $.parseJSON(localStorage.getItem('offlineChangeRecords'));
alert(offlineRecordChange);
offlineRecordChange[localStorage.getItem('NumberOfflineChangeRecords')]=chaine_attribut;
alert(offlineRecordChange);
var numOfflineRecords=parseInt(localStorage.getItem('NumberOfflineChangeRecords'))+1;
localStorage.setItem('NumberOfflineChangeRecords',numOfflineRecords );
   
localStorage.setItem('offlineChangeRecords',  JSON.stringify(offlineRecordChange));
alert(localStorage.getItem('NumberOfflineChangeRecords'));
alert(localStorage.getItem('offlineChangeRecords'));

   }
else
{
 $('#busy').hide();
}
	}

/*************************************Fin modification****************************************************/
/************************************************************************** Page on Load ****************************************************/
$(document).ready
(
function () {
 $('#busy').show();	
 if((sessionStorage.getItem("EntityName") !="quote") || ( sessionStorage.getItem("EntityName") !="account")||(sessionStorage.getItem("EntityName") !="opportunity"))
{
	var update=document.getElementById("update");
	update.style.display="none";
}
	doretrieve();  
}
);