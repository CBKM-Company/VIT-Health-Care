questions = []
imgques = []
imgql = 0;
qno = 0;
bimg = '';
q=1;
result = 0;
totalResult = 0;

b = [];
axios.get("http://vit-health-care.herokuapp.com/bt")
.then(res=>{
    questions = res.data;
   
    for (var a = [], i = 0; i < res.data.length; ++i) a[i] = i;
        function shuffle(array) {
            var tmp, current, top = array.length;
            if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }
        b = shuffle(a);
        start(questions[b[qno]].img);
})
.catch(e=>{
    console.log(e);
})

function start(img){
    imgques = questions[b[qno]].questions;
    totalResult = imgques.length;
    imgql = imgques.length-1;
    document.getElementById('img').innerHTML  = ` <center>
    <img src="http://vit-health-care.herokuapp.com/static/${img}" alt="">
    </center>`;
    document.getElementById('img').hidden = true;

    qno++;
}

function bstart(){
  document.getElementById('img').hidden = false;
  document.getElementById('change').innerHTML = "";
  setTimeout(() => {
    next();
    document.getElementById('img').hidden = true;

}, 5000);

}

function nextCharacter(c) { 
    return String.fromCharCode(c.charCodeAt(0) + 1); 
} 






function select(que,ans){
    if(que == ans){
        result++;
    }
    next();
}
    const getStorage = (item) => (JSON.parse(localStorage.getItem(item)))
    const setStorage = (item, data) => (localStorage.setItem(item, JSON.stringify(data)))
    const removeStorage = (item) => (localStorage.removeItem(item))

function next(){
    if(imgql>=0){
    opt = 'A';
    str = '';
    str += `<section class="hero is-primary is-fullheight">
    <div class="">
      <div class="container">
        <div class="columns is-mobile is-centered">
          <div class="column is-full">
            <div class="has-text-centered">
            <h1 class="title has-text-centered">Screen Test</h1>
            <h7 class="subtitle has-text-centered is-uppercase is-7 navigation">QUESTION ${q} OF ${imgques.length}</h7>
            <h5 id="question" class="subtitle has-text-centered is-5">${imgques[imgql].question}</h5>`;
            for( i=0 ; i<imgques[imgql].options.length;  i++){
            str += `<p class="option has-text-grey-dark" onclick="select('${imgques[imgql].options[i]}','${imgques[imgql].answer[0]}')">
              <span class="has-text-weight-bold is-size-5" id="op1" >${opt}</span>${imgques[imgql].options[i]}    
            </p>`;
            opt = nextCharacter(opt);
}

           str+= `
          </div>
        </div>
      </div>
    </div>
  </section>`;
  document.getElementById('change').innerHTML = str;
  imgql--;
  q++;
}
else{
  res = getStorage('result');
  delirium = 1-result/totalResult;
  console.log(res)
  setStorage('mar',{
    depression : res.depression,
    dementia : res.dementia,
    delirium : delirium
  })
    //alert('delirium: '+delirium+' depression: '+res.depression+' dementia: '+res.dementia);
    window.location.href = 'result.html';
}
}


