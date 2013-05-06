/*
 * Calamity Jane Express(R)   webversion 0.1-alpha april 2013 for testing and development only
 * http://calamityjaneexpress.net/
 *
 * Copyright 2013 Dee Jay Alexander
 * Released under GPL2+ license
 * http://gnu.org/licenses/gpl.html 
 *
 * Date: sun Apr 28 2013 09:00:00 GMT-0400 (Eastern Daylight Time)
 */ 
 
	function LoadXML(){
	//READ CONTENT-DATA FROM SERVER INTO XMLA (1/2)
		xmla = null;
		$.ajax({
		type: "POST",
		async: false,
		cache: false,
		url: "/cjea.xml",
		dataType: "xml",
		success: function(xml) {
		xmla = xml},
		error: function() {
		Message("An error occurred while processing XML file 1.");
		}
		});
		
	//READ CLIP-DATA FROM SERVER INTO XMLB (2/2)
		xmlb = null;
		$.ajax({
		type: "POST",
		async: false,
		cache: false,
		url: "/cjeb.xml",
		dataType: "xml",
		success: function(xml) {
		xmlb = xml},
		error: function() { alert('err2');
		Message("An error occurred while processing XML file 2.");//28
		}
		});
		FillUpper();	
	}

		//LOAD CLIPS FROM XMLB INTO UPPER PART SCREEN
	function FillUpper(){
		suu = true;
		nr = parseInt($('[na="counter"]', xmla).text());
		ClearUpperClass();		
		var a = $('cl[cl="su"]', xmlb).length;
		for (var i = 1; i<a; i++){
		var x1 = $('root cl[cl="su"]:eq('+i+')', xmlb).attr("xid");
		var x2 = $('root cl[cl="su"]:eq('+i+')', xmlb).attr("na");
		$('#sortable1').append('<li />');
		$('#sortable1 li:last-child').attr({id:''+x1+''}).html($('cl[xid='+x1+'] ', xmlb).attr("na"));
		$('#sortable1 li:last-child').attr({class:''+'clip'+''});	
		}
		$('#page2 li').off("click");
		$('#sortable1 li,#sortable2 li').off("click");
		Colorize();
		if(showItem){ShowItem();}else{SelectME();};
		$('#b101b').click();
		$('#sortable1, #sortable2').listview('refresh');
		Message('All clips Loaded');	
	}
		
		//LOAD CLIPS FROM XMLB INTO LOWER PART SCREEN
	function FillLower(){
		ClearLowerClass();		
		var a = $('cl[cl="su"]', xmlb).length;
		for (var i = 0; i<a ; i++){
		var x1 = $('root cl[cl="su"]:eq('+i+')', xmlb).attr("xid");
		var x2 = $('root cl[cl="su"]:eq('+i+')', xmlb).attr("na");
		$('#sortable2').append('<li />');
		$('#sortable2 li:last-child').attr({id:''+x1+''}).html($('cl[xid='+x1+'] ', xmlb).attr("na"));
		$('#sortable2 li:last-child').attr({class:''+'clip'+''});	
		}
		$('#page2 li').off("click");
		$('#sortable1 li,#sortable2 li').off("click");
		Colorize();//4-3
		if(showItem){ShowItem();}else{SelectME();};
		$('#b101b').click();
		$('#sortable1, #sortable2').listview('refresh');
		Message('All clips Loaded');	
	}

	function ShowClassItems(name, id, cn){
	//LOAD BULLETS INTO CLIP FROM CLICKED/DROPPED CLIP(EITHER UPPER OR LOWER)
		if (cn=="#sortable1"){ClearUpperClass();$('.classname1').text(name);$('.classname1').attr('id',id);} 
		else {ClearLowerClass();$('.classname2').text(name);$('.classname2').attr('id',id);}; 
		var name1 = '[na='+name+']';
		var a = $( name1  + ' bu', xmlb).length; 						
		for (var i = 1; i<a + 1; i++){
		$(cn).append('<li />');	
		$name2 = $(name1 + ' bu:nth-child('+i+')', xmlb);
		$cnlc = $(cn+' li:last-child');
		var x1 = $name2.attr("xid");
		var x2 = $name2.attr("cl");
		var xx1 = '[xid="'+x1+'"]';
		if (x2=="clip"){$cnlc.attr('id', x1).html($('cl'+xx1, xmlb).attr('na'));}
		else {$cnlc.attr('id',x1).html(xmla.querySelector('[xid="'+x1+'"]').textContent);};		
		$cnlc.attr('class', x2);		      
		}
		$('#page2 li').off("click");
		$('#sortable1 li,#sortable2 li').off("click");
		Colorize();//4-3
		if(showItem){ShowItem();}else{SelectME();};
		$('#b101b').click();
		$('#sortable1, #sortable2').listview('refresh');
		Message('New Clip Loaded');						
	}	
	
	function ItemPrepADD1(){
	//PREPARE BULLET CREATION (1/2)
		var a = ($('.sel').length).toString();
		switch(a)
			{
			case '1':
			b = $('.sel').attr('id');
			$('#f10a, #f10aa, #f10b').removeClass('hide');
			$('#f10a textarea, #f10aa textarea').textinput().val('');
			$('#b101c').click();
			break;		
			case '0':
			b = $('#sortable1 li:last').attr('id');
			$('#f10a, #f10aa, #f10b').removeClass('hide');
			$('#f10a textarea, #f10aa textarea').textinput().val('');
			$('#b101c').click();
			break;
			default:
			alert('ONLY 1 item can be selected to place NEW item behind');
			}
	}
	
	function ItemPrepADD2(){
	//PREPARE BULLET CREATION (2/2)
		nr = nr +1;
		$('[na="counter"]', xmla).text(nr.toString());
		var nrx = nr.toString();
		$('#'+b).after('<li />');
		$('#'+b).next().attr('id','id_'+nrx);	
		$('#id_'+nrx).addClass('NEW').text($('#f10a textarea').textinput().val()).prepend('<strong>TO BE CREATED !!+ </strong>');
		if ($('#f10aa textarea').textinput().val() != '') {$('#id_'+nrx).addClass('lnk').data('lnk',$('#f10aa textarea').textinput().val())};
		$('#b101b').click();
		$('#f10a, #f10aa, #f10b').addClass('hide');
		if (showItem) {ShowItem()} else {SelectME()};	
		$('#sortable1, #sortable2').listview('refresh');	
	}
		
	function ItemPrepCHANGE1(){
	//PREPARE BULLETS FOR TEXT-CHANGE (1/2)
		var a = ($('.sel').length).toString();
		switch(a)
			{
			case '1':
			if ($('.sel').hasClass('txt')||$('.sel').hasClass('lnk')){}else{alert('ONLY a REAL Bullet can be changed!\n(NOT a Clip = PSEUDO Bullet)');break};
			b = $('.sel').attr('id');
			$('#f10a, #f10aa, #f11a').removeClass('hide');
			if ($('#'+b).hasClass('DEL')){$('#'+b).removeClass('DEL'); $('#'+b+' strong:only-of-type').remove();};
			if ($('#'+b).hasClass('VANISH')){$('#'+b).removeClass('VANISH'); $('#'+b+' strong:only-of-type').remove();};
			$('#f10a textarea').textinput().val($('#'+b).text());
			if ($('#'+b).hasClass('lnk')) {$('#f10aa textarea').textinput().val($('a[id="'+b+'"]', xmla).attr('href'))}
			else {$('#f10aa').addClass('hide');};		
			if ($('#'+b).hasClass('NEW')){$('#f10a textarea').textinput().val($('#'+b).text().substr(18));};
			if ($('#'+b).hasClass('CHANGE')){$('#f10a textarea').textinput().val($('#'+b).text().substr(18));};
			$('#b101c').click();
			break;		
			case '0':
			alert('FIRSTt select Bullet to be changed');
			break;
			default:
			alert('ONLY 1 Bullet can be selected to be changed');
			}
	}	

	function ItemPrepCHANGE2(){
	//PREPARE BULLETS FOR TEXT-CHANGE (2/2)
			$('#'+b).text($('#f10a textarea').textinput().val());
			$('#f10a, #f10aa, #f11a').addClass('hide');
			$('#b101b').click();	
			if ($('#'+b).hasClass('NEW')){$('#'+b).prepend('<strong>TO BE CREATED !!+ </strong>');} else {
			$('#'+b).addClass('CHANGE').prepend('<strong>TO BE CHANGED !!$ </strong>');};
			if ($('#'+b).hasClass('lnk')) {$('#'+b).data('lnk',$('#f10aa textarea').textinput().val())}; 
	}

	function ClassPrepADD1(){
	//PREPARE CLIP CREATION/CHANGE (1/2)
			suc = $('.classname1').attr('id');
			$('#f9a, #f9b').removeClass('hide');
			if ($('.classname1').hasClass('NEW')){$('.classname1').text($('.classname1').text().substr(18))};
			$('#f9a textarea').textinput().val('');
			$('#b101c').click();
	}	
			
	function ClassPrepADD2(){
	//PREPARE CLIP CREATION (2/2)
		var na = $('#f9a textarea').textinput().val(); 
		var c = $('[na='+'"_'+na+'"'+']', xmlb).size();
		if (c==0){}	else {alert('Clipname allready exists, must create UNIQUE name!'); return};				
		if ($('.classname1').hasClass('NEW')){$('.classname1').text(na).prepend('<strong>TO BE CREATED !!+ </strong>');}
		else {
		nr = nr + 1;
		$('[na="counter"]', xmla).text(nr.toString());
		var nrx = nr.toString();
		$('.classname1').addClass('NEW').attr("id","id_"+nrx);
		if (suu==true){$('.classname1').addClass('SU')};
		$('.classname1').text(na).prepend('<strong>TO BE CREATED !!+ </strong>');
		Message("Clip added/changed in upper window.");	
		};
		$('#sortable1 li:not(".classname1")').remove();		
		$('#b101b').click();
		$('#f9a, #f9b').addClass('hide');
	}	 	

