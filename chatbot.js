//Reverse Sentence game
    const stringsList = ["Twincle Twincle Little Star", "All that glitter is not gold", "The old that is strong does not wither", "Deep roots are not reached by the frost", "From the ashes a fire shall be woken","A light from the shadows shall spring","The crownless again shall be king","Renewed shall be blade that was broken","We love the things we love for what they are","You talk when you cease to be at peace with your thoughts","I carry your hear","Hope is the thing with feathers","The caged bird sings"];
    let selectedString;
    let timer;
    let timeLeft = 45;
    let userInputElement = document.getElementById('userInput');
    let instructionElement = document.getElementById('instruction');
    let timerElement = document.getElementById('timer');
    let resultElement = document.getElementById('result');
    let alertSound = document.getElementById('alertSound');
    let startGameButton = document.getElementById('startGame');
    let restartGameButton = document.getElementById('restartGame');
    let inputContainer = document.getElementById('inputContainer');
    
    startGameButton.addEventListener('click', startGame);
    restartGameButton.addEventListener('click', restartGame);
    
    function startGame() {
    selectedString = stringsList[Math.floor(Math.random() * stringsList.length)];
    instructionElement.innerHTML =`<div id="inst"><h4>বাক্যটি লিখুন:</h4><h4 style="direction:rtl; unicode-bidi:bidi-override;">${selectedString}</h4></div>`;
    inputContainer.style.display = 'block';  // Show the input field
    timeLeft = 45;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    userInputElement.value = '';
    userInputElement.disabled = false;
    userInputElement.focus();
    resultElement.textContent = '';
    restartGameButton.style.display = 'none';
    startGameButton.style.display = 'none';
    
    timer = setInterval(function() {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
    clearInterval(timer);
    alertSound.play();
    endGame(false);
    }
    }, 1000);
    
    userInputElement.addEventListener('input', checkInput);
    }
    
    function checkInput() {
    if (userInputElement.value === selectedString) {
    clearInterval(timer);
    endGame(true);
    }
    }
    
    function endGame(success) {
    userInputElement.disabled = true;
    restartGameButton.style.display = 'inline-block';
    inputContainer.style.display = 'none';  // Hide the input field
    if (success) {
    resultElement.textContent = `আপনি উত্তরটি সফলভাবে দিতে পেরেছেন। আপনার সময় লেগেছে ${45 - timeLeft} সেকেন্ড।`;
    } else {
    resultElement.innerHTML = `সময় শেষ! আপনি উত্তর দিতে ব্যর্থ হয়েছেন। <br> বাক্যটি ছিলো: ❝ ${selectedString} ❞`;
    }
    }
    
    function restartGame() {
    startGameButton.style.display = 'inline-block';
    restartGameButton.style.display = 'none';
    instructionElement.textContent = '';
    timerElement.textContent = '';
    resultElement.textContent = '';
    inputContainer.style.display = 'none';  // Hide the input field
    }
    
    
    //Number Games
    const randomNumber=Math.floor(Math.random()*100)+1;
    let attempts=0;
    
    function guesschecker(){
    let userInput=parseInt(document.getElementById('userInputGuessGame').value);
    let messageElement=document.getElementById('message');
    attempts++;
    
    if(userInput==randomNumber){
    messageElement.textContent=`অভিনন্দন! আপনার অনুমান সফল হয়েছে। আপনার অনুমানটি ছিল: ${randomNumber} আপনি ${attempts} বার চেষ্টা করেছেন।`;
    messageElement.style.color='green';
    } else if(userInput<randomNumber){
    messageElement.textContent='অনেক ছোট সংখ্যা ধরেছেন। আরেকটু বড় সংখ্যা ধরুন';
    messageElement.style.color='red';
    userInput.value='';
    }else{
    messageElement.textContent='অনেক বড় সংখ্যা ধরেছেন। আরেকটু ছোট সংখ্যা ধরুন';
    messageElement.style.color='red';
    userInput.value='';
    }
    document.getElementById('games').reset();
    userInput.focus();
    }
    
    
    //ChatBot App start from here
    //here are some global variable
    let name;
    let age;
    let education;
    let division;
    let district;
    let messageOutput=document.getElementById('chatBox');
    //information collection & chat page open
    document.getElementById('chatBotForm').addEventListener("submit",function(event){
    event.preventDefault();
    name=document.getElementById('name').value.trim();
    age=parseInt(document.getElementById('age').value);
    education=document.getElementById('education').value;
    division=document.getElementById('division').value;
    district=document.getElementById('district').value;
    
    document.getElementById('body1').style.display='none';
    document.getElementById('body2').style.display='block';
    });
    
    
    //message keywords
    const keywords={
    greetings:["hello","hi"],
    timeGreetings:["good morning","good afternoon","good evening","good night"],
    asking:["kita koro","kita korray","kita koro te okn","kita korray te ar","koi re","kita kortaco","ki koro","ki korcen","ki kortecen","ki korco"],
    askingReply:["kicchu korram na","kicchu kortaci na","kichu korci na","huti roici","suye takci","suiya takci","suye achi","boitakci","boi takci","boi roici","boiroici","boiya takci","boiya roici","bose achi","bose takci","dariye achi","karai roici","ubai roici","ubaiya","ubat","kaj kam korram","kam kaj korram","kicchu nay","kaj kam kortaci","kam kaj kortaci","kam kaj korci", "collage e jaitaci","school e jaitaci","bazaro jaitaci","baire jairam","ami kicchu korram na","kaj kam korat aslm"],
	valoNiReply:["oy","oy vala achi","oy alhamdulillah vala achi","alhamdulillah vala achi.","oy vala achi","ji valo achi.","hea valo achi","hea valo achi apni valo achen","alhamdulillah vala achi","alhamdulillah vala","alhamdulillah bala achi"],
    monValaNayKene:["kita oice?","mon vala na kene?","mon vala na kellaigga","mon vala na kere?","ki hoyeche?","mon valo na keno?"],
    tmiValani:["tmi vala ni","apne vala ni","apni valo achen","tmi valo acho","tmi vala ni?","apni valo achen?","vala acho ni","vala acho ni?","vala ni","bala ni","bala ni?","tumi bala acho ni"],
    kawaDawa:["kawa dawa korco ni","kawa dawa korco ni?","kawa dawa dawa korcoin ni","kawa dawa korcoin ni?","kawa sesh ni","kawa ses ni","kawa sesh ni?","kawa ses ni?","kawa hoice ni?","kawa hoice ni","kaico ni","kaico ni?","kaicen ni","kaicen ni?","kawa dawa korco","kawa dawa koreco","kawa dawa korco?","kawa dawa koreco?","keyecho","keyeco?","kaico","kaico?","vat kaico ni","vat kaico ni?","vat kaicen ni?","bat kaico ni"],
    kawaDawa2:["oy, kawa dawa oice","kawa dawa sesh","oy sesh","oy ses","kailaici","sesh oigece","hmm sesh","hmmm sesh","kaiya laici","kaiyalaici","sesh","ses","kawa dawa sesh","hmmmm sesh","jii kaici","ji kaici","hea kawa dawa sesh","hea kawa dawa sesh amar","kawa dawa sesh amar","kawa dawa sesh amr","keye feleci","keye felechi","aro agei kailaici","aro agei kaici","aro agei keyechi","kaici na","na","jii na","ji na","na, kai nai","na kai nai"],
    kawaDawa3:["kun somy vhat khaity te", "kun somoy kaitay te","bakka late oice kailaw", "kailaw","kun somoy kaitay"],
    barirSobValaniReply:["oy alhamdulillah vala achoin","alhamdulillah vala achoin","vala","vala achoin","oy vala","oy alhamdulillah vala ache","vala ache","alhamdulillah","ji alhamdulillah vala ache","ji vala ache","sob vala achoin","achoin vala sob","achoin alhamdulillah","valo ache alhamdulillah","valo alhamdulillah","valo", "vala achoin sob"],
    tmrbarirsobValani:["tmr barir sob vala ni","tmr barir sob vala ni?","barir sob vala ni","barir sob vala ni?","barir tara kita korra","barir tara vala achoin ni","barir tara kita korra?","barir tara vala achoin ni?","barir sobai vala ni","barir sobai vala ni?","barir sovai vala ni?","barir sobai vala ache ni?","barir sobai vala ache ni","barir tara kita koroin?","tmr barir sobai vala ache ni?","barir sobai vala ni"],
    chatEndingmsg:["te ar vala tako","accha te vala tako","allah hafeez","allah hafiz","good bye","by","bye","raki","accha te","accha vala takoin","accha te vala takoin"]
    };
    
    //Take chat input and proccessing
    document.getElementById('chatInput').addEventListener("submit",function(processing){
    processing.preventDefault();
    let messageLowerCase=document.getElementById('inputMessage').value.toLowerCase();
    let message=messageLowerCase[0].toUpperCase()+messageLowerCase.slice(1);
    document.getElementById('inputMessage').value="";
    document.getElementById('chatInput').reset();
    //document.getElementById('inputMessage').focus();
    messageOutput.innerHTML+=`<div class="message-bubble">${message}</div><br>`;
    setTimeout(function(){
    messageOutput.innerHTML+=`<p id="typingIndicator" style="color:black; font-weight:bold; font-size:18px; margin:5px 20px 5px 0;"><span class="spinner-grow spinner-grow-sm"></span> Typing...</p>`;
    messageOutput.scrollTop =messageOutput.scrollHeight; // Auto-scroll to the bottom
    },300);
    setTimeout(function(){
    let typingElement=document.getElementById('typingIndicator');
    if(typingElement){
    typingElement.remove();
    }
    },4000);
    setTimeout(function(){
    let responseSent = false;
    
    
    
    //greetings processing
    if (!responseSent) {
    let greetingsFound=keywords.greetings.some(greeting=>messageLowerCase.match(new RegExp(`\\b${greeting}\\b`, 'i')));
	if(greetingsFound){
	(function(){
	const reply=["Hi","Hello"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	let greetingsIndex=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${greetingsIndex}, ${name}</div><br>`;
	})();
	setTimeout(function(){
	messageOutput.innerHTML+=`<div class="message-bubble2">Kita koro vala ni?</div><br>`;
	messageOutput.scrollTop =messageOutput.scrollHeight; // Auto-scroll to the bottom
	},1500);
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	
	
	//Time greetings processing
	if (!responseSent) {
	let timeGreetingsFound=keywords.timeGreetings.some(timegreeting=>messageLowerCase.match(new RegExp(`\\b${timegreeting}\\b`, 'i')));
	if(timeGreetingsFound){
	let hour=new Date().getHours();
	if(hour>=19){
	messageOutput.innerHTML+=`<div class="message-bubble2">Good Night! ${name}</div><br>`;
	}else if(hour>=15){
	messageOutput.innerHTML+=`<div class="message-bubble2">Good Evening! ${name}</div><br>`;
	}else if(hour>=11){
	messageOutput.innerHTML+=`<div class="message-bubble2">Good Afternoon! ${name}</div><br>`;
	}else if(hour>=5){
	messageOutput.innerHTML+=`<div class="message-bubble2">Good Morning! ${name}</div><br>`;
	}else{
	messageOutput.innerHTML+=`<div class="message-bubble2">Good mid Night! ${name}</div><br>`;
	}
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	
	
	// Initial Asking something processing
	if (!responseSent) {
	let askingFound=keywords.asking.some(ask=>messageLowerCase.match(new RegExp(`\\b${ask}\\b`, 'i')));
	if(askingFound){
	if(district=="moulvibazar" || district=="sylhet"){
	(function(){
	const reply=["Owtto kicchu korram na. Tmi kita koro?","Ow tho kam kaj korram. Tmi kita koro?","Ow tho office o kaj korram. Tmi kita koro?", "Boitakci, Tmi kita koro?","Huti roici. Tmi kita korray?"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const askingIndex=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${askingIndex}</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;

	}else if(district=="hobigonj" || district=="sunamganj"){
	(function(){
	const reply=["Oitto kicchu kortaci na. Tmi kita koro?","Oitto Kaj kam kortaci. Tmi kita koro?","Office o kaj kortaci. Tmi kita koro?","Boiya Takci. Tmi kita koro?","Huitta roici. Tmi kita koro?"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const askingIndex=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${askingIndex}</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else{
	(function(){
	const reply=["Ei tho kichu korci na. Tmi ki korco?","Ei tho kaj kam korci. Tmi ki korco?","Ei tho office e kaj korci. Tmi ki korco?", "Bose achi, Tmi ki korco?","Suye achi. Tmi ki korco?"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const askingIndex=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${askingIndex}</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	}
	
	
	// Say something after asking reply processing
	if (!responseSent) {
	let askingReplyFound=keywords.askingReply.some(askReply=>messageLowerCase.match(new RegExp(`\\b${askReply}\\b`, 'i')));
	if(askingReplyFound){
	if(district=="moulvibazar" || district=="sylhet"){
	(function(){
	const reply=["Vala acho ni?","Tmr sorir vala ni?","Tmr mon vala ni?"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else if(district=="hobigonj" || district=="sunamganj"){
	(function(){
	const reply=["Vala acho ni?","Tmr sorir vala ni?","Tmr mon vala ni?"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else{
	(function(){
	const reply=["Valo acho?","Tmr sorir valo ache?","Tumar mon valo ache?"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	}
	
	// valo ni reply processing
	if (!responseSent) {
	let valoniReplyFound=keywords.valoNiReply.some(valoNiRpl=>messageLowerCase.match(new RegExp(`\\b${valoNiRpl}\\b`, 'i')));
	if(valoniReplyFound){
	messageOutput.innerHTML+=`<div class="message-bubble2">Alhamdulillah</div><br>`;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	
	//Tmi vala ni ask processing
	if (!responseSent) {
	let tmiValaniReplyFound=keywords.tmiValani.some(tmiValaniRpl=>messageLowerCase.match(new RegExp(`\\b${tmiValaniRpl}\\b`, 'i')));
	if(tmiValaniReplyFound){
	if(district=="moulvibazar" || district=="sylhet"){
	(function(){
	const reply=["Alhamdulillah vala achi","Mon vala nay","Vala lager na","Vala achi"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Tmi kita koro?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else if(district=="hobigonj" || district=="sunamganj"){
	(function(){
	const reply=["Alhamdulillah vala achi","Mon vala na","Vala lagtace na","Vala achi"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Tmi kita koro?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else{
	(function(){
	const reply=["Alhamdulillah valo achi","Mon valo na","Valo lagce na kichu","Valo achi"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Tmi ki korco?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	}
	
	
	// Mon valo nai keno reply processing
	if (!responseSent) {
	let monValonaiKenoFound=keywords.monValaNayKene.some(monValaNayKeneRepl=>messageLowerCase.match(new RegExp(`\\b${monValaNayKeneRepl}\\b`, 'i')));
	if(monValonaiKenoFound){
	if(district=="moulvibazar" || district=="sylhet"){
	(function(){
	const reply=["Emnei vala lager na","Barir sobar kotha mone hor","Din vala nay ow mon karap","Je gorom porce kicchu vala lager na re shuna"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Kawa Dawa korco ni?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else if(district=="hobigonj" || district=="sunamganj"){
	(function(){
	const reply=["Emnei, Kichcu vala lagtace na","Barir sobar kotha mone portace","Din ta vala na, kirokom jani hoiya roice. Er laigga vala lagtace na","Je gorom porce kicchui vala lagtcae na"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Kawa Dawa korco ni?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else{
	(function(){
	const reply=["Emnei Mon ta valo nei","Keno jani hotat mon karap hoye gece","Ajke onek gorom porce tai valo lagtece na"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const index=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${index}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Kawa Dawa koreco?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	}
	
	
	// kawa dawa asking
	if (!responseSent) {
	let kawaDawaaskingFound=keywords.kawaDawa.some(kawaDawaask=>messageLowerCase.match(new RegExp(`\\b${kawaDawaask}\\b`, 'i')));
	if(kawaDawaaskingFound){
	if(district=="moulvibazar" || district=="sylhet"){
	(function(){
	const reply=["Kaici na","Kawa dawa sesh","Ekono kaici na"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const askingIndex=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${askingIndex}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Tmr kawa dawa sesh ni?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else if(district=="hobigonj" || district=="sunamganj"){
	(function(){
	const reply=["Kaici na","Kawa dawa sesh","Ekono kaici na"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const askingIndex=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${askingIndex}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Tmr kawa dawa sesh ni?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	
	}else{
	(function(){
	const reply=["Kai nai","Kawa dawa sesh","Ekono kai nai"];
	const randomIndex=Math.floor(Math.random()*reply.length);
	const askingIndex=reply[randomIndex];
	messageOutput.innerHTML+=`<div class="message-bubble2">${askingIndex}</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Tmr kawa dawa hoice?</div><br>`;
	})();
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	}
	
	
	// 2nd part kawa dawa asking
	if (!responseSent) {
	let kawaDawaaskingFound2=keywords.kawaDawa2.some(kawaDawaask2=>messageLowerCase.match(new RegExp(`\\b${kawaDawaask2}\\b`, 'i')));
	if(kawaDawaaskingFound2){
	messageOutput.innerHTML+=`<div class="message-bubble2">Oh</div><br>`;
	messageOutput.innerHTML+=`<div class="message-bubble2">Barir sob vala ni?</div><br>`;
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	
	
	// 3rd part kawa dawa asking
	if (!responseSent) {
	let kawaDawaaskingFound3=keywords.kawaDawa3.some(kawaDawaask3=>messageLowerCase.match(new RegExp(`\\b${kawaDawaask3}\\b`, 'i')));
	if(kawaDawaaskingFound3){
	messageOutput.innerHTML+=`<div class="message-bubble2">Ow tho tura pore kailaimu</div><br>`;
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	
	
	// Barir sob valo ni processing
	if (!responseSent) {
	let barirsobReplyFound=keywords.barirSobValaniReply.some(barirsobvalani=>messageLowerCase.match(new RegExp(`\\b${barirsobvalani}\\b`, 'i')));
	if(barirsobReplyFound){
	messageOutput.innerHTML+=`<div class="message-bubble2">Oh</div><br>`;
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	
	
	// 2nd part Barir sob valo ni processing
	if (!responseSent) {
	let barirsobReplyFound2=keywords.tmrbarirsobValani.some(barirsobvalani2=>messageLowerCase.match(new RegExp(`\\b${barirsobvalani2}\\b`, 'i')));
	if(barirsobReplyFound2){
	messageOutput.innerHTML+=`<div class="message-bubble2">Alhamdulillah sobai vala achoin.</div><br>`;
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	
	
	if (!responseSent) {
	let chatEndingmsgFound=keywords.chatEndingmsg.some(end=>messageLowerCase.match(new RegExp(`\\b${end}\\b`, 'i')));
	if(chatEndingmsgFound){
	messageOutput.innerHTML+=`<div class="message-bubble2">Allah Hafeez, Assalamuwalaikum, vala tako</div><br>`;
	responseSent = true;
	messageOutput.scrollTop =messageOutput.scrollHeight; //auto scroll
	return;
	}
	}
	//(New) write something here
	messageOutput.scrollTop =messageOutput.scrollHeight; // Total chatBox Auto-scroll
	},4200);
	messageOutput.scrollTop =messageOutput.scrollHeight; // Auto-scroll to the bottom
    });