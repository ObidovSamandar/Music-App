// Slider
let next=3;
let previous=3;
let nextBtn=document.querySelector('.next');
let previousBtn=document.querySelector('.previous');
nextBtn.onclick=function(){
	if(next==3){
		document.querySelector('.slider-1.slider').style.left='-150%';
		document.querySelector('.slider-2.slider').style.left='50%';
		next=2;
	}else if(next==2){
		document.querySelector('.slider-2.slider').style.left='-150%';
		document.querySelector('.slider-3.slider').style.left='50%';
		next=1;
		previous=3;
	}
}
previousBtn.onclick=function(){
	if(previous==3 && next!=2){
		document.querySelector('.slider-2.slider').style.left='50%';
		document.querySelector('.slider-3.slider').style.left='150%';
		previous=2;
	}

	if(next==1 && previous==2){
		next=2;
	}

	if(next==2 && previous==3){
		document.querySelector('.slider-1.slider').style.left='50%';
		document.querySelector('.slider-2.slider').style.left='150%';
		next=3;
	}

	if(next==2 && previous==2){
		previous=3;
	}

	if(next==3 && previous==2){
		document.querySelector('.slider-1.slider').style.left='50%';
		document.querySelector('.slider-2.slider').style.left='150%';
	}
}


//Getting Tracks From Local Storage
let ul=document.querySelector('.sliderInner');
let count=0;
let ul2=document.querySelector('.sliderInner.slider-2');
let ul3=document.querySelector('.sliderInner.slider-3');


let storeTracks;
let result;

let searchTrack=document.getElementById('searchMusics');

let searchBtn=document.getElementById('search');

result=JSON.parse(window.localStorage.getItem('tracks'));
if(result!=null){
	objectResults(result);
}



// Getting Tracks
async function getMusic(track){
	let getterTrack= await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${track}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "f3ee2c3fa4mshe5163e25d567c29p1e10c0jsn7046736ffa7b",
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
		}
	});

	result =await getterTrack.json();
	console.log(result)
	let h1=document.createElement('h1');;
	let foundDiv;
	if(result.data.length==0){

		foundDiv=document.querySelector('.foundInfo');
		h1.setAttribute('class','notFoundheader')
		h1.innerHTML='Not found &#128542';
		foundDiv.appendChild(h1);
		
		nextBtn.setAttribute('disabled','disabled');	
		previousBtn.setAttribute('disabled','disabled');

		storeTracks=window.localStorage.setItem('tracks',JSON.stringify(result));

	}else{
		if(document.querySelector('.notFoundheader')!=null){
			document.querySelector('.notFoundheader').innerHTML=null;
		}
		nextBtn.removeAttribute('disabled');
		previousBtn.removeAttribute('disabled');

		storeTracks=window.localStorage.setItem('tracks',JSON.stringify(result));

		objectResults(result);
	}
}


// ObjectResults
function objectResults(results){
	if(results.data.length<13 || results.data.length<25){
			nextBtn.setAttribute('disabled','disabled')
	}
	results.data.map( (element)=>{
		let artistName=element.artist.name;

		let trackTitle=element.title_short;

		let artistImg=element.artist.picture;

		let song=element.preview;

		let songBackgroundImg=element.album.cover_medium;

		let linkForTrack=element.link;


		let li=document.createElement('li');
		count++;
		li.setAttribute('class','musicItem');
		li.style.backgroundImage=`url(${songBackgroundImg})`

		let pArtistName=document.createElement('p');
		pArtistName.setAttribute('class','artistName');

		pArtistName.innerHTML=artistName;
		li.appendChild(pArtistName);

		let ptrackTitle=document.createElement('p');
		ptrackTitle.setAttribute('class','trackTitle');

		ptrackTitle.innerHTML=trackTitle;
		li.appendChild(ptrackTitle);

		let ptrackLink=document.createElement('p');
		ptrackLink.setAttribute('class','trackLink');

		ptrackLink.innerHTML=`<a href="${linkForTrack}" target="_blank">Song</a>`;
		li.appendChild(ptrackLink);

		let divImg=document.createElement('div')
		divImg.setAttribute('class','artistImg');
		divImg.innerHTML=`<img src=${artistImg}>`;

		li.appendChild(divImg);

		let audio=document.createElement('audio')
		audio.setAttribute('controls','controls');
		audio.innerHTML=`<source src="${song}" type="audio/mp3">`;

		li.appendChild(audio);
		if(count<13){
			ul.appendChild(li);
		}
		if(count>=13){
			ul2.appendChild(li);
		}
		if(count>=25){
			ul3.appendChild(li);
		}

		if(results.data.length==count){
			count=0;
		}
		
		if(results.data.length<13 || results.data.length<25){
			nextBtn.setAttribute('disabled','disabled')
		}
	});
}


// Search Button
searchBtn.onclick=()=>{
	ul.innerHTML=null;
	ul2.innerHTML=null;
	ul3.innerHTML=null;
	getMusic(searchTrack.value);
}