//- - - -

	function ClassMake(){
	//CHECK CLIP EXISTANCE, IF NOT CREATE IT (xmlb)
		if ($('.classname1').hasClass('NEW')){}
		else { return};
		var a = $('.classname1').attr('id');	
		var b1 = $('.classname1').text();
		var b = '_' + b1.substr(18);
		var cli = xmlb.createElement('cl');		
		$(xmlb).find('cl:last').after($(cli));
		$(xmlb).find('cl:last').attr('na',b);
		$(xmlb).find('cl:last').attr('xid',a);
		if ($('.classname1').hasClass('SU')){$(xmlb).find('cl:last').attr('cl','su');}
		else { var bu = xmlb.createElement('bu'); $(xmlb).find('cl[xid="'+suc+'"]').append($(bu));
		$(xmlb).find('cl[xid="'+suc+'"] bu:last').attr('xid',a).attr('cl','clip');};
		$('.classname1').removeClass('NEW');
		$('.classname1').removeClass('SU');		
		$('.classname1 > strong').remove();		
	}

	function ConfirmChanges(){
	//CONFIRM CHANGES
		ClassMake();
		if ($('.classname1').attr("id")=='q1'){for (k=0;k<$('.DEL').size();k++){a=$('.DEL:eq('+k+')').attr('id'); $('[xid='+a+']', xmlb).remove();};};
		$('.DEL').remove();
		var arrayA = [];
		var arrayB = [];		
		for (k=0;k<$('.VANISH').size();k++){a=$('.VANISH:eq('+k+')').attr('id'); arrayA.push(a);};
		for (k=0;k<$('.VANISH').size();k++){a=$('.VANISH:eq('+k+')').attr('id'); arrayB.push(a);};					
		for (k=0;k<$('.VANISH').size();k++){a=arrayA.pop();$('[xid='+a+']', xmla).remove();};
		for (k=0;k<$('.VANISH').size();k++){a=arrayB.pop();$('[xid='+a+']', xmlb).remove();};		
		$('.VANISH').remove();
		var arrayA = [];
		$('.NEW:not(".classname1") > strong').remove();
		for (k=0;k<$('.NEW:not(".classname1")').size();k++){a=$('.NEW:not(".classname1"):eq('+k+')').attr('id'); arrayA.push(a);};
		arrayA.reverse();
		for (k=0;k<$('.NEW:not(".classname1")').size();k++){
		a=arrayA.pop();		
		var bul = xmla.createElement('bu');	
		$('cl:last',xmla).append($(bul));
		if ($('#'+a).hasClass('lnk')){var al = xmla.createElement('a');
		$('cl:last bu:last',xmla).attr('cl','lnk').attr('xid',a).prepend($(al));//
		$('cl:last bu:last a',xmla).attr('id',a).attr('rel','external').attr('href', $('#'+a).data('lnk')).text($('#'+a).text());}// 
		else{$('cl:last bu:last',xmla).attr('cl','txt').attr('xid',a).text($('#'+a).text())};
		}
		$('.NEW').removeClass('NEW');
		var arrayA = [];
		$('.CHANGE > strong').remove();
		for (k=0;k<$('.CHANGE').size();k++){a=$('.CHANGE:eq('+k+')').attr('id'); arrayA.push(a);};
		for (k=0;k<$('.CHANGE').size();k++){
		a=arrayA.pop();		
		if ($('[xid='+a+']', xmla).attr('cl')=='lnk') {$('[xid='+a+'] a', xmla).attr('href',$('#'+a).data('lnk')).text($('#'+a).text());}//
		else {$('[xid='+a+']', xmla).text($('#'+a).text())};
		}
		$('.CHANGE').removeClass('CHANGE');		
		ItemsToClass();										
	}

	function ItemsToClass(){
	//ADD/DELETE BULLETS TO/FROM CLIP-DATA
		var a = $('.classname1').attr("id");
		if (a =='q1') {Colorize();$('#b101b').click();Message("Bullets Saved Into Memory");return};
		var a1 = $('#sortable1 li').length -1;
		var a2 = $('cl[xid='+a+'] bu', xmlb).length;
		var a3 = a2-a1;			
		if (a3>0)
		{for (var k = 1; k< Math.abs(a3) +1; k++){
		$('cl[xid='+a+'] bu:last', xmlb).remove();};};
		if (a3<0)
		{for (var k = 1; k< Math.abs(a3) +1; k++){	
		var bul = xmlb.createElement('bu');
		$('cl[xid='+a+']', xmlb).append($(bul));		
		};};
		for (var k = 0; k < $('#sortable1 li').length; k++)
		{k1=k+1; $('cl[xid='+a+'] bu:eq('+k+')', xmlb).attr('xid',$('#sortable1 li:eq('+k1+')').attr('id'));
		if ($('#sortable1 li:eq('+k1+')').hasClass('clip')) 
		{$('cl[xid='+a+'] bu:eq('+k+')', xmlb).attr('cl','clip')}
		else {if ($('#sortable1 li:eq('+k1+')').hasClass('lnk')) {$('cl[xid='+a+'] bu:eq('+k+')', xmlb).attr('cl','lnk')}
		else {$('cl[xid='+a+'] bu:eq('+k+')', xmlb).attr('cl','txt')};};
		};
		Colorize();
		$('#b101b').click();
		Message("Bullets Saved Into Memory");		
	}
		
	function DoFunc(event){
	//FROM FUNCCALLS
		var str = event.target.id;
		switch(str)
			{
			case 'f00':
			alert('(R) CALAMITY JANE EXPRESS a BrowserMessenger by Dee Jay Alexander at www.calamityjaneexpress.net\n\nCopyright (c) Free Software Foundation, Inc. License GPL2+: GNU GPL version 2 or later <http://gnu.org/licenses/gpl.html>.\n\nThis is free software: you are free to change and redistribute it. There is NO WARRANTY, to the extend permitted by law. Just give the credits to Dee Jay Alexander at www.calamityjaneexpress.net\n\nWebversion 0.1-alfa april 2013 for TESTING purposes ONLY.\n\nCALAMITY JANE EXPRESS(R) is to SHOOT (info)BULLETS to SERVE and SAVE people, pets and properties!');
			break;
			case 'f0':
			alert('Credits to the American Red Cross and its affiliates at www.redcross.org/disaster/disasterguide/standardmsg.html for placing the Standard Messages into the Public Domain. .\n\nCredits to the JQUERY Team at www.jquery.org for providing the JQuery framework as open source.\n\nCredits to Dave Furfero at touchpunch.furf.com for providing JQuery UI compatible Touchscreen utils as open source.\n\nThere is NOT ANY affiliation between Calamity Jane Express(R) and the above mentioned entities.'); 
			break;
			case 'f14':
			arrayBack = [];
			arrayForth = [];
			FillUpper();
			break;
			case 'f0a':
			arrayBack2 = [];
			arrayForth2 = [];
			FillLower();
			break;					
			case 'f1':
			SaveXML();
			break;
			case 'f2':
			ToggleSelShow();
			break;
			case 'f16':
			InvertSel();
			break;				
			case 'f3':
			SelectionOff();
			break;
			case 'f4':
			UndoSelection();
			break;
			case 'f5':
			ShowAlllUpper();
			break;
			case 'f6':
			ShowAlllLower();
			break;
			case 'f7':
			ItemPrepDEL();
			break;
			case 'f8':
			ItemPrepVANISH();
			break;
			case 'f17':
			EmptyTEMP();
			break;
			case 'f9':
			ClassPrepADD1();
			break;
			case 'f10':
			ItemPrepADD1();
			break;
			case 'f11':
			ItemPrepCHANGE1();
			break;
			case 'f12':
			ConfirmChanges();
			break;
			case 'f13':
			arrayBack = [];
			arrayForth = [];
			ClearUpperClass();
			$('#b101b').click();
			break;
			case 'f18':
			ToggleShowUpper();
			if ($('#container1').hasClass('hide')) {$('#b101b').click();} 
			else 
			{arrayBack = [];
			arrayForth = [];
			FillUpper();}
			break;			
			case 'f15':
			ToggleShowLower();
			if ($('#container2').hasClass('hide')) {$('#b101b').click();} 
			else 
			{arrayBack2 = [];
			arrayForth2 = [];
			FillLower();}
			break;
			default:
			alert('no');		
			}
	}

	function ToggleSelShow(){
	//SHOW CONTENT vs MULTISELECT
			if (showItem){showItem=false;$('#sortable1 li:not(".classname1")').off("click");$('#f2').text('SHOW Bullet Content');SelectME()}
			else{showItem=true;$('#sortable1 li:not(".classname1")').off("click");$('#f2').text('ENABLE Select');SelectionOff();ShowItem()};
			$('#f2').toggleClass("show");
			$('#b101b').click();		
	}
	
	function ShowItem(){
	//SHOW CONTENT PER BULLET
			$('#page2 li:not(".classname1, .classname2, .clip, .lnk")').off("click");$('#page2 li:not(".classname1, .classname2, .clip, .lnk")').on("click",function(){alert($(this).text());});
			$('.classname1').on("click",function(){ClassPrepADD1();});
			$("#page2 li.lnk ").on("click",function() { 
			var xid = $(this).attr('id');
			var a = xmla.querySelector('[id="'+xid+'"]');
			$('#dummy').append((new XMLSerializer()).serializeToString(a));
			if ($('a#'+xid).attr('id')==xid)
			{window.location = $('a#'+xid).attr('href');}
			else {if ($('source#'+xid).attr('id')==xid)
			{window.location = $('source#'+xid).attr('src');}
			else {window.location = $('embed#'+xid).attr('src');}
			};
			$('#dummy *').remove();
			});
			$('#page2 li.clip').off("click");$('#page2 li.clip').on("click",function(){	
			var cn = "";
			arrayForth = [];
			arrayForth2 = [];			
			if ($(this).siblings('.classname2').hasClass('classname2')){cn="#sortable2";arrayBack2.push($('.classname2').text());arrayBack2.push($('.classname2').attr('id'))} 
			else {cn="#sortable1";suu = false;arrayBack.push($('.classname1').text());arrayBack.push($('.classname1').attr('id'));
			};
			id=$(this).attr('id');name=$(this).text();ShowClassItems(name, id, cn);});
			showItem=true;
			$('#b101b').click();
	}	
			
	function SelectME(){
	//(MULTI)SELECT BULLETS IN CLIP
		$('#sortable1 :not(".classname1, strong")').on("click",function(event){
		if ($(this).hasClass('sel')) {} else {$(this).css('background','')};
		$(this).toggleClass('sel');Colorize();
		luid = event.target.id; if ($(this).hasClass('sel')){arrayA.push(luid);}else{arrayA.pop()};
		;});
		$('#b101b').click();
	}
		
	function SelectionOff(){
	//UNDO SELECTION
			$('.sel').removeClass('sel');
			Colorize(); 
			$('#b101b').click();
	}	
	
	function UndoSelection(){
	//UNDO CHANGES IN SELECTION
		var arrayA = [];
		$('.VANISH > strong').remove();
		$('.VANISH').removeClass('VANISH');
		$('.DEL > strong').remove();
		$('.DEL').removeClass('DEL');
		$('.NEW').remove();
		for (k=0;k<$('.CHANGE').size();k++){a=$('.CHANGE:eq('+k+')').attr('id'); arrayA.push(a);}	
		for (k=0;k<$('.CHANGE').size();k++){a=arrayA.pop();$('#'+a).text($('[xid='+a+']', xmla).text())};	
		$('.CHANGE').removeClass('CHANGE');
		$('.sel').removeClass('.sel');
		Colorize();
		$('#b101b').click();		
	}

	function ItemPrepDEL(){
	//PREPARE SELECTED FOR DELETION FROM CLIP
		var a = ($('.sel').length).toString();
		switch(a)
			{
			case '0':
			alert('FIRSTt select Bullet to be DELETED');
			break;
			default:
			
			for (k=0;k<$('.sel').size();k++){
			if ($('.sel:eq('+k+')').hasClass('NEW')){$('.sel:eq('+k+')'); $('.sel:eq('+k+') > strong').remove();};
			if ($('.sel:eq('+k+')').hasClass('CHANGE')){$('.sel:eq('+k+')').removeClass('CHANGE'); $('.sel:eq('+k+') > strong').remove();};
			if ($('.sel:eq('+k+')').hasClass('VANISH')){$('.sel:eq('+k+')').removeClass('VANISH'); $('.sel:eq('+k+') > strong').remove();};						
			if ($('.sel:eq('+k+')').hasClass('DEL')) {} else {$('.sel:eq('+k+')').addClass('DEL').prepend('<strong>TO BE DELETED !!- </strong>');};};
			$('.sel').removeClass('sel');
			$('#b101b').click();
			}
	}	
	
	function ItemPrepVANISH(){
	//PREPEARE SELECTED TO VANISH FROM STORAGE
		var a = ($('.sel').length).toString();
		switch(a)
			{	
			case '0':
			alert('FIRSTt select Bullet to be vanished');
			break;
			default:
			for (k=0;k<$('.sel').size();k++){
			if ($('.sel:eq('+k+')').hasClass('NEW')){$('.sel:eq('+k+')'); $('.sel:eq('+k+') > strong').remove();};
			if ($('.sel:eq('+k+')').hasClass('CHANGE')){$('.sel:eq('+k+')').removeClass('CHANGE'); $('.sel:eq('+k+') > strong').remove();};
			if ($('.sel:eq('+k+')').hasClass('DEL')){$('.sel:eq('+k+')').removeClass('DEL'); $('.sel:eq('+k+') > strong').remove();};		
			if ($('.sel:eq('+k+')').hasClass('VANISH')) {} else {$('.sel:eq('+k+')').addClass('VANISH').prepend('<strong>TO BE VANISHED !!!- </strong>');};};
			$('.sel').removeClass('sel');
			$('#b101b').click();	
			}	
	}	

	function ShowAlllUpper(){
	//SHOW CONTENT UPPER CLIP
			txt = ""; for (var i=1; i<$('#sortable1 li').size()+1; i++){txt= "<div>" + txt + "</div>" + $(' #sortable1 li:eq('+i+')').text();};
			$('#showcontent').text('');
			$('#showcontent').append(txt);
			Colorize2();
			$('#b101ba').click();			
	}			

	function ShowAlllLower(){
	//SHOW CONTENT LOWER CLIP
			txt = ""; for (var i=1; i<$('#sortable2 li').size()+1; i++){txt= "<div>" + txt + "</div>" + $(' #sortable2 li:eq('+i+')').text();};	
			$('#showcontent').text('');		
			$('#showcontent').append(txt);
			Colorize2();
			$('#b101ba').click();				
	}
	
	function ClearUpperClass(){
	//CLEAR UPPER WINDOW (e.g. after saving xml files).
		$('#sortable1 li:not(".classname1")').remove();
		$('.classname1').html('<strong>Upper:</strong>TOP CLIPS');
		$('.classname1').attr('id','q1');				
	}	
		
	function ClearLowerClass(){
	//CLEAR LOWER WINDOW (e.g. after saving xml files).
		$('#sortable2 li:not(".classname2")').remove();	
		$('.classname2').html('<strong>Lower:</strong>TOP CLIPS');
		$('.classname2').attr('id','q2');					
	}

	function GoToP1(){
	//GOTO FUNCCALLS-PAGE
		$('#b101a').click();
	}

	function GoToP2(){
	//GOTO CLIP-PAGE
		$('#b101b').click();
	}
	
	function GoToP3(){
	//GOTO FUNCCALLS-PAGE (not used yet)
		$('#b101c').click();
	}	

	function GoToP4(){
		$('#b101d').click();		
	}
			
	function SaveXML(){
	//SAVE XMLA (1/2)
		var txt="";
		var strA = '1 ' + (new XMLSerializer()).serializeToString(xmla);
		$.ajax({
		async: false,
		type: "POST",
		url: "/cgi-bin/cje.sh",
		data: strA,
		success: function(txt) {
		SaveXMLB()},
		error: function() {
		alert("Error:" + txt + "\n on saving XML 1 file.");
		}
		});
		$('#b101b').click();
	}
	
	function SaveXMLB(){
	//SAVE XMLB (2/2)
		var strB = '2 ' +  '\n' + (new XMLSerializer()).serializeToString(xmlb); 
		$.ajax({
		async: false,
		type: "POST",
		url: "/cgi-bin/cje.sh",
		data: strB,
		success: function(txt) {
		Message("Memory-Bullets Saved Into Files");},
		error: function() {
		alert("Error:" + txt + "\n on saving XML 2 file.");
		}
		});
	}	

	function RemoveDupl(){
	//REMOVE DUPLICATS
		arrayC=[];
		for (k=1;k<$('#sortable1 li').size();k++){a=$('#sortable1 li:eq('+k+')').attr('id'); arrayC.push(a);};			
		for (k=1;k<$('#sortable1 li').size();k++){a=arrayC.pop();$('#sortable2 [id='+a+']').not('li.classname2').remove();};
		$('#sortable2 [id='+$('.classname1').attr('id')+']').not('li.classname2').remove();
		if ($('#sortable2 li').size()==2){$('li.classname2').text('LOWER PART').attr('id','')};
	}
	
	function ToggleShowUpper(){
	//TOGGLE HIDE OR SHOW UPPER
		$('#container1').toggleClass('hide');
		if ($('#container1').hasClass('hide')){$('#f18').text('SHOW Upper Part');$('#f5, #f14').addClass('ui-screen-hidden');}
		else {$('#f18').text('HIDE Upper Part');$('#f5, #f14').removeClass('ui-screen-hidden');};
		}

	function ToggleShowLower(){
	//TOGGLE HIDE OR SHOW LOWER
		$('#container2').toggleClass('hide');
		if ($('#container2').hasClass('hide')){$('#f15').text('SHOW Lower Part');$('#f6, #f0a').addClass('ui-screen-hidden');}
		else {$('#f15').text('HIDE Lower Part');$('#f6, #f0a').removeClass('ui-screen-hidden');};
		}

	function Message(msg){
	//SHOW SHORT DURING MESSAGE
		var timeOut = 2;
		$('#mesBox').text(msg).fadeIn().css("display","block");
		setTimeout(function(){
		$('#mesBox').fadeOut().css("display","none");
		}, timeOut * 1000);
	}
		
	function ToggleSort(){
	//ENABLE/DIABLE FUCTIONS SORTING
		if (funcsort) {$("#funccalls1").listview('refresh');$("#funccalls1").sortable('disable');$("#f100").attr('value','SortON'); funcsort=false;} else {$("#funccalls1").sortable('enable');$("#f100").attr('value','SortOFF'); funcsort=true;};
	}

	function Colorize(){
	//COLORIZE LIST
		$('#sortable1 li:not(.classname1):even , #sortable2 li:not(.classname2):even ').not('.sel').css("background","#99FF66");
		$('#sortable1 li:not(.classname1):odd , #sortable2 li:not(.classname2):odd ').not('.sel').css("background","#FFFF99");
	}

	function Colorize2(){
	//COLORIZE LIST
		$('#showcontent div:even').css("background","#FFFF99");
		$('#showcontent div:odd').css("background","#99FF66");
	}

	function Backward(){
	//MOVE BACK 1 CLIP
		if (WalkThrough == '#sortable1')
		{arrayForth.push($('.classname1').text());
		arrayForth.push($('.classname1').attr('id'));
		var bid = arrayBack.pop();
		var bname = arrayBack.pop();
		if (bid === undefined) {alert('Already at Upper-Top Clips'); arrayForth.pop(); arrayForth.pop(); return }
		else {if ($('cl[xid='+bid+']', xmlb).length==0){alert('Back to Upper-Top Clips'); FillUpper(); return }
		else {ShowClassItems(bname, bid, "#sortable1")}};}			
		else
		{arrayForth2.push($('.classname2').text());
		arrayForth2.push($('.classname2').attr('id'));
		var bid = arrayBack2.pop();
		var bname = arrayBack2.pop();
		if (bid === undefined) {alert('Already at Lower-Top Clips'); arrayForth2.pop(); arrayForth2.pop(); return }
		else {if ($('cl[xid='+bid+']', xmlb).length==0){alert('Back to Lower-Top Clips'); FillLower(); return }
		else {ShowClassItems(bname, bid, "#sortable2")}};}			
	}

	function Forward(){
	//MOVE FORWARD 1 CLIP
		if (WalkThrough == '#sortable1')
		{arrayBack.push($('.classname1').text());
		arrayBack.push($('.classname1').attr('id'));
		var bid = arrayForth.pop();
		var bname = arrayForth.pop();
		if (bid === undefined) {alert('Just reached the (Upper) end.'); arrayBack.pop(); arrayBack.pop(); return }
		else {if ($('cl[xid='+bid+']', xmlb).length==0){alert('Just reached the (Upper) end.'); arrayBack.pop(); arrayBack.pop(); return }
		else {ShowClassItems(bname, bid, "#sortable1")}};}		
		else
		{arrayBack2.push($('.classname2').text());
		arrayBack2.push($('.classname2').attr('id'));
		var bid = arrayForth2.pop();
		var bname = arrayForth2.pop();
		if (bid === undefined) {alert('Just reached the (Lower) end.'); arrayBack2.pop(); arrayBack2.pop(); return }
		else {if ($('cl[xid='+bid+']', xmlb).length==0){alert('Just reached the (Lower) end.'); arrayBack2.pop(); arrayBack2.pop(); return }
		else {ShowClassItems(bname, bid, "#sortable2")}};}			
	}

	function WalkUpDown() {
	//SET TRAVERSAL BUTTON TO UP OR DOWN
		if (WalkThrough == '#sortable1' && $('#container2').hasClass('hide')){alert('LOWER part is hidden, \n\so only UPPER part can be walked through')}
		else {if (WalkThrough == '#sortable2') {WalkThrough = '#sortable1'; $('#f101').attr('value','ToLower');} 
		else {WalkThrough = '#sortable2'; $('#f101').attr('value','ToUpper');}};
	}

	function InvertSel() {
	//INVERT SELECTION
			showItem=false;$('#sortable1 li:not(".classname1")').off("click");$('#f2').text('SHOW Bullet Content');$('#f2').addClass("show");SelectME();
			$('#sortable1 li:not(.classname1)').css('background','').toggleClass('sel');
			Colorize();
			$('#b101b').click();
	}

	function RefillUpper() {
	//REFILL UPPER PART
		$('#sortable1 li:not(".classname1")').appendTo('#dummy'); 
		var a = $('#dummy li').length;
		for (var i = 0; i<a ; i++){
		$dfc = $('#dummy li:first-child');
		$('#sortable1').append('<li />');
		$('#sortable1 li:last-child').addClass($dfc.attr('class')).attr('id',$dfc.attr('id')).html($dfc.text());
		$dfc.remove();
		}		
		$('#page2 li').off("click");
		$('#sortable1 li,#sortable2 li').off("click");
		Colorize();
		if(showItem){ShowItem();}else{SelectME();};
		$('#b101b').click();
		$('#sortable1, #sortable2').listview('refresh');				
	}

	function ToTEMP(drop, helper) {
	//DROP BULLETS IN TEMP-CLIP
		if ($('cl[xid="TEMP"] bu[xid="'+$(drop).attr('id')+'"]', xmlb).length !=0 ){
		$(drop).remove();
		$(helper).remove();
		Message("Placed into TEMPORARIES");	
		$('#sortable1, #sortable2').listview('refresh');							
		return;};
		var bul = xmlb.createElement('bu');
		$('cl[xid="TEMP"]', xmlb).append($(bul));
		$('cl[xid="TEMP"] bu:last-child', xmlb).attr('xid', $(drop).attr('id'));
		if ($(drop).hasClass('txt')){$('cl[xid="TEMP"] bu:last-child', xmlb).attr('cl','txt');};
		if ($(drop).hasClass('lnk')){$('cl[xid="TEMP"] bu:last-child', xmlb).attr('cl','lnk');};
		if ($(drop).hasClass('clip')){$('cl[xid="TEMP"] bu:last-child', xmlb).attr('cl','clip');};		
		$(drop).remove();
		$(helper).remove();
		Message("Placed into TEMPORARIES");	
		$('#sortable1, #sortable2').listview('refresh');	
		}

	function EmptyTEMP() {
	//EMPTY TEMP-CLIP 
		$('[xid="TEMP"] bu', xmlb).remove();
		FillLower();	
		Message("TEMPORARIES emptied");		
		}
	$(document).ready(function() {
		$('#sortable1').sortable({ items:"li:not(.classname1)", revert: true, connectWith: "#sortable1", scroll: true, helper: "clone", appendTo:"body"});	
		$('#sortable2').sortable({ items:"li:not(.classname2, #TEMP)", revert: true, connectWith: "#sortable1", scroll: true, helper: "clone", appendTo:"body"});
		$("#sortable1" ).sortable({ update: function(event,ui){RefillUpper()}, 
		receive: function(event,ui){if (showItem){} else {$('#sortable1 li').off('click');SelectME();};}});
    	$('#sortable2').sortable({ activate: function(event,ui){RemoveDupl()}});
    	$(".classname1, .classname2").droppable({ accept: "li:not('#TEMP')", drop: function(event, ui){ToTEMP(ui.draggable, ui.helper);}});
    	$( "#sortable1, #sortable2").disableSelection();
    	<!-- Refresh list to the end of sort to have a correct display -->
    	$("#sortable1, #sortable2").bind( "sortstop", function(event, ui) {
      	Colorize();		
      	$('#sortable1, #sortable2').listview('refresh');
    	});
		$("#funccalls1").click(function(event){DoFunc(event)});
		$("#funccalls1").sortable({ revert: true, scroll: true, helper: "clone", appendTo:"body" });
		$("#funccalls1").sortable('disable'); funcsort = false ;
		$("#f9a textarea").click(function(event){ClassPrepADD1();});
		$('#container2').addClass('hide');
		showItem=true;
		arrayBack = [];
		arrayForth = [];
		arrayBack2 = [];
		arrayForth2 = [];
		WalkThrough = '#sortable1';
		$('#f2').addClass('show').removeClass('show');
		$('#f6, #f0a').addClass('ui-screen-hidden');
		LoadXML();
    	});


  	

