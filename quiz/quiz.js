demq = [];
despq = [];
questions = [];
depres = 0;
demres = 0;
totaldepres = 0;
totaldemres = 0;

i = 0;
qno = 0;
q=1;
b = [];


axios.get("http://vit-health-care.herokuapp.com/depress")
    .then(res => {
        console.log(res.data)
        demq = res.data
        res.data.map(d => {
            questions.push(d)
            
        })
        axios.get("http://vit-health-care.herokuapp.com/dementia")
    .then(res => {
        console.log(res.data)
        despq = res.data
        res.data.map(d => {
            questions.push(d)
        })
        for (var a = [], i = 0; i < questions.length; ++i) a[i] = i;
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
        start();
        // console.log(a);
        // for(i=0;i<a.length;i++){
        //     alert(a[i]);
        //     console.log(questions[a[i]] )
            
        // }
    })
    })

    

    function check(a){
       // alert(a);
        if(a<=8){
            i = 0;
            //alert('depression');
            document.getElementById('change').innerHTML = `<section class="hero is-primary is-fullheight">
        <div class="">
          <div class="container">
            <div class="columns is-mobile is-centered">
              <div class="column is-full">
                <div class="has-text-centered">
                <h1 class="title has-text-centered">Screen Test</h1>
                <h7 class="subtitle has-text-centered is-uppercase is-7 navigation">QUESTION ${q} OF 20</h7>
                <h5 id="question" class="subtitle has-text-centered is-5">${questions[a]}</h5>
                <p class="option has-text-grey-dark" onclick="select('op1')">
                  <span class="has-text-weight-bold is-size-5" id="op1" >A</span>NOT AT ALL    
                </p>
                <p class="option has-text-grey-dark" onclick="select('op2')">
                  <span class="has-text-weight-bold is-size-5" id="op2" >B</span>SEVERAL DAYS
                </p>
                <p class="option has-text-grey-dark" onclick="select('op3')">
                  <span class="has-text-weight-bold is-size-5" id="op3" >C</span>MORE THAN HALF THE DAYS
                </p>
                <p class="option has-text-grey-dark" onclick="select('op4')">
                  <span class="has-text-weight-bold is-size-5" id="op4" >D</span>NEARLY EVERY DAY
                </p>
                <a onclick="nextQues()" class="button is-primary is-inverted is-outlined is-rounded is-fullwidth">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </section>`;
        }
        else{  
            i = 1;
           // alert('dementia');
            document.getElementById('change').innerHTML = `<section class="hero is-primary is-fullheight">
        <div class="">
          <div class="container">
            <div class="columns is-mobile is-centered">
              <div class="column is-full">
                <div class="has-text-centered">
                <h1 class="title has-text-centered">Screen Test</h1>
                <h7 class="subtitle has-text-centered is-uppercase is-7 navigation">QUESTION ${q} OF 20</h7>
                <h5 id="question" class="subtitle has-text-centered is-5">${questions[a]}</h5>
                <p class="option has-text-grey-dark" onclick="select('op1')">
                <span class="has-text-weight-bold is-size-5" id="op1" >A</span>Never    
              </p>
              <p class="option has-text-grey-dark" onclick="select('op2')">
                <span class="has-text-weight-bold is-size-5" id="op2" >B</span>Rarely
              </p>
              <p class="option has-text-grey-dark" onclick="select('op3')">
                <span class="has-text-weight-bold is-size-5" id="op3" >C</span>Often
              </p>
              <p class="option has-text-grey-dark" onclick="select('op4')">
                <span class="has-text-weight-bold is-size-5" id="op4" >D</span>Very Often
              </p>
                <a onclick="nextQues()" class="button is-primary is-inverted is-outlined is-rounded is-fullwidth">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </section>`;
        }

        q++;
        qno++;
    }
    var opSelect = -1;
    function start(){      
        check(b[qno]);   
    }

    
    function nextQues(){
        if(opSelect != -1){
        if(qno<= 5){
            //alert(opSelect); 
            if(i==0){
                depres += opSelect;
                totaldepres+=3;
            }
            else{
                demres += opSelect;
                totaldemres+=3;
            }
        check(b[qno]);
        opSelect = -1;
        }
    
        else{
          console.log(totaldepres);
          console.log(totaldemres);
          totaldepres = (depres/totaldepres)*100;
          totaldemres = (demres/totaldemres)*100;
         // alert(totaldepres+'--'+totaldemres)
          setStorage('result',{
            depression:totaldepres,
            dementia:totaldemres
          })
          axios.post('http://vit-health-care.herokuapp.com/patient/addrecord',{
            id:getStorage('id'),
            ID:"ScreenTest-01-dementia-depression",
            marks:{
              depression:totaldepres,
              dementia:totaldemres,
              result:"You have deprematic dementia"
            }
          })
          .then(res=>{
            if(res.data.success){
              
              console.log(res.data);
             
             // alert('thanks')
              window.location.href = "result.html";
             // window.location.href = "index.html";
            }
          })
          //alert('question over')
          
       // window.location.href = "index.html";
        }
            
        }        
    }
    

    function clear(){
        document.getElementById("op1").style.backgroundColor =  "#f7f7f7";
        document.getElementById("op2").style.backgroundColor = "#f7f7f7";
        document.getElementById("op3").style.backgroundColor = "#f7f7f7";
        document.getElementById("op4").style.backgroundColor = "#f7f7f7";
    }


    function select(q){
       
       clear();
        if(q=='op1'){
            opSelect = 0;
        }
        else if(q=='op2'){
            opSelect = 1;
        }
        else if(q=='op3'){
            opSelect = 2;
        }
        else if(q=='op4'){
            opSelect = 3;
        }
       document.getElementById(q).style.backgroundColor = "#00d1b2";
    }

    const getStorage = (item) => (JSON.parse(localStorage.getItem(item)))
    const setStorage = (item, data) => (localStorage.setItem(item, JSON.stringify(data)))
    const removeStorage = (item) => (localStorage.removeItem(item))
function submitContact(){
  var contact = document.getElementById('contact').value; 
    if(/^[1-9]{1}[0-9]{9}$/.test(contact)){
      setStorage('contact',contact);
    axios.post('http://vit-health-care.herokuapp.com/patient/check',{
      phone:contact
    })
    .then(res=>{
      if(res.data.success){
        if(res.data.data == false){
          window.location.href = "register.html";
        }
        else{
          console.log(res.data.data);
          setStorage("id", res.data.data._id);
          window.location.href = "index.html";
        }
       
      }
    })
 // window.location.href = "index.html";
  }
  else{
  alert('false');
  
  }
  
}

function registerContact(){
  name = document.getElementById('name').value;
  contact = document.getElementById('contact').value;
  
  if(/^[1-9]{1}[0-9]{9}$/.test(contact) || name == ''){
    axios.post('http://vit-health-care.herokuapp.com/patient/save',{
      name:name,
      phone:contact
    })
    .then(res=>{
      if(res.data.success){
        console.log(res.data.data._id);
  setStorage("id", res.data.data._id);
  window.location.href = "index.html";

      }
    })
 // window.location.href = "index.html";
  }
  else{
  alert('false');
  }

  
}






